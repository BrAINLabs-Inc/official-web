import { useState, useEffect } from "react";
import { Loader2, CheckCircle2, Clock } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { api, type Member } from "../../lib/api";

export default function Members() {
  const { token } = useAuth();
  const t = token ?? "";
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => { 
    if (t) {
      api.members.list(t).then((d) => { setMembers(d); setLoading(false); }).catch(err => {
        console.error("Failed to fetch members", err);
        setLoading(false);
      });
    }
  }, [t]);

  const handleStatusChange = async (member: Member, newStatus: string) => {
    if (!member.id) return;
    setUpdatingId(member.id);
    try {
      const updated = await api.members.updateStatus(t, member.id, newStatus);
      setMembers((p) => p.map((u) => (u.id === updated.id ? updated : u)));
    } catch (err) {
      console.error("Status update failed", err);
    } finally {
      setUpdatingId(null);
    }
  };

  const formatDate = (d: string) => new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });

  return (
    <div className="p-6 lg:p-8 max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-zinc-900">Member Management</h1>
        <p className="text-sm text-zinc-500 mt-0.5">Manage BrAIN Labs research members and their platform status</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="bg-white border border-zinc-100 rounded-xl p-4 flex items-center gap-3">
          <div className="w-9 h-9 bg-black rounded-lg flex items-center justify-center">
            <CheckCircle2 size={16} className="text-white" />
          </div>
          <div>
            <p className="text-xl font-bold text-zinc-900">{members.filter((m) => m.status === "PUBLISHED").length}</p>
            <p className="text-xs text-zinc-500">Active Members</p>
          </div>
        </div>
        <div className="bg-white border border-zinc-100 rounded-xl p-4 flex items-center gap-3">
          <div className="w-9 h-9 bg-zinc-100 rounded-lg flex items-center justify-center">
            <Clock size={16} className="text-zinc-600" />
          </div>
          <div>
            <p className="text-xl font-bold text-zinc-900">{members.filter((m) => m.status !== "PUBLISHED").length}</p>
            <p className="text-xs text-zinc-500">Pending/Draft</p>
          </div>
        </div>
      </div>

      <div className="bg-white border border-zinc-100 rounded-xl overflow-hidden">
        {loading ? (
          <div className="p-8 space-y-3">{[1,2,3].map((i) => <div key={i} className="skeleton h-14 w-full" />)}</div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-100 bg-zinc-50">
                <th className="text-left px-5 py-3 font-medium text-zinc-500 text-xs uppercase tracking-wider">Member</th>
                <th className="text-left px-5 py-3 font-medium text-zinc-500 text-xs uppercase tracking-wider hidden lg:table-cell">Joined</th>
                <th className="text-left px-5 py-3 font-medium text-zinc-500 text-xs uppercase tracking-wider">Status</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-50">
              {members.map((member) => (
                <tr key={member.id} className="hover:bg-zinc-50 transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      {member.image_url ? (
                        <img src={member.image_url} alt={member.name} className="w-8 h-8 rounded-full object-cover" />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-zinc-900 flex items-center justify-center text-xs font-bold text-white uppercase">
                          {member.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                        </div>
                      )}
                      <div>
                        <p className="font-medium text-zinc-900">{member.name}</p>
                        <p className="text-xs text-zinc-400">{member.contact_email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-zinc-500 hidden lg:table-cell">{formatDate(member.created_at ?? new Date().toISOString())}</td>
                  <td className="px-5 py-4">
                    <span className={`status-pill ${member.status === "PUBLISHED" ? "status-published" : "status-draft"}`}>
                      {member.status.charAt(0) + member.status.slice(1).toLowerCase().replace("_", " ")}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-2">
                      {updatingId === member.id ? (
                        <Loader2 size={14} className="animate-spin text-zinc-400" />
                      ) : (
                        <>
                          {member.status !== "PUBLISHED" && (
                            <button
                              onClick={() => handleStatusChange(member, "PUBLISHED")}
                              className="text-xs px-3 py-1.5 border border-zinc-200 rounded-lg hover:bg-zinc-900 hover:text-white hover:border-zinc-900 transition-all font-medium"
                            >
                              Approve
                            </button>
                          )}
                          {member.status === "PUBLISHED" && (
                            <button
                              onClick={() => handleStatusChange(member, "DRAFT")}
                              className="text-xs px-3 py-1.5 border border-zinc-200 rounded-lg hover:bg-zinc-100 transition-colors text-zinc-600"
                            >
                              Revoke
                            </button>
                          )}
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
