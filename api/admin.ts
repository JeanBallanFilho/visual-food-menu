import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

const COOKIE = 'bravo_admin';

function getEnv(name: string) {
  const value = process.env[name];
  if (!value) throw new Error(`Variável de ambiente ausente: ${name}`);
  return value;
}

function supabaseAdmin() {
  return createClient(getEnv('SUPABASE_URL'), getEnv('SUPABASE_SERVICE_ROLE_KEY'), {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

function parseCookies(req: VercelRequest) {
  const raw = req.headers.cookie || '';
  return Object.fromEntries(raw.split(';').map((p) => p.trim()).filter(Boolean).map((p) => {
    const i = p.indexOf('=');
    return [decodeURIComponent(p.slice(0, i)), decodeURIComponent(p.slice(i + 1))];
  }));
}

function requireAuth(req: VercelRequest) {
  const expected = getEnv('ADMIN_PASSWORD');
  const token = parseCookies(req)[COOKIE];
  if (!token || token !== expected) {
    const err: any = new Error('Unauthorized');
    err.status = 401;
    throw err;
  }
}

async function jsonBody(req: VercelRequest) {
  return typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const action = String(req.query.action || '');
    const db = supabaseAdmin();

    if (action === 'adminCheck') {
      const authed = parseCookies(req)[COOKIE] === process.env.ADMIN_PASSWORD;
      return res.status(200).json({ authed });
    }

    if (action === 'adminLogin') {
      const body = await jsonBody(req);
      if (body.password !== getEnv('ADMIN_PASSWORD')) return res.status(200).json({ ok: false });
      res.setHeader('Set-Cookie', `${COOKIE}=${encodeURIComponent(body.password)}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${60 * 60 * 24 * 30}`);
      return res.status(200).json({ ok: true });
    }

    if (action === 'adminLogout') {
      res.setHeader('Set-Cookie', `${COOKIE}=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0`);
      return res.status(200).json({ ok: true });
    }

    requireAuth(req);
    const body = req.method === 'GET' ? {} : await jsonBody(req);

    if (action === 'listCompaniesAdmin') {
      const { data, error } = await db.from('companies').select('*').order('sort_order');
      if (error) throw error;
      return res.status(200).json(data ?? []);
    }

    const tableActions: Record<string, { table: string; mode: 'upsert' | 'delete' }> = {
      upsertProduct: { table: 'products', mode: 'upsert' },
      deleteProduct: { table: 'products', mode: 'delete' },
      upsertCategory: { table: 'categories', mode: 'upsert' },
      deleteCategory: { table: 'categories', mode: 'delete' },
      upsertMarker: { table: 'markers', mode: 'upsert' },
      deleteMarker: { table: 'markers', mode: 'delete' },
      upsertCompany: { table: 'companies', mode: 'upsert' },
      deleteCompany: { table: 'companies', mode: 'delete' },
    };

    if (action === 'upsertProduct') {
      const { marker_ids = [], ...productData } = body;
      const { data: row, error } = await db.from('products').upsert(productData).select().single();
      if (error) throw error;
      await db.from('product_markers').delete().eq('product_id', row.id);
      if (marker_ids.length) {
        const rows = marker_ids.map((marker_id: string) => ({ product_id: row.id, marker_id }));
        const { error: linkErr } = await db.from('product_markers').insert(rows);
        if (linkErr) throw linkErr;
      }
      return res.status(200).json(row);
    }

    if (action === 'upsertCompany') {
      if (body.is_primary) {
        await db.from('companies').update({ is_primary: false }).neq('id', body.id ?? '00000000-0000-0000-0000-000000000000');
      }
    }

    if (action === 'updateTheme') {
      const { data: existing } = await db.from('theme_settings').select('id').limit(1).maybeSingle();
      const q = existing ? db.from('theme_settings').update(body).eq('id', existing.id) : db.from('theme_settings').insert(body);
      const { error } = await q;
      if (error) throw error;
      return res.status(200).json({ ok: true });
    }

    if (action === 'uploadProductImage') {
      const bytes = Buffer.from(body.base64, 'base64');
      const folder = body.folder ?? 'menu';
      const safe = String(body.fileName || 'image').replace(/[^a-zA-Z0-9._-]/g, '_');
      const path = `${folder}/${Date.now()}-${safe}`;
      const { error } = await db.storage.from('product-images').upload(path, bytes, { contentType: body.contentType, upsert: false });
      if (error) throw error;
      const { data } = db.storage.from('product-images').getPublicUrl(path);
      return res.status(200).json({ url: data.publicUrl });
    }

    const config = tableActions[action];
    if (config?.mode === 'delete') {
      const { error } = await db.from(config.table).delete().eq('id', body.id);
      if (error) throw error;
      return res.status(200).json({ ok: true });
    }
    if (config?.mode === 'upsert') {
      const { data, error } = await db.from(config.table).upsert(body).select().single();
      if (error) throw error;
      return res.status(200).json(data);
    }

    return res.status(404).json({ error: 'Ação não encontrada' });
  } catch (error: any) {
    const status = error.status || 500;
    return res.status(status).json({ error: error.message || 'Erro interno' });
  }
}
