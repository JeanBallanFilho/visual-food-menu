const SERVICE_NAME = "visual-food-menu";

// Technical heartbeat only.
// This script intentionally upserts only public.system_heartbeat and never
// reads or writes menu data such as products, categories, prices, images,
// availability, users, permissions, or any other operational cardapio table.

const supabaseUrl = normalizeSupabaseUrl(process.env.SUPABASE_URL);
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl) {
  fail("SUPABASE_URL is required.");
}

if (!serviceRoleKey) {
  fail("SUPABASE_SERVICE_ROLE_KEY is required.");
}

const now = new Date().toISOString();

try {
  const upserted = await request("/rest/v1/system_heartbeat?on_conflict=service_name", {
    method: "POST",
    headers: {
      Prefer: "resolution=merge-duplicates,return=representation"
    },
    body: JSON.stringify({
      service_name: SERVICE_NAME,
      last_ping_at: now,
      updated_at: now
    })
  });

  const row = Array.isArray(upserted) ? upserted[0] : upserted;
  if (!row?.id || row.service_name !== SERVICE_NAME) {
    fail("Heartbeat upsert returned an unexpected response.");
  }

  const verified = await request(`/rest/v1/system_heartbeat?service_name=eq.${encodeURIComponent(SERVICE_NAME)}&select=id,service_name,last_ping_at,updated_at&limit=1`);
  const verifiedRow = Array.isArray(verified) ? verified[0] : verified;
  if (!verifiedRow?.id || verifiedRow.service_name !== SERVICE_NAME) {
    fail("Heartbeat verification failed after upsert.");
  }

  console.log(`Supabase heartbeat OK for ${SERVICE_NAME} at ${verifiedRow.last_ping_at}.`);
} catch (error) {
  fail(`Supabase heartbeat failed: ${error.message}`);
}

async function request(path, options = {}) {
  const response = await fetch(`${supabaseUrl}${path}`, {
    ...options,
    headers: {
      apikey: serviceRoleKey,
      Authorization: `Bearer ${serviceRoleKey}`,
      "Content-Type": "application/json",
      ...(options.headers || {})
    }
  });

  const text = await response.text();
  const body = parseBody(text);

  if (!response.ok) {
    const message = body?.message || body?.msg || body?.error_description || body?.error || text || "Unknown Supabase error.";
    throw new Error(`${response.status} ${response.statusText}: ${message}`);
  }

  return body;
}

function normalizeSupabaseUrl(value) {
  if (!value) return "";
  return value.replace(/\/+$/, "");
}

function parseBody(text) {
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

function fail(message) {
  console.error(message);
  process.exit(1);
}
