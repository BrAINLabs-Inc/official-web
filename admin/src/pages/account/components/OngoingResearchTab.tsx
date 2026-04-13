import { useState } from "react";
import { Loader2, Plus, Trash2, FlaskConical } from "lucide-react";
import { api } from "../../../api";
import type { Profile } from "../../../types";
import { Input } from "../../../components/ui/Input";
import { Button } from "../../../components/ui/Button";

interface Props {
  cv: Profile;
  onUpdate: () => void;
  isEditing?: boolean;
}

export function OngoingResearchTab({ cv, onUpdate, isEditing }: Props) {
  const [newTitle, setNewTitle] = useState("");
  const [adding, setAdding] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    setAdding(true);
    try {
      await api.me.addOngoingResearch(newTitle);
      setNewTitle("");
      onUpdate();
    } catch (err) {
      console.error("Add research title failed:", err);
    } finally {
      setAdding(false);
    }
  };

  const handleDelete = async (id: number) => {
    setDeletingId(id);
    try {
      await api.me.removeOngoingResearch(id);
      onUpdate();
    } catch (err) {
      console.error("Remove research title failed:", err);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-12 animate-enter">
      <div className="flex items-center gap-4 border-b border-black pb-6">
         <div className="w-12 h-12 bg-black text-white flex items-center justify-center shrink-0">
           <FlaskConical size={24} />
         </div>
         <div>
           <h2 className="text-xl font-black uppercase tracking-tighter">Active Nodes</h2>
           <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Ongoing Laboratory Initiatives</p>
         </div>
      </div>

      <div className="space-y-4">
        {cv.role_detail?.ongoing_research?.map((res) => (
          <div key={res.id} className="group p-8 border border-zinc-200 flex items-center justify-between bg-white hover:border-black transition-all">
             <div className="flex items-center gap-6">
                <div className="w-10 h-10 border border-black flex items-center justify-center text-black font-black uppercase text-[10px]">RES</div>
                <span className="text-xs font-black text-black tracking-widest uppercase italic">"{res.title}"</span>
             </div>
             {isEditing && (
               <button 
                 onClick={() => handleDelete(res.id)} 
                 className="p-3 text-zinc-300 hover:text-black hover:bg-zinc-50 border border-transparent hover:border-black transition-all"
                 disabled={deletingId === res.id}
               >
                 {deletingId === res.id ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
               </button>
             )}
          </div>
        ))}
        {(!cv.role_detail?.ongoing_research || cv.role_detail.ongoing_research.length === 0) && (
          <div className="py-20 border border-dashed border-zinc-200 text-center bg-zinc-50/50">
             <p className="text-[9px] font-black uppercase text-zinc-300 tracking-[0.4em]">No Ongoing Protocols Found</p>
          </div>
        )}
      </div>

      {isEditing && (
        <form onSubmit={handleAdd} className="pt-12 border-t border-black space-y-8">
           <Input 
             label="PROTOCOL TITLE" 
             placeholder="e.g., AGI ALIGNMENT VIA NEURAL PRUNING" 
             value={newTitle} 
             onChange={e => setNewTitle(e.target.value)} 
           />
           <Button 
             type="submit" 
             disabled={adding || !newTitle} 
             isLoading={adding}
             className="h-14 px-8 text-[11px] font-black tracking-[0.2em] uppercase"
           >
             <Plus size={14} className="mr-2" /> LINK RESEARCH NODE
           </Button>
        </form>
      )}
    </div>
  );
}
