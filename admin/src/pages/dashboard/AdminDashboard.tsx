import { useEffect, useState } from "react";
import { Users, BookOpen, FileText, Inbox, ArrowRight, CheckSquare2, ShieldAlert } from "lucide-react";
import { Link } from "react-router-dom";
import { api } from "../../api";
import { StatCard } from "../../components/ui/StatCard";
import { Badge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/Button";

interface Stats {
  users: number;
  publications: number;
  blog: number;
  events: number;
  pending: number;
}

interface PendingItem {
  id: string;
  title: string;
  type: "Publication" | "Blog" | "Event" | "Project";
  author: string;
  date: string;
  href: string;
}

export function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({ users: 0, publications: 0, blog: 0, events: 0, pending: 0 });
  const [pendingItems, setPendingItems] = useState<PendingItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [users, pubs, blogs, events, projects] = await Promise.all([
          api.admin.getMembers(),
          api.publications.list(),
          api.blogs.list(),
          api.events.list(),
          api.projects.list(),
        ]);

        const pendingPubs: PendingItem[] = pubs
          .filter((p: any) => p.approval_status === "PENDING_ADMIN")
          .map((p: any) => ({
            id: String(p.id),
            title: p.title,
            type: "Publication" as const,
            author: p.authors ?? "Personnel",
            date: p.publication_year?.toString() ?? "—",
            href: "/publications",
          }));

        const pendingBlogs: PendingItem[] = blogs
          .filter((b: any) => b.approval_status === "PENDING_ADMIN")
          .map((b: any) => ({
            id: String(b.id),
            title: b.title,
            type: "Blog" as const,
            author: b.author_name ?? "Personnel",
            date: b.created_at?.split("T")[0] ?? "—",
            href: "/blog",
          }));

        const pendingEvents: PendingItem[] = events
          .filter((e: any) => e.approval_status === "PENDING_ADMIN")
          .map((e: any) => ({
            id: String(e.id),
            title: e.title,
            type: "Event" as const,
            author: "Engagement",
            date: e.event_datetime ? new Date(e.event_datetime).toLocaleDateString() : "—",
            href: "/events",
          }));

        const pendingProjects: PendingItem[] = projects
          .filter((p: any) => p.approval_status === "PENDING_ADMIN")
          .map((p: any) => ({
            id: String(p.id),
            title: p.title ?? "Untitled Initiative",
            type: "Project" as const,
            author: "Research Unit",
            date: p.created_at?.split("T")[0] ?? "—",
            href: "/projects",
          }));

        const allPending = [...pendingPubs, ...pendingBlogs, ...pendingEvents, ...pendingProjects];
        setPendingItems(allPending);

        setStats({
          users: users.length,
          publications: pubs.length,
          blog: blogs.length,
          events: events.length,
          pending: allPending.length,
        });
      } catch (err) {
        console.error("Failed to fetch admin stats:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="space-y-12 animate-enter">
      <div className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-black pb-8">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-zinc-400">
            <ShieldAlert size={14} />
            <span className="text-[10px] font-black uppercase tracking-[0.25em]">Central Oversight</span>
          </div>
          <h1 className="text-4xl font-black text-black tracking-tighter uppercase">Administration</h1>
          <p className="text-xs font-bold text-zinc-500 uppercase tracking-tight">Review clearance requests and oversee institutional output.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard label="Total Personnel" value={loading ? "—" : stats.users} icon={Users} />
        <StatCard label="Peer Records" value={loading ? "—" : stats.publications} icon={BookOpen} />
        <StatCard label="Intelligence" value={loading ? "—" : stats.blog} icon={FileText} />
        <StatCard
          label="Awaiting Sign-off"
          value={loading ? "—" : stats.pending}
          icon={Inbox}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-6">
          <div className="border border-black bg-white">
            <div className="flex items-center justify-between px-8 py-6 border-b border-black bg-zinc-50">
              <h2 className="text-[11px] font-black text-black uppercase tracking-[0.2em] flex items-center gap-3">
                Action Required
                <span className="px-2 py-0.5 bg-black text-white text-[9px] font-black">
                  {pendingItems.length}
                </span>
              </h2>
              <Link
                to="/publications"
                className="text-[10px] font-black text-black uppercase tracking-widest hover:underline underline-offset-4"
              >
                Full Registry
              </Link>
            </div>

            <div className="divide-y divide-zinc-100">
              {loading ? (
                <div className="p-12 text-center text-[10px] font-black uppercase tracking-[0.4em] text-zinc-300 animate-pulse">
                  Syncing System Cache...
                </div>
              ) : pendingItems.length > 0 ? (
                pendingItems.map(item => (
                  <Link
                    key={`${item.type}-${item.id}`}
                    to={item.href}
                    className="flex items-center justify-between px-8 py-6 hover:bg-zinc-50 transition-all group"
                  >
                    <div className="flex items-center gap-6 min-w-0">
                      <Badge status="PENDING_ADMIN" />
                      <div className="min-w-0">
                        <p className="text-sm font-black text-black uppercase tracking-tight truncate group-hover:underline">
                          {item.title}
                        </p>
                        <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest pt-1">
                          {item.type} • {item.author} • {item.date}
                        </p>
                      </div>
                    </div>
                    <ArrowRight
                      size={16}
                      className="text-zinc-300 group-hover:text-black group-hover:translate-x-1 transition-all"
                    />
                  </Link>
                ))
              ) : (
                <div className="py-24 text-center space-y-4">
                  <CheckSquare2 size={32} className="mx-auto text-zinc-200" />
                  <p className="text-[10px] font-black text-zinc-300 uppercase tracking-[0.3em]">All Clear: No Pending Protocols</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-8">
          <div className="border border-black p-8 space-y-6">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 mb-6">Initialize Record</h3>
            <div className="space-y-3">
              {[
                { label: "New Publication", href: "/publications" },
                { label: "New Intelligence Post", href: "/blog" },
                { label: "New Engagement", href: "/events" },
                { label: "New Initiative", href: "/projects" },
              ].map(action => (
                <Link
                  key={action.label}
                  to={action.href}
                  className="flex items-center justify-between w-full px-5 py-4 text-[10px] font-black uppercase tracking-widest border border-zinc-200 hover:border-black transition-all bg-white"
                >
                  {action.label}
                  <ArrowRight size={14} className="text-zinc-300" />
                </Link>
              ))}
            </div>
          </div>

          <div className="border border-black p-8 bg-black text-white space-y-6 relative overflow-hidden">
            <div className="space-y-2">
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">Personnel Management</h3>
              <p className="text-sm font-bold uppercase tracking-tight leading-relaxed">
                Review credential requests and adjust personnel clearance levels.
              </p>
            </div>
            <Link to="/dashboard/members" className="block">
              <Button variant="outline" className="w-full h-12 text-white border-white hover:bg-white hover:text-black uppercase text-[10px] font-black tracking-widest">
                Access Directory
              </Button>
            </Link>
            <div className="absolute -right-8 -bottom-8 opacity-10">
              <Users size={160} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
