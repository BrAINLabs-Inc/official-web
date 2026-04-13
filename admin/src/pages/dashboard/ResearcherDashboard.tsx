import { useEffect, useState } from "react";
import { 
  BookOpen, 
  FlaskConical, 
  CheckCircle2, 
  Briefcase,
  ArrowRight,
  PlusCircle,
  FileText,
  ShieldCheck,
  Inbox
} from "lucide-react";
import { Link } from "react-router-dom";
import { api } from "../../api";
import { StatCard } from "../../components/ui/StatCard";
import { Button } from "../../components/ui/Button";
import { Badge } from "../../components/ui/Badge";

interface Stats {
  publications: number;
  projects: number;
  grants: number;
  completeness: number;
  pendingReview: number;
}

export function ResearcherDashboard({ memberId }: { memberId: number }) {
  const [stats, setStats] = useState<Stats>({ publications: 0, projects: 0, grants: 0, completeness: 0, pendingReview: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [pubs, projs, grants, profile] = await Promise.all([
          api.publications.list(),
          api.projects.list(),
          api.grants.list(),
          api.me.get(),
        ]);

        const myPubs = pubs.filter((p: any) => p.created_by_member_id === memberId).length;
        const myProjs = projs.filter((p: any) => p.created_by_member_id === memberId).length;
        const myGrants = grants.filter((g: any) => g.created_by_researcher === memberId).length;
        
        // Count items pending researcher review (this researcher is the supervisor)
        const pendingPubs = pubs.filter((p: any) => p.approval_status === 'PENDING_RESEARCHER').length;
        const pendingProjs = projs.filter((p: any) => p.approval_status === 'PENDING_RESEARCHER').length;

        const rd = profile.role_detail;
        const profileSections = [
          !!rd?.country, !!rd?.linkedin_url, !!rd?.image_url, !!rd?.bio, !!rd?.occupation, !!rd?.workplace,
        ];
        const completeness = Math.round((profileSections.filter(Boolean).length / profileSections.length) * 100);

        setStats({
          publications: myPubs,
          projects: myProjs,
          grants: myGrants,
          completeness,
          pendingReview: pendingPubs + pendingProjs
        });
      } catch (err) {
        console.error("Failed to fetch researcher stats:", err);
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
            <span className="text-[10px] font-black uppercase tracking-[0.25em]">Principal Investigator Workspace</span>
          </div>
          <h1 className="text-4xl font-black text-black tracking-tighter uppercase leading-none">Command Center</h1>
          <p className="text-xs font-bold text-zinc-500 uppercase tracking-tight mt-1">Personnel Oversight & Research Output Registry.</p>
        </div>
        <div className="flex flex-col items-end gap-1 text-right">
          <p className="text-[10px] font-black uppercase tracking-widest text-zinc-300">Identity Integrity</p>
          <p className="text-4xl font-black text-black tracking-tighter">{stats.completeness}%</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard label="Peer Records" value={loading ? "—" : stats.publications} icon={BookOpen} />
        <StatCard label="Active Initiatives" value={loading ? "—" : stats.projects} icon={FlaskConical} />
        <StatCard label="Fiscal Grants" value={loading ? "—" : stats.grants} icon={Briefcase} />
        <StatCard 
          label="Internal Reviews" 
          value={loading ? "—" : stats.pendingReview} 
          icon={Inbox}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 space-y-8">
          <div className="border border-black p-10 bg-white">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 mb-8 flex items-center gap-3">
              <PlusCircle size={14} className="text-black" /> Initialize New Protocol
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: "Research Publication", href: "/publications", icon: BookOpen },
                { label: "Technical Initiative", href: "/projects",    icon: FlaskConical },
                { label: "Intelligence Update",  href: "/blog",        icon: FileText },
                { label: "Grant Proposal",       href: "/grants",      icon: Briefcase },
              ].map(action => (
                <Link
                  key={action.label}
                  to={action.href}
                  className="flex items-center justify-between p-5 border border-zinc-200 hover:border-black transition-all group bg-white"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-black text-white shrink-0">
                      <action.icon size={14} />
                    </div>
                    <span className="text-[11px] font-black uppercase tracking-widest text-black">{action.label}</span>
                  </div>
                  <ArrowRight size={14} className="text-zinc-300 group-hover:text-black group-hover:translate-x-1 transition-all" />
                </Link>
              ))}
            </div>
          </div>

          {stats.pendingReview > 0 && (
            <div className="border border-black p-10 bg-zinc-50 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-black">Awaiting Supervisor Review</h3>
                <Link to="/publications" className="text-[10px] font-black uppercase tracking-widest underline underline-offset-4">Full Oversight</Link>
              </div>
              <p className="text-xs font-bold text-zinc-500 uppercase">You have {stats.pendingReview} submissions from Research Assistants awaiting initialization to Admin Review.</p>
            </div>
          )}
        </div>

        <div className="lg:col-span-4">
          <div className="border border-black p-10 bg-white h-full flex flex-col justify-between space-y-12">
            <div className="space-y-6">
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400">Identity Ledger</h3>
              <p className="text-sm font-bold text-black uppercase leading-loose tracking-tight">
                Maintain credential integrity to ensure accurate institutional attribution.
              </p>
            </div>
            <Link to="/account">
              <Button className="w-full h-12 uppercase text-[10px] font-black tracking-widest">
                <CheckCircle2 size={14} className="mr-2" /> Modify Profile
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
