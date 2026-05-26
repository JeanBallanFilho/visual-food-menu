import { useNavigate, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { adminCheck, adminLogin } from '@/lib/admin.functions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Coffee } from 'lucide-react';
import { toast } from 'sonner';

export function AdminLoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('jeanballan@gmail.com');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    adminCheck().then((r) => {
      if (r.authed) navigate('/admin/painel');
    }).catch(() => undefined);
  }, [navigate]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const r = await adminLogin({ data: { email, password } });
      if (r.ok) {
        toast.success('Login realizado');
        navigate('/admin/painel');
      } else {
        toast.error(r.error || 'E-mail ou senha inválidos');
      }
    } catch (error: any) {
      toast.error(error?.message || 'Erro ao entrar');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <form
        onSubmit={submit}
        className="w-full max-w-sm space-y-6 rounded-2xl border border-border bg-card p-8 shadow-lg"
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <Coffee className="h-10 w-10 text-primary" />
          <h1 className="font-serif text-2xl font-bold">Visual Food Menu — Admin</h1>
          <p className="text-sm text-muted-foreground">Acesso master e gestão das empresas</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">E-mail</Label>
          <Input
            id="email"
            type="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="pw">Senha</Label>
          <Input
            id="pw"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <Button type="submit" disabled={loading} className="w-full">
          {loading ? 'Entrando...' : 'Entrar'}
        </Button>

        <p className="text-center text-xs">
          <Link to="/" className="text-muted-foreground hover:text-foreground">
            ← Voltar ao cardápio
          </Link>
        </p>
      </form>
    </div>
  );
}
