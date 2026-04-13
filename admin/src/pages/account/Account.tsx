import { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { api } from "../../api";
import type { Profile } from "../../types";
import { User, BookOpen, FlaskConical, Edit3, Check } from "lucide-react";
import { BasicInfoTab } from "./components/BasicInfoTab";
import { QualificationsTab } from "./components/QualificationsTab";
import { OngoingResearchTab } from "./components/OngoingResearchTab";
import { Button } from "../../components/ui/Button";

type TabId = "basic" | "qualifications" | "research";

interface TabConfig {
  id: TabId;
  label: string;
  icon: React.ElementType;
}

const TABS: TabConfig[] = [
  { id: "basic", label: "Identity & Profile", icon: User },
  { id: "research", label: "Active Research", icon: FlaskConical },
  { id: "qualifications", label: "Academic Records", icon: BookOpen },
];

export default function Account() {
  const { isAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState<TabId>("basic");
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const fetchProfile = async () => {
    try {
      const data = await api.me.get();
      setProfile(data);
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || "Credential Retrieval Error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProfile(); }, []);

  const filteredTabs = TABS.filter(tab => {
    if (isAdmin()) return tab.id === "basic";
    return true;
  });

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-white p-8">
        <div className="flex flex-col items-center gap-6">
           <div className="w-12 h-12 border-4 border-black border-t-transparent animate-spin" />
           <p className="text-[10px] font-black uppercase tracking-[0.4em] text-black">Authenticating Identity...</p>
        </div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white p-8">
        <div className="max-w-md w-full border border-black p-12 text-center space-y-8">
           <div className="w-16 h-16 bg-black text-white flex items-center justify-center mx-auto">
              <User size={32} />
           </div>
           <div className="space-y-2">
              <h2 className="text-2xl font-black uppercase tracking-tighter">Identity Conflict</h2>
              <p className="text-xs font-bold text-zinc-500 uppercase leading-loose">{error || "Access Denied: Could not resolve personnel profile."}</p>
           </div>
           <Button onClick={() => window.location.reload()} className="w-full uppercase text-[10px] tracking-widest font-black">
              Retry Protocol
           </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-white animate-enter">
      {/* Sidebar Control Panel */}
      <div className="w-full lg:w-80 shrink-0 border-b lg:border-b-0 lg:border-r border-black p-8 lg:p-10 space-y-12">
        <div className="space-y-6">
          <div className="w-24 h-24 bg-black flex items-center justify-center text-4xl font-black text-white">
            {profile.first_name[0]}{profile.second_name[0]}
          </div>
          <div className="space-y-1">
            <h1 className="text-3xl font-black tracking-tighter uppercase leading-none">{profile.first_name} {profile.second_name}</h1>
            <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest pt-2">
              {profile.role.replace('_', ' ')}
            </p>
          </div>
        </div>
        
        <nav className="space-y-1">
          <p className="text-[9px] font-black text-zinc-300 uppercase tracking-[0.3em] mb-4 ml-1">Profile Sections</p>
          {filteredTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-4 px-4 py-4 text-[10px] font-black uppercase tracking-widest border transition-all ${
                activeTab === tab.id
                  ? "bg-black text-white border-black"
                  : "text-zinc-500 hover:text-black border-transparent hover:border-black"
              }`}
            >
              <tab.icon size={14} />
              {tab.label}
            </button>
          ))}
          
          <div className="pt-8 mt-8 border-t border-zinc-100">
            <Button
              variant={isEditing ? "primary" : "outline"}
              onClick={() => setIsEditing(!isEditing)}
              className="w-full h-12 uppercase text-[10px] tracking-[0.2em] font-black"
            >
              {isEditing ? <><Check size={14} className="mr-2" /> Commit Profile</> : <><Edit3 size={14} className="mr-2" /> Modify Profile</>}
            </Button>
          </div>
        </nav>
      </div>

      {/* Profile Content Display */}
      <div className="flex-1 bg-white p-8 lg:p-20 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          {activeTab === "basic" && <BasicInfoTab cv={profile} onUpdate={fetchProfile} isEditing={isEditing} />}
          {activeTab === "research" && <OngoingResearchTab cv={profile} onUpdate={fetchProfile} isEditing={isEditing} />}
          {activeTab === "qualifications" && <QualificationsTab cv={profile} onUpdate={fetchProfile} isEditing={isEditing} />}
        </div>
      </div>
    </div>
  );
}
