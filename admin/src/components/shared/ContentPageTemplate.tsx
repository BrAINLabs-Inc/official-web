import { useState } from "react";
import type { ReactNode } from "react";
import { Plus, Search, ArrowLeft } from "lucide-react";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";

export type ContentPageView = "list" | "detail" | "edit";

interface ContentPageTemplateProps<T> {
  title: string;
  subtitle: string;
  icon: any;
  items: T[];
  loading: boolean;
  isAdmin: boolean;
  isResearcher?: boolean;

  renderListItem: (item: T, onClick: () => void) => ReactNode;
  searchFields: (item: T) => string[];
  filterOptions?: { label: string; value: string }[];

  renderDetail: (item: T) => ReactNode;
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
  onSubmitForReview?: (item: T) => void;
  onReview?: (item: T, status: 'PENDING_ADMIN' | 'REJECTED') => void;
  onToggleStatus?: (item: T) => void;

  renderEdit: (item: Partial<T>, setItem: (p: Partial<T>) => void, onSave: () => void) => ReactNode;
  emptyItem: Partial<T>;
  onSave: (item: Partial<T>) => Promise<void>;
}

export function ContentPageTemplate<
  T extends { id?: number | string; approval_status?: any; title?: string }
>({
  title,
  subtitle,
  icon: Icon,
  items,
  loading,
  isAdmin,
  isResearcher,
  renderListItem,
  searchFields,
  filterOptions,
  renderDetail,
  renderEdit,
  emptyItem,
  onSave,
  onSubmitForReview,
  onReview,
  onToggleStatus,
}: ContentPageTemplateProps<T>) {
  const [view, setView] = useState<ContentPageView>("list");
  const [selectedId, setSelectedId] = useState<string | number | null>(null);
  const [editingItem, setEditingItem] = useState<Partial<T>>(emptyItem);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("ALL");

  const selectedItem = items.find(i => i.id === selectedId) || null;

  const handleCreate = () => {
    setEditingItem(emptyItem);
    setView("edit");
  };

  const handleEdit = (item: T) => {
    setEditingItem({ ...item });
    setView("edit");
  };

  const handleSaveInternal = async () => {
    setSaving(true);
    try {
      await onSave(editingItem);
      setView("list");
      setSelectedId(null);
    } catch (err) {
      console.error("Save failed:", err);
    } finally {
      setSaving(false);
    }
  };

  const filteredItems = items.filter(item => {
    const q = search.toLowerCase();
    const values = searchFields(item).map(s => (s ?? "").toLowerCase());
    const matchesSearch = !q || values.some(v => v.includes(q));
    const matchesFilter = filter === "ALL" || item.approval_status === filter;
    return matchesSearch && matchesFilter;
  });

  if (view === "list") {
    return (
      <div className="space-y-12 animate-enter">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-black pb-8">
          <div>
            <div className="flex items-center gap-2 text-zinc-400 mb-2">
              <Icon size={14} />
              <span className="text-[10px] font-black uppercase tracking-[0.25em]">{title} Registry</span>
            </div>
            <h1 className="text-4xl font-black text-black tracking-tighter uppercase">{title}</h1>
            <p className="text-xs font-bold text-zinc-500 uppercase tracking-tight mt-1">{subtitle}</p>
          </div>
          {!isAdmin && (
            <Button onClick={handleCreate} className="h-12 px-6 text-[11px] font-black tracking-widest uppercase">
              <Plus size={16} className="mr-2" /> New Entry
            </Button>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-6 items-center justify-between border-b border-zinc-100 pb-4">
          <div className="relative flex-1 max-w-sm">
            <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
            <Input
              placeholder={`SEARCH ${title.toUpperCase()}...`}
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-10 h-10 text-[10px]"
            />
          </div>

          {filterOptions && (
            <div className="flex bg-zinc-50 border border-zinc-200 p-1">
              {filterOptions.map(opt => (
                <button
                  key={opt.value}
                  onClick={() => setFilter(opt.value)}
                  className={`px-4 py-2 text-[9px] font-black uppercase tracking-widest transition-all ${
                    filter === opt.value ? "bg-black text-white" : "text-zinc-400 hover:text-black"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <div className="col-span-full py-20 text-center uppercase text-[10px] font-black tracking-[0.5em] text-zinc-300 animate-pulse">
              Syncing Ledger...
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="col-span-full py-32 text-center border border-dashed border-zinc-200">
              <p className="text-[10px] font-black text-zinc-300 uppercase tracking-[0.3em]">No Records Found</p>
            </div>
          ) : (
            filteredItems.map(item =>
              renderListItem(item, () => {
                setSelectedId(item.id!);
                setView("detail");
              })
            )
          )}
        </div>
      </div>
    );
  }

  if (view === "detail" && selectedItem) {
    return (
      <div className="space-y-8 animate-enter">
        <div className="flex items-center justify-between border-b border-black pb-6">
          <button
            onClick={() => setView("list")}
            className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-black"
          >
            <ArrowLeft size={14} /> Back to Directory
          </button>

          <div className="flex items-center gap-3">
            {/* Workflow Actions */}
            {!isAdmin && selectedItem.approval_status === "DRAFT" && (
              <>
                <Button variant="outline" onClick={() => handleEdit(selectedItem)} className="h-10 px-6 text-[10px] font-black">
                  EDIT DRAFT
                </Button>
                {onSubmitForReview && (
                  <Button onClick={() => onSubmitForReview(selectedItem)} className="h-10 px-6 text-[10px] font-black">
                    SUBMIT FOR REVIEW
                  </Button>
                )}
              </>
            )}
            
            {isResearcher && selectedItem.approval_status === "PENDING_RESEARCHER" && onReview && (
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => onReview(selectedItem, 'REJECTED')} className="h-10 px-6 text-[10px] font-black">
                  REJECT
                </Button>
                <Button onClick={() => onReview(selectedItem, 'PENDING_ADMIN')} className="h-10 px-6 text-[10px] font-black">
                  FORWARD TO ADMIN
                </Button>
              </div>
            )}

            {isAdmin && onToggleStatus && (
              <Button onClick={() => onToggleStatus(selectedItem)} className="h-10 px-6 text-[10px] font-black">
                {selectedItem.approval_status === "APPROVED" ? "REVOKE ACCESS" : "AUTHORIZE"}
              </Button>
            )}
          </div>
        </div>

        <div className="max-w-4xl mx-auto space-y-12 py-12">
          <div className="flex flex-wrap items-center gap-4">
            <Badge status={selectedItem.approval_status} />
            <span className="text-[10px] font-bold text-zinc-300 uppercase tracking-[0.25em]">RECORD-ID-#{selectedItem.id}</span>
          </div>

          <h1 className="text-5xl font-black text-black tracking-tighter uppercase leading-tight">
            {selectedItem.title || "Untitled Record"}
          </h1>

          <div className="pt-12 border-t border-zinc-100 min-h-[400px]">
            {renderDetail(selectedItem)}
          </div>
        </div>
      </div>
    );
  }

  if (view === "edit") {
    return (
      <div className="space-y-8 animate-enter">
        <div className="flex items-center justify-between border-b border-black pb-6">
          <button
            onClick={() => setView(editingItem.id ? "detail" : "list")}
            className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-black"
          >
            <ArrowLeft size={14} /> Discard Changes
          </button>
          <Button
            onClick={handleSaveInternal}
            isLoading={saving}
            className="h-10 px-8 text-[11px] font-black tracking-widest"
          >
            COMMIT TO SYSTEM
          </Button>
        </div>

        <div className="max-w-4xl mx-auto space-y-12 py-12">
          <div className="space-y-2">
            <h1 className="text-4xl font-black text-black tracking-tighter uppercase">
              {editingItem.id ? `Modify ${title.replace(/s$/, "")}` : `Initialize ${title.replace(/s$/, "")}`}
            </h1>
            <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">
              Protocol: Records created will persist as DRAFT until submitted for review.
            </p>
          </div>

          <div className="border border-black p-12 bg-white space-y-8">
            {renderEdit(editingItem, setEditingItem, handleSaveInternal)}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-20 text-center uppercase text-[10px] font-black tracking-[0.5em] text-zinc-300">
      Loading System View...
    </div>
  );
}
