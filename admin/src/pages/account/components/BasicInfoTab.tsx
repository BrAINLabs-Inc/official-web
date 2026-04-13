import { useState } from "react";
import { User, Mail, Globe, Linkedin, MapPin, Briefcase } from "lucide-react";
import { api } from "../../../api";
import type { Profile } from "../../../types";
import { useAuth } from "../../../hooks/useAuth";
import { Input } from "../../../components/ui/Input";
import { Button } from "../../../components/ui/Button";

interface Props {
  cv: Profile;
  onUpdate: () => void;
  isEditing?: boolean;
}

export function BasicInfoTab({ cv, onUpdate, isEditing }: Props) {
  const { refreshUser } = useAuth();
  const [formData, setFormData] = useState({
    first_name: cv.first_name,
    second_name: cv.second_name,
    contact_email: cv.contact_email,
    workplace: cv.role_detail?.workplace || "",
    occupation: cv.role_detail?.occupation || "",
    country: cv.role_detail?.country || "",
    linkedin_url: cv.role_detail?.linkedin_url || "",
    bio: cv.role_detail?.bio || "",
    image_url: cv.role_detail?.image_url || ""
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(false);
    try {
      await api.me.update(formData);
      await refreshUser();
      setSuccess(true);
      onUpdate();
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || "Credential Update Failure");
    } finally {
      setSaving(false);
      setTimeout(() => setSuccess(false), 3000);
    }
  };

  if (!isEditing) {
    return (
      <div className="space-y-12 animate-enter">
        <div className="flex items-center gap-4 border-b border-black pb-6">
           <div className="w-12 h-12 bg-black text-white flex items-center justify-center shrink-0">
             <User size={24} />
           </div>
           <div>
             <h2 className="text-xl font-black uppercase tracking-tighter">Identity Core</h2>
             <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Base Personnel Credentials</p>
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
          <div className="space-y-2">
            <label className="text-[9px] font-black text-zinc-300 uppercase tracking-[0.3em] block">Full Identity</label>
            <p className="text-black font-bold uppercase tracking-tight text-sm flex items-center gap-3">
              <User size={14} className="text-zinc-400" /> {cv.first_name} {cv.second_name}
            </p>
          </div>
          <div className="space-y-2">
            <label className="text-[9px] font-black text-zinc-300 uppercase tracking-[0.3em] block">Institutional Node</label>
            <p className="text-black font-bold uppercase tracking-tight text-sm flex items-center gap-3">
              <Briefcase size={14} className="text-zinc-400" /> {cv.role_detail?.workplace || "Global Researcher"}
            </p>
          </div>
          <div className="space-y-2">
            <label className="text-[9px] font-black text-zinc-300 uppercase tracking-[0.3em] block">Communication Path</label>
            <p className="text-black font-bold uppercase tracking-tight text-sm flex items-center gap-3">
              <Mail size={14} className="text-zinc-400" /> {cv.contact_email}
            </p>
          </div>
          <div className="space-y-2">
            <label className="text-[9px] font-black text-zinc-300 uppercase tracking-[0.3em] block">Geographic Sector</label>
            <p className="text-black font-bold uppercase tracking-tight text-sm flex items-center gap-3">
              <Globe size={14} className="text-zinc-400" /> {cv.role_detail?.country || "Earth Terminal"}
            </p>
          </div>
          <div className="md:col-span-2 space-y-4">
            <label className="text-[9px] font-black text-zinc-300 uppercase tracking-[0.3em] block">Personnel Narrative</label>
            <p className="text-black font-bold uppercase tracking-tight text-sm leading-loose whitespace-pre-wrap border-l-4 border-black pl-8 italic">
              {cv.role_detail?.bio || "No mission statement has been recorded for this personnel node."}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-12 animate-enter">
      <div className="flex items-center gap-4 border-b border-black pb-6">
         <div className="w-12 h-12 bg-black text-white flex items-center justify-center shrink-0">
           <User size={24} />
         </div>
         <div>
           <h2 className="text-xl font-black uppercase tracking-tighter">Modify Credentials</h2>
           <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Update Primary Personnel Data</p>
         </div>
      </div>
      
      {error && (
        <div className="p-6 border border-black bg-zinc-50 text-[10px] font-black text-black uppercase tracking-widest flex items-center gap-4">
          <div className="w-2 h-2 bg-black animate-pulse" />
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
          <Input label="GIVEN NAME" value={formData.first_name} onChange={e => setFormData({ ...formData, first_name: e.target.value })} required />
          <Input label="SURNAME" value={formData.second_name} onChange={e => setFormData({ ...formData, second_name: e.target.value })} required />
          <Input label="INSTITUTIONAL ROLE" value={formData.occupation} onChange={e => setFormData({ ...formData, occupation: e.target.value })} placeholder="e.g., LEAD NEURAL ARCHITECT" />
          <Input label="ACADEMIC NODE" value={formData.workplace} onChange={e => setFormData({ ...formData, workplace: e.target.value })} placeholder="e.g., MIT MEDIA LAB" />
          
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-zinc-300 uppercase tracking-[0.3em]">GEOGRAPHIC SECTOR</label>
            <div className="relative">
               <MapPin size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
               <Input className="pl-12" value={formData.country} onChange={e => setFormData({ ...formData, country: e.target.value })} placeholder="e.g., UNITED STATES" />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-zinc-300 uppercase tracking-[0.3em]">LINKEDIN PROTOCOL</label>
            <div className="relative">
               <Linkedin size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
               <Input className="pl-12" value={formData.linkedin_url} onChange={e => setFormData({ ...formData, linkedin_url: e.target.value })} placeholder="https://linkedin.com/..." />
            </div>
          </div>

          <div className="md:col-span-2">
            <Input label="AVATAR RESOURCE LOCATION" value={formData.image_url} onChange={e => setFormData({ ...formData, image_url: e.target.value })} placeholder="https://..." />
          </div>

          <div className="md:col-span-2 space-y-2">
            <label className="text-[10px] font-black text-zinc-300 uppercase tracking-[0.3em]">PERSONNEL NARRATIVE (BIO)</label>
            <textarea 
              className="input-monochrome min-h-[200px] py-6 uppercase font-bold text-xs" 
              value={formData.bio} 
              onChange={e => setFormData({ ...formData, bio: e.target.value })} 
              placeholder="STATE RESEARCH PHILOSOPHY AND MISSION..." 
            />
          </div>
        </div>
        
        <div className="pt-12 flex items-center justify-between border-t border-black">
          {success ? (
            <span className="text-[10px] font-black text-black uppercase tracking-[0.4em] animate-pulse">Identity Synchronized</span>
          ) : <div />}
          
          <Button type="submit" isLoading={saving} className="h-14 px-12 text-[11px] font-black tracking-[0.3em] uppercase">
            COMMIT CREDENTIALS
          </Button>
        </div>
      </form>
    </div>
  );
}
