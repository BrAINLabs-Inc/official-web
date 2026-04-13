import { useEffect, useState } from "react";
import { BookOpen, FlaskConical, ArrowRight, ClipboardList, Fingerprint, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { api } from "../../api";
import { StatCard } from "../../components/ui/StatCard";
import { Button } from "../../components/ui/Button";

interface Stats {
  publications: number;
  projects: number;
  lastActive: string;
}

export function ResearchAssistantDashboard({ memberId }: { memberId: number }) {
  const [stats, setStats] = useState<Stats>({ publications: 0, projects: 0, lastActive: "PROTOCOL ACTIVE" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [pubs, projs] = await Promise.all([
          api.publications.list(),
          api.projects.list(),
        ]);
        setStats({
          publications: pubs.length,
          projects: projs.length,
          lastActive: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })
        });
      } catch (err) {
        console.error("Failed to fetch assistant stats:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, [memberId]);

  return (
    <div className="space-y-16 animate-enter pb-40">
      <div className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-black pb-8">
        <div>
          <div className="flex items-center gap-2 text-zinc-400 mb-2">
            <ShieldCheck size={14} />
            <span className="text-[10px] font-black uppercase tracking-[0.25em]">Research Support Unit</span>
          </div>
          <h1 className="text-4xl font-black text-black tracking-tighter uppercase leading-none">Support Terminal</h1>
          <p className="text-xs font-bold text-zinc-500 uppercase tracking-tight mt-1">Registry maintenance and data entry oversight.</p>
        </div>
        <div className="flex flex-col items-end gap-1 text-right">
          <p className="text-[10px] font-black uppercase tracking-widest text-zinc-300">System Time</p>
          <p className="text-4xl font-black text-black tracking-tighter uppercase">{stats.lastActive}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <StatCard label="Peer Records" value={loading ? "—" : stats.publications} icon={BookOpen} />
        <StatCard label="Active Initiatives" value={loading ? "—" : stats.projects} icon={FlaskConical} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8">
          <div className="border border-black p-10 bg-white space-y-8">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 flex items-center gap-3">
              <ClipboardList size={14} className="text-black" /> Entry Protocols
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: "Publications Registry",  href: "/publications", desc: "Data entry and archiving" },
                { label: "Project Initiatives",      href: "/projects",     desc: "Track development units" },
                { label: "Intelligence Logs",    href: "/blog",         desc: "Draft institutional updates" },
                { label: "Engagement Events",        href: "/events",       desc: "Log laboratory activities" },
              ].map(action => (
                <Link
                  key={action.label}
                  to={action.href}
                  className="flex items-center justify-between p-6 border border-zinc-200 hover:border-black transition-all group bg-white"
                >
                  <div className="space-y-1">
                    <p className="text-[11px] font-black text-black uppercase tracking-widest">{action.label}</p>
                    <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-tight">{action.desc}</p>
                  </div>
                  <ArrowRight size={14} className="text-zinc-300 group-hover:text-black group-hover:translate-x-1 transition-all flex-shrink-0" />
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-4">
          <div className="border border-black p-10 bg-white h-full flex flex-col justify-between space-y-12">
            <div className="space-y-6">
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400">Personnel Account</h3>
              <p className="text-sm font-bold text-black uppercase leading-loose tracking-tight">
                Manage your credentials and institutional identity profile.
              </p>
            </div>
            <Link to="/account">
              <Button className="w-full h-12 uppercase text-[10px] font-black tracking-widest">
                <Fingerprint size={14} className="mr-2" /> Modify Profile
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
