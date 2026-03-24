import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  BookOpen,
  FileText,
  FlaskConical,
  CalendarDays,
  Users,
  ArrowRight,
  TrendingUp,
  Brain,
  Settings,
} from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { api } from "../../lib/api";
import { ProfileSettingsModal } from "./ProfileSettingsModal";

interface StatCardProps {
  label: string;
  value: number | string;
  icon: React.ElementType;
  href: string;
  sub?: string;
}

function StatCard({ label, value, icon: Icon, href, sub }: StatCardProps) {
  return (
    <Link
      to={href}
      className="group flex flex-col gap-4 p-5 bg-white border border-zinc-100 rounded-xl hover:border-zinc-300 hover:shadow-sm transition-all"
    >
      <div className="flex items-center justify-between">
        <div className="w-10 h-10 bg-zinc-100 rounded-lg flex items-center justify-center group-hover:bg-zinc-900 transition-colors">
          <Icon size={18} className="text-zinc-600 group-hover:text-white transition-colors" />
        </div>
        <ArrowRight size={14} className="text-zinc-300 group-hover:text-zinc-600 transition-colors" />
      </div>
      <div>
        <p className="text-2xl font-bold text-zinc-900">{value}</p>
        <p className="text-sm font-medium text-zinc-500 mt-0.5">{label}</p>
        {sub && <p className="text-xs text-zinc-400 mt-0.5">{sub}</p>}
      </div>
    </Link>
  );
}

export default function Dashboard() {
  const { user, role } = useAuth();
  const token = useAuth((s) => s.token) ?? "";
  const [stats, setStats] = useState({ publications: 0, blog: 0, events: 0, projects: 0, grants: 0, users: 0 });
  const [loading, setLoading] = useState(true);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const [pubs, blog, events, projs, grants] = await Promise.all([
          api.publications.list(token),
          api.blog.list(token),
          api.events.list(token),
          api.projects.list(token),
          api.grants.list(token),
        ]);
        const users = role === "super_admin" ? await api.members.list(token) : [];
        setStats({
          publications: pubs.length,
          blog: blog.length,
          events: events.length,
          projects: projs.length,
          grants: grants.length,
          users: users.length,
        });
      } finally {
        setLoading(false);
      }
    })();
  }, [token, role]);

  const modules = [
    { label: "Publications", icon: BookOpen, href: "/publications", roles: ["super_admin", "researcher"] },
    { label: "Blog Posts", icon: FileText, href: "/blog", roles: ["super_admin", "researcher"] },
    { label: "Projects", icon: FlaskConical, href: "/projects", roles: ["super_admin", "researcher"] },
    { label: "Events", icon: CalendarDays, href: "/events", roles: ["super_admin", "researcher"] },
    { label: "Grants", icon: BookOpen, href: "/grants", roles: ["super_admin", "researcher"] },
    { label: "Users", icon: Users, href: "/users", roles: ["super_admin"] },
  ].filter((m) => m.roles.includes(role ?? ""));

  const statItems = [
    { label: "Publications", value: loading ? "—" : stats.publications, icon: BookOpen, href: "/publications", sub: "Total entries" },
    { label: "Blog Posts", value: loading ? "—" : stats.blog, icon: FileText, href: "/blog", sub: "Total posts" },
    { label: "Projects", value: loading ? "—" : stats.projects, icon: FlaskConical, href: "/projects", sub: "Total projects" },
    { label: "Events", value: loading ? "—" : stats.events, icon: CalendarDays, href: "/events", sub: "Total events" },
    ...(role === "super_admin"
      ? [{ label: "Users", value: loading ? "—" : stats.users, icon: Users, href: "/users", sub: "Active accounts" }]
      : []),
  ];

  return (
    <div className="p-6 lg:p-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center shrink-0">
            <Brain size={16} className="text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-zinc-900 leading-none">
              Welcome back, {user?.name?.split(" ")[0] ?? "User"}
            </h1>
            <p className="text-xs text-zinc-400 mt-1.5 flex items-center gap-2 flex-wrap">
              {user?.position ?? user?.email} &bull; 
              <span className={`px-1.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${role === "super_admin" ? "bg-black text-white" : "bg-zinc-100 text-zinc-600"}`}>
                {role === "super_admin" ? "Super Admin" : "Researcher"}
              </span>
            </p>
          </div>
        </div>
        <button
          onClick={() => setShowSettings(true)}
          className="flex items-center gap-2 px-3 py-1.5 bg-white border border-zinc-200 rounded-lg text-sm font-medium text-zinc-700 hover:bg-zinc-50 hover:border-zinc-300 transition-colors shadow-sm whitespace-nowrap"
        >
          <Settings size={14} className="text-zinc-500" />
          <span>Profile Settings</span>
        </button>
      </div>

      {/* Stats grid */}
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp size={14} className="text-zinc-400" />
          <h2 className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Overview</h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {statItems.map((s) => (
            <StatCard key={s.label} {...s} />
          ))}
        </div>
      </div>

      {/* Admin — Pending Approval Section */}
      {role === "super_admin" ? (
        <div className="mb-10 p-6 bg-zinc-900 border border-zinc-800 rounded-2xl text-white">
          <div className="flex items-center justify-between mb-4">
             <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-400">Approval Queue</h2>
             </div>
             <span className="text-[10px] bg-zinc-800 px-2 py-0.5 rounded-full text-zinc-400">Restricted to Admin</span>
          </div>
          <div className="text-sm text-zinc-500 py-4 border-t border-zinc-800">
             No pending approvals at this time.
             <p className="text-[10px] mt-1">Review research publications and blog posts submitted by members here.</p>
          </div>
        </div>
      ) : (
        <div className="mb-10 p-6 bg-zinc-50 border border-zinc-100 rounded-2xl">
          <div className="flex items-center justify-between mb-4">
             <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-zinc-400" />
                <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-500">Your Role: Researcher</h2>
             </div>
          </div>
          <div className="text-sm text-zinc-600 py-4 border-t border-zinc-200">
             Welcome to the BrAIN Labs console.
             <p className="text-xs text-zinc-500 mt-2">You can create and manage your research content, blog posts, and projects. You can save your work as Draft or mark it as Pending Review. A Super Admin will review and publish your submissions.</p>
          </div>
        </div>
      )}

      {/* Quick access */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <h2 className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Quick Access</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
          {modules.map((m) => (
            <Link
              key={m.href}
              to={m.href}
              className="flex flex-col items-center gap-2 p-4 bg-white border border-zinc-100 rounded-xl hover:border-zinc-300 hover:bg-zinc-50 transition-all text-center group"
            >
              <div className="w-9 h-9 bg-zinc-100 rounded-lg flex items-center justify-center group-hover:bg-black transition-colors">
                <m.icon size={16} className="text-zinc-600 group-hover:text-white transition-colors" />
              </div>
              <span className="text-[10px] font-bold uppercase text-zinc-500 group-hover:text-zinc-900 transition-colors tracking-tight">{m.label}</span>
            </Link>
          ))}
        </div>
      </div>
      <ProfileSettingsModal 
        isOpen={showSettings} 
        onClose={() => setShowSettings(false)} 
      />
    </div>
  );
}
