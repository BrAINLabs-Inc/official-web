import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { apiClient } from "../../api";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    first_name: "",
    second_name: "",
    contact_email: "",
    password: "",
    role: "researcher",
    assigned_by_researcher_id: "",
  });
  
  const [researchers, setResearchers] = useState<{id: number, first_name: string, second_name: string}[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    // Fetch approved researchers for RA assignment
    const fetchResearchers = async () => {
      try {
        const res = await apiClient.get("/public/researchers");
        setResearchers(res.data);
      } catch (err) {
        console.error("Failed to fetch researchers", err);
      }
    };
    fetchResearchers();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Validation for RA
    if (formData.role === 'research_assistant' && !formData.assigned_by_researcher_id) {
      setError("Research Assistants must be assigned to a Researcher.");
      setLoading(false);
      return;
    }

    try {
      await apiClient.post("/auth/register", {
        ...formData,
        assigned_by_researcher_id: formData.role === 'research_assistant' ? Number(formData.assigned_by_researcher_id) : null
      });
      setSuccess(true);
    } catch (err: any) {
      setError(err.response?.data?.error || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-8 font-['Inter']">
      <div className="w-full max-w-[440px] space-y-12">
        {/* Brand */}
        <div className="text-center space-y-6">
          <div className="w-20 h-20 bg-white border border-black p-2 flex items-center justify-center mx-auto transition-transform hover:scale-105 duration-300">
            <img src="/logo.png" alt="BrAIN Labs" className="w-full h-full object-contain grayscale" />
          </div>
          <div className="space-y-1">
            <h1 className="text-3xl font-black tracking-tighter uppercase text-black"> BrAIN Labs </h1>
            <p className="text-[9px] font-black text-zinc-400 uppercase tracking-[0.4em]">Personnel Entry Protocol</p>
          </div>
        </div>

        {success ? (
          <div className="text-center space-y-8 animate-enter">
            <div className="space-y-2">
              <h2 className="text-xl font-black text-black uppercase tracking-tight">Request Logged</h2>
              <p className="text-xs text-zinc-500 font-bold uppercase tracking-tight leading-relaxed">
                Your application is pending administrative authorization. <br/>
                We will notify you via email once approved.
              </p>
            </div>
            <Button onClick={() => navigate("/login")} className="w-full h-12 uppercase tracking-widest text-[11px] font-black">
              Return to Login
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="First Name"
                name="first_name"
                required
                value={formData.first_name}
                onChange={handleChange}
                placeholder="Jane"
              />
              <Input
                label="Last Name"
                name="second_name"
                required
                value={formData.second_name}
                onChange={handleChange}
                placeholder="Smith"
              />
            </div>

            <Input
              label="Contact Email"
              type="email"
              name="contact_email"
              required
              value={formData.contact_email}
              onChange={handleChange}
              placeholder="jane.smith@sliit.lk"
            />

            <Input
              label="Access Password"
              type="password"
              name="password"
              required
              minLength={8}
              value={formData.password}
              onChange={handleChange}
              placeholder="Minimum 8 characters"
            />

            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-tight text-zinc-600">
                Designated Role
              </label>
              <select
                name="role"
                required
                value={formData.role}
                onChange={handleChange}
                className="input-monochrome focus:ring-1 focus:ring-black appearance-none cursor-pointer"
              >
                <option value="researcher">RESEARCHER</option>
                <option value="research_assistant">RESEARCH ASSISTANT</option>
              </select>
            </div>

            {formData.role === "research_assistant" && (
              <div className="space-y-1.5 animate-enter">
                <label className="text-xs font-semibold uppercase tracking-tight text-zinc-600">
                  Assigning Researcher
                </label>
                <select
                  name="assigned_by_researcher_id"
                  required
                  value={formData.assigned_by_researcher_id}
                  onChange={handleChange}
                  className="input-monochrome focus:ring-1 focus:ring-black appearance-none cursor-pointer"
                >
                  <option value="">-- SELECT SUPERVISOR --</option>
                  {researchers.map(r => (
                    <option key={r.id} value={r.id}>
                      DR. {r.first_name.toUpperCase()} {r.second_name.toUpperCase()}
                    </option>
                  ))}
                </select>
                <p className="text-[9px] font-bold text-zinc-400 uppercase tracking-tight mt-1">
                  Research Assistants must be verified by a lab researcher.
                </p>
              </div>
            )}

            {error && (
              <div className="p-4 bg-zinc-50 border border-black rounded-sm animate-enter">
                <p className="text-[10px] font-black uppercase text-black italic leading-tight">
                  * {error}
                </p>
              </div>
            )}

            <div className="space-y-4 pt-4">
              <Button
                type="submit"
                isLoading={loading}
                className="w-full h-12 uppercase tracking-widest text-[11px] font-black"
              >
                Submit Access Request
              </Button>
              <Button
                variant="outline"
                type="button"
                onClick={() => navigate("/login")}
                className="w-full h-12 uppercase tracking-widest text-[11px] font-black"
              >
                Cancel
              </Button>
            </div>
          </form>
        )}

        {/* Footer */}
        <div className="pt-8 border-t border-zinc-100 text-center">
          <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-zinc-300">
            © {new Date().getFullYear()} BrAIN Labs Inc. — All Rights Reserved
          </p>
        </div>
      </div>
    </div>
  );
}
