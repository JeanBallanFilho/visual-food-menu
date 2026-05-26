import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { adminCheck, adminLogin } from "@/lib/admin.functions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Coffee } from "lucide-react";
import { toast } from "sonner";

export function AdminLoginPage() {
  const navigate = useNavigate();
  const check = adminCheck;
  const login = adminLogin;
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    check().then((r) => {
      if (r.authed) navigate("/admin/painel");
    });
  }, [check, navigate]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const r = await login({ data: { password } });
      if (r.ok) {
        navigate("/admin/painel");
      } else {
        toast.error("Senha incorreta");
      }
    } catch {
      toast.error("Erro ao entrar");
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
          <h1 className="font-serif text-2xl font-bold">Bravo Café — Admin</h1>
        </div>
        <div className="space-y-2">
          <Label htmlFor="pw">Senha</Label>
          <Input
            id="pw"
            type="password"
            autoFocus
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <Button type="submit" disabled={loading} className="w-full">
          Entrar
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
