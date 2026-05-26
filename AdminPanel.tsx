import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  adminCheck,
  adminLogout,
  createUser,
  deleteCompany,
  deleteUser,
  listCompaniesAdmin,
  listUsersAdmin,
  resetUserPassword,
  updateUser,
  upsertCompany,
} from '@/lib/admin.functions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

const emptyCompany = {
  id: '',
  fantasy_name: '',
  legal_name: '',
  cnpj: '',
  address: '',
  email: '',
  phone: '',
  instagram: '',
  site: '',
  logo_url: '',
  is_primary: false,
  active: true,
  sort_order: 0,
};

const emptyUser = {
  id: '',
  name: '',
  email: '',
  password: '',
  role: 'visualizador',
  company_id: '',
  active: true,
};

const roles = [
  { value: 'master', label: 'Master' },
  { value: 'admin_empresa', label: 'Admin da empresa' },
  { value: 'editor', label: 'Editor' },
  { value: 'visualizador', label: 'Visualizador' },
];

export function AdminPanel() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<'companies' | 'users'>('companies');
  const [session, setSession] = useState<any>(null);
  const [companies, setCompanies] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [companyForm, setCompanyForm] = useState<any>(emptyCompany);
  const [userForm, setUserForm] = useState<any>(emptyUser);
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(true);

  const isMaster = session?.role === 'master';

  const companyById = useMemo(() => {
    const map = new Map<string, any>();
    companies.forEach((c) => map.set(c.id, c));
    return map;
  }, [companies]);

  async function loadAll() {
    setLoading(true);
    try {
      const check = await adminCheck();
      if (!check.authed) {
        navigate('/admin');
        return;
      }
      setSession(check.user);
      const companyList = await listCompaniesAdmin();
      setCompanies(companyList);
      if (check.user?.role === 'master') {
        const userList = await listUsersAdmin();
        setUsers(userList);
      }
    } catch (error: any) {
      toast.error(error?.message || 'Erro ao carregar painel');
      navigate('/admin');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadAll();
  }, []);

  async function logout() {
    await adminLogout();
    navigate('/admin');
  }

  async function saveCompany(e: React.FormEvent) {
    e.preventDefault();
    try {
      const payload = { ...companyForm };
      if (!payload.id) delete payload.id;
      payload.sort_order = Number(payload.sort_order || 0);
      await upsertCompany({ data: payload });
      toast.success('Empresa salva');
      setCompanyForm(emptyCompany);
      await loadAll();
    } catch (error: any) {
      toast.error(error?.message || 'Erro ao salvar empresa');
    }
  }

  async function removeCompany(id: string) {
    if (!confirm('Excluir esta empresa?')) return;
    try {
      await deleteCompany({ data: { id } });
      toast.success('Empresa excluída');
      await loadAll();
    } catch (error: any) {
      toast.error(error?.message || 'Erro ao excluir empresa');
    }
  }

  async function saveUser(e: React.FormEvent) {
    e.preventDefault();
    try {
      const payload = {
        ...userForm,
        company_id: userForm.role === 'master' ? null : userForm.company_id || null,
      };
      if (payload.id) {
        await updateUser({ data: payload });
        toast.success('Usuário atualizado');
      } else {
        await createUser({ data: payload });
        toast.success('Usuário criado');
      }
      setUserForm(emptyUser);
      await loadAll();
    } catch (error: any) {
      toast.error(error?.message || 'Erro ao salvar usuário');
    }
  }

  async function resetPassword(id: string) {
    if (!newPassword.trim()) {
      toast.error('Informe a nova senha');
      return;
    }
    try {
      await resetUserPassword({ data: { id, password: newPassword } });
      toast.success('Senha redefinida');
      setNewPassword('');
    } catch (error: any) {
      toast.error(error?.message || 'Erro ao redefinir senha');
    }
  }

  async function removeUser(id: string) {
    if (!confirm('Excluir este usuário?')) return;
    try {
      await deleteUser({ data: { id } });
      toast.success('Usuário excluído');
      await loadAll();
    } catch (error: any) {
      toast.error(error?.message || 'Erro ao excluir usuário');
    }
  }

  if (loading) {
    return <div className="flex min-h-screen items-center justify-center bg-background">Carregando painel...</div>;
  }

  return (
    <main className="min-h-screen bg-background p-4 md:p-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <header className="flex flex-col justify-between gap-4 rounded-2xl border bg-card p-5 shadow-sm md:flex-row md:items-center">
          <div>
            <h1 className="font-serif text-3xl font-bold">Painel Master</h1>
            <p className="text-sm text-muted-foreground">
              Logado como {session?.email} • Perfil: {session?.role}
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => window.location.href = '/'}>Ver cardápio</Button>
            <Button onClick={logout}>Sair</Button>
          </div>
        </header>

        <div className="flex gap-2">
          <Button variant={tab === 'companies' ? 'default' : 'outline'} onClick={() => setTab('companies')}>Empresas</Button>
          {isMaster && <Button variant={tab === 'users' ? 'default' : 'outline'} onClick={() => setTab('users')}>Usuários</Button>}
        </div>

        {tab === 'companies' && (
          <section className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
            <form onSubmit={saveCompany} className="space-y-4 rounded-2xl border bg-card p-5 shadow-sm">
              <h2 className="font-serif text-2xl font-bold">{companyForm.id ? 'Editar empresa' : 'Nova empresa'}</h2>
              <div className="grid gap-3 md:grid-cols-2">
                <Field label="Nome fantasia" value={companyForm.fantasy_name} onChange={(v) => setCompanyForm({ ...companyForm, fantasy_name: v })} required />
                <Field label="Razão social" value={companyForm.legal_name} onChange={(v) => setCompanyForm({ ...companyForm, legal_name: v })} />
                <Field label="CNPJ" value={companyForm.cnpj} onChange={(v) => setCompanyForm({ ...companyForm, cnpj: v })} />
                <Field label="E-mail" type="email" value={companyForm.email} onChange={(v) => setCompanyForm({ ...companyForm, email: v })} />
                <Field label="Telefone" value={companyForm.phone} onChange={(v) => setCompanyForm({ ...companyForm, phone: v })} />
                <Field label="Instagram" value={companyForm.instagram} onChange={(v) => setCompanyForm({ ...companyForm, instagram: v })} />
                <Field label="URL / Site" value={companyForm.site} onChange={(v) => setCompanyForm({ ...companyForm, site: v })} />
                <Field label="Logo URL" value={companyForm.logo_url} onChange={(v) => setCompanyForm({ ...companyForm, logo_url: v })} />
                <Field label="Ordem" type="number" value={String(companyForm.sort_order)} onChange={(v) => setCompanyForm({ ...companyForm, sort_order: Number(v) })} />
              </div>
              <Field label="Endereço" value={companyForm.address} onChange={(v) => setCompanyForm({ ...companyForm, address: v })} />
              <div className="flex gap-4 text-sm">
                <label className="flex items-center gap-2"><input type="checkbox" checked={companyForm.active} onChange={(e) => setCompanyForm({ ...companyForm, active: e.target.checked })} /> Ativa</label>
                <label className="flex items-center gap-2"><input type="checkbox" checked={companyForm.is_primary} onChange={(e) => setCompanyForm({ ...companyForm, is_primary: e.target.checked })} /> Principal</label>
              </div>
              <div className="flex gap-2">
                <Button type="submit">Salvar empresa</Button>
                <Button type="button" variant="outline" onClick={() => setCompanyForm(emptyCompany)}>Limpar</Button>
              </div>
            </form>

            <div className="space-y-3 rounded-2xl border bg-card p-5 shadow-sm">
              <h2 className="font-serif text-2xl font-bold">Empresas cadastradas</h2>
              {companies.map((c) => (
                <div key={c.id} className="rounded-xl border p-4">
                  <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
                    <div>
                      <div className="font-semibold">{c.fantasy_name}</div>
                      <div className="text-sm text-muted-foreground">{c.legal_name || 'Sem razão social'} • {c.active ? 'Ativa' : 'Inativa'}</div>
                      <div className="text-xs text-muted-foreground">{c.email || ''} {c.phone ? `• ${c.phone}` : ''}</div>
                    </div>
                    {isMaster && (
                      <div className="flex gap-2">
                        <Button variant="outline" onClick={() => setCompanyForm({ ...emptyCompany, ...c })}>Editar</Button>
                        <Button variant="destructive" onClick={() => removeCompany(c.id)}>Excluir</Button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {tab === 'users' && isMaster && (
          <section className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
            <form onSubmit={saveUser} className="space-y-4 rounded-2xl border bg-card p-5 shadow-sm">
              <h2 className="font-serif text-2xl font-bold">{userForm.id ? 'Editar usuário' : 'Novo usuário'}</h2>
              <Field label="Nome" value={userForm.name} onChange={(v) => setUserForm({ ...userForm, name: v })} />
              <Field label="E-mail" type="email" value={userForm.email} onChange={(v) => setUserForm({ ...userForm, email: v })} required />
              {!userForm.id && <Field label="Senha inicial" type="password" value={userForm.password} onChange={(v) => setUserForm({ ...userForm, password: v })} required />}

              <div className="space-y-2">
                <Label>Perfil</Label>
                <select className="h-10 w-full rounded-md border bg-background px-3" value={userForm.role} onChange={(e) => setUserForm({ ...userForm, role: e.target.value })}>
                  {roles.map((r) => <option key={r.value} value={r.value}>{r.label}</option>)}
                </select>
              </div>

              <div className="space-y-2">
                <Label>Empresa</Label>
                <select className="h-10 w-full rounded-md border bg-background px-3" value={userForm.company_id || ''} onChange={(e) => setUserForm({ ...userForm, company_id: e.target.value })} disabled={userForm.role === 'master'}>
                  <option value="">Sem empresa / acesso global</option>
                  {companies.map((c) => <option key={c.id} value={c.id}>{c.fantasy_name}</option>)}
                </select>
              </div>

              <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={userForm.active} onChange={(e) => setUserForm({ ...userForm, active: e.target.checked })} /> Usuário ativo</label>

              <div className="flex gap-2">
                <Button type="submit">Salvar usuário</Button>
                <Button type="button" variant="outline" onClick={() => setUserForm(emptyUser)}>Limpar</Button>
              </div>
            </form>

            <div className="space-y-3 rounded-2xl border bg-card p-5 shadow-sm">
              <h2 className="font-serif text-2xl font-bold">Usuários</h2>
              <div className="flex gap-2">
                <Input placeholder="Nova senha para redefinir" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
              </div>
              {users.map((u) => (
                <div key={u.id} className="rounded-xl border p-4">
                  <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
                    <div>
                      <div className="font-semibold">{u.name || u.email}</div>
                      <div className="text-sm text-muted-foreground">{u.email} • {u.role} • {u.active ? 'Ativo' : 'Inativo'}</div>
                      <div className="text-xs text-muted-foreground">Empresa: {u.company_id ? companyById.get(u.company_id)?.fantasy_name || u.company_id : 'Global'}</div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Button variant="outline" onClick={() => setUserForm({ ...emptyUser, ...u, password: '' })}>Editar</Button>
                      <Button variant="outline" onClick={() => resetPassword(u.id)}>Redefinir senha</Button>
                      <Button variant="destructive" onClick={() => removeUser(u.id)}>Excluir</Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}

function Field({ label, value, onChange, type = 'text', required = false }: { label: string; value: string; onChange: (value: string) => void; type?: string; required?: boolean }) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <Input type={type} value={value || ''} onChange={(e) => onChange(e.target.value)} required={required} />
    </div>
  );
}
