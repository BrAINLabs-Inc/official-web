import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  BookOpen,
  FileText,
  FlaskConical,
  CalendarDays,
  Users,
  LogOut,
  Bell,
  Briefcase,
  GraduationCap,
  Settings,
  UserCircle,
  X,
} from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { useSessionTimeout } from "../../hooks/useSessionTimeout";
import { Button } from "../ui/Button";

const mainNav = [
  { label: "Oversight",    path: "/dashboard",         icon: LayoutDashboard, roles: ["admin", "researcher", "research_assistant"] },
  { label: "Publications", path: "/publications",       icon: BookOpen,        roles: ["admin", "researcher", "research_assistant"] },
  { label: "Intelligence", path: "/blog",               icon: FileText,        roles: ["admin", "researcher", "research_assistant"] },
  { label: "Initiatives",  path: "/projects",           icon: FlaskConical,    roles: ["admin", "researcher", "research_assistant"] },
  { label: "Engagement",   path: "/events",             icon: CalendarDays,    roles: ["admin", "researcher", "research_assistant"] },
  { label: "Fiscal",       path: "/grants",             icon: Briefcase,       roles: ["admin", "researcher", "research_assistant"] },
  { label: "Pedagogy",     path: "/tutorials",          icon: GraduationCap,   roles: ["admin", "researcher", "research_assistant"] },
  { label: "Personnel",    path: "/dashboard/members",  icon: Users,           roles: ["admin"] },
] as const;

const settingsNav = [
  { label: "Identity",  path: "/account",  icon: UserCircle, roles: ["admin", "researcher", "research_assistant"] },
  { label: "Protocols", path: "/settings", icon: Settings,   roles: ["admin", "researcher", "research_assistant"] },
] as const;

