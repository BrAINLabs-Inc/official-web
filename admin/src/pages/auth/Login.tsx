import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";

export default function Login() {
  const { token, loginWithEmail } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (token) navigate("/dashboard", { replace: true });
  }, [token, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    setLoading(true);
    setError(null);

    const { error: authError } = await loginWithEmail(email, password);

    if (authError) {
      setError(authError.includes("credentials") ? "Invalid credentials" : authError);
      setLoading(false);
      return;
    }

    navigate("/dashboard", { replace: true });
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-8 font-['Inter']">
      <div className="w-full max-w-[400px] space-y-12">
        {/* Brand */}
        <div className="text-center space-y-6">
          <div className="w-20 h-20 bg-white border border-black p-2 flex items-center justify-center mx-auto transition-transform hover:scale-105 duration-300">
            <img src="/logo.png" alt="BrAIN Labs" className="w-full h-full object-contain grayscale" />
          </div>
          <div className="space-y-1">
            <h1 className="text-3xl font-black tracking-tighter uppercase text-black"> BrAIN Labs </h1>
            <p className="text-[9px] font-black text-zinc-400 uppercase tracking-[0.4em]">Institutional Oversight Terminal</p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-6">
            <Input
              label="Email Address"
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="admin@brainlabsinc.org"
            />
            <Input
              label="Security Password"
              type="password"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>

          {error && (
            <div className="p-4 bg-zinc-50 border border-black rounded-sm animate-enter">
              <p className="text-[10px] font-black uppercase text-black italic leading-tight">
                * Access Denied: {error}
              </p>
            </div>
          )}

          <div className="space-y-4">
            <Button
              type="submit"
              isLoading={loading}
              className="w-full h-12 uppercase tracking-widest text-[11px] font-black"
            >
              Authorize Access
            </Button>
            
            <Button
              variant="outline"
              type="button"
              onClick={() => navigate("/register")}
              className="w-full h-12 uppercase tracking-widest text-[11px] font-black"
            >
              Request Access
            </Button>
          </div>
        </form>

        {/* Footer */}
        <div className="pt-8 border-t border-zinc-100 text-center">
          <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-zinc-300">
            Authorized Personnel Only — SLIIT BrAIN Labs
          </p>
        </div>
      </div>
    </div>
  );
}