export function AppLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSignOutConfirm, setShowSignOutConfirm] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  useSessionTimeout(handleLogout);

  const filteredMain = mainNav.filter(item =>
    user ? item.roles.includes(user.role as never) : false
  );
  const filteredSettings = settingsNav.filter(item =>
    user ? item.roles.includes(user.role as never) : false
  );

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-4 px-6 py-4 border-l-4 transition-all text-[11px] font-black uppercase tracking-widest ${
      isActive
        ? "bg-black text-white border-black"
        : "text-zinc-400 hover:text-black hover:bg-zinc-50 border-transparent"
    }`;

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-white border-r border-black">
      <div className="px-8 py-10 border-b border-black">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-white border border-black p-1 flex items-center justify-center shrink-0">
            <img src="/logo.png" alt="BrAIN Labs" className="w-full h-full object-contain grayscale" />
          </div>
          <div>
            <p className="font-black text-lg text-black tracking-tighter leading-none uppercase">BrAIN Labs</p>
            <p className="text-[9px] text-zinc-400 font-black mt-1 uppercase tracking-[0.3em]">Institutional Admin</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto pt-8 space-y-12">
        <div className="space-y-1">
          <p className="px-8 text-[9px] font-black text-zinc-300 uppercase tracking-[0.4em] mb-4">Operations</p>
          {filteredMain.map(item => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setMobileOpen(false)}
              className={navLinkClass}
            >
              <item.icon size={16} />
              {item.label}
            </NavLink>
          ))}
        </div>

        <div className="space-y-1 pb-10">
          <p className="px-8 text-[9px] font-black text-zinc-300 uppercase tracking-[0.4em] mb-4">System Core</p>
          {filteredSettings.map(item => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setMobileOpen(false)}
              className={navLinkClass}
            >
              <item.icon size={16} />
              {item.label}
            </NavLink>
          ))}
        </div>
      </nav>

      <div className="px-8 py-8 border-t border-black bg-zinc-50">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 border-2 border-black bg-white flex items-center justify-center text-xs font-black text-black shrink-0 uppercase">
            {user?.first_name?.[0]}{user?.second_name?.[0]}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[11px] font-black text-black leading-none truncate uppercase tracking-tight">
              {user?.first_name} {user?.second_name}
            </p>
            <p className="text-[9px] text-zinc-500 font-bold mt-1 uppercase tracking-widest truncate">
              {user?.role?.replace("_", " ")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-white overflow-hidden text-black antialiased">
      <aside className="hidden lg:flex flex-col w-72 shrink-0">
        <SidebarContent />
      </aside>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/80"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="absolute left-0 top-0 bottom-0 w-80 shadow-2xl animate-enter">
            <SidebarContent />
          </aside>
        </div>
      )}

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-20 bg-white border-b border-black flex items-center justify-between px-10 shrink-0 z-30">
          <div className="flex items-center gap-6">
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2 text-black border border-black hover:bg-zinc-50 transition-all font-black uppercase text-[10px]"
            >
               MENU
            </button>
            <div className="hidden lg:block border-l-4 border-black pl-6">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-black">
                Session Active — Institution Oversight Terminal
              </p>
            </div>
          </div>

          <div className="flex items-center gap-8">
            <div className="relative">
              <button
                onClick={() => setShowNotifications(v => !v)}
                className={`p-3 transition-all flex items-center gap-3 border ${
                  showNotifications ? "bg-black text-white border-black" : "text-black border-transparent hover:border-black"
                }`}
              >
                <Bell size={18} />
                <span className="text-[10px] font-black uppercase tracking-widest hidden md:block text-inherit">Communications</span>
              </button>

              {showNotifications && (
                <div className="absolute top-16 right-0 w-80 z-50 animate-enter">
                  <div className="bg-white border-2 border-black shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
                    <div className="flex items-center justify-between px-6 py-4 border-b border-black bg-zinc-50">
                      <p className="text-[10px] font-black uppercase tracking-widest text-black">Internal Feed</p>
                      <button onClick={() => setShowNotifications(false)} className="text-zinc-400 hover:text-black">
                        <X size={16} />
                      </button>
                    </div>
                    <div className="py-20 flex flex-col items-center gap-4 text-center px-8">
                      <div className="w-12 h-12 border-2 border-zinc-200 flex items-center justify-center text-zinc-200">
                        <Bell size={24} />
                      </div>
                      <p className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.3em]">Secure: No Inbound Protocols</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Button
              variant="outline"
              onClick={() => setShowSignOutConfirm(true)}
              className="hidden sm:flex text-[10px] font-black uppercase tracking-[0.2em] h-11 px-6 border-2 border-black hover:bg-black hover:text-white"
            >
              Terminate Session
            </Button>
          </div>
        </header>

        {showSignOutConfirm && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 animate-enter">
            <div
              className="absolute inset-0 bg-black/90"
              onClick={() => setShowSignOutConfirm(false)}
            />
            <div className="relative bg-white border-4 border-black p-12 w-full max-w-md shadow-[20px_20px_0px_0px_rgba(0,0,0,0.5)] text-center">
              <div className="w-20 h-20 bg-black flex items-center justify-center text-white mx-auto mb-8">
                <LogOut size={40} />
              </div>
              <h2 className="text-3xl font-black text-black tracking-tighter mb-4 uppercase">Confirm Termination?</h2>
              <p className="text-xs text-zinc-500 font-bold mb-10 uppercase tracking-widest leading-loose bg-zinc-50 p-4">
                Session tokens will be invalidated immediately. Unauthorized attempts to reconnect will be logged.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <Button variant="outline" onClick={() => setShowSignOutConfirm(false)} className="uppercase text-[11px] font-black h-12 border-2 border-black">
                  Resume
                </Button>
                <Button onClick={handleLogout} className="uppercase text-[11px] font-black h-12 bg-black text-white hover:bg-zinc-800">
                  Execute Exit
                </Button>
              </div>
            </div>
          </div>
        )}

        <main className="flex-1 overflow-y-auto bg-white p-10 lg:p-16">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
