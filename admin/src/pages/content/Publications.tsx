import { useState, useEffect } from "react";
import { BookOpen, Calendar, Users, Bookmark, ArrowRight, Info, ExternalLink } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { api } from "../../api";
import type { Publication, ApprovalStatus, PublicationType } from "../../types";
import { ContentPageTemplate } from "../../components/shared/ContentPageTemplate";
import { Input } from "../../components/ui/Input";
import { Badge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/Button";

const subtypeKey = (type: PublicationType): keyof Publication => {
  if (type === 'CONFERENCE') return 'conference_paper';
  return type.toLowerCase() as keyof Publication;
};

const TYPE_LABELS: Record<PublicationType, string> = {
  ARTICLE: 'Research Article',
  CONFERENCE: 'Conference Paper',
  BOOK: 'Academic Book',
  JOURNAL: 'Journal Periodical',
};

export default function PublicationsPage() {
  const { isAdmin, isResearcher } = useAuth();
  const [items, setItems] = useState<Publication[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchItems = async () => {
    try {
      const data = await api.publications.list();
      setItems(data);
    } catch (err) {
      console.error("Failed to fetch publications:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchItems(); }, []);

  const emptyItem: Partial<Publication> = {
    title: "",
    authors: "",
    publication_year: new Date().getFullYear(),
    type: "ARTICLE",
    approval_status: "DRAFT" as ApprovalStatus,
  };

  const handleSave = async (item: Partial<Publication>) => {
    let publicationId = item.id;

    if (publicationId) {
      await api.publications.update(Number(publicationId), item);
    } else {
      const saved = await api.publications.create(item);
      publicationId = saved.id;
    }

    if (publicationId && item.type) {
      const key = subtypeKey(item.type);
      const subtypeData = (item as any)[key];
      if (subtypeData) {
        // Assume backend endpoint exists for subtypes
        // await api.publications.linkSubtype(Number(publicationId), subtypeEndpoint(item.type), subtypeData);
      }
    }

    await fetchItems();
  };

  const handleSubmitForReview = async (item: Publication) => {
    await api.content.submit("publication", item.id);
    await fetchItems();
  };

  const handleReview = async (item: Publication, status: 'PENDING_ADMIN' | 'REJECTED') => {
    await api.content.review("publication", item.id, status);
    await fetchItems();
  };

  const handleToggleStatus = async (item: Publication) => {
    const newStatus = item.approval_status === "APPROVED" ? "REJECTED" : "APPROVED";
    if (newStatus === "APPROVED") await api.admin.approveContent("publication", item.id);
    else await api.admin.rejectContent("publication", item.id);
    await fetchItems();
  };

  return (
    <ContentPageTemplate<Publication>
      title="Publications"
      subtitle={`${items.length} peer-reviewed assets indexed.`}
      icon={BookOpen}
      items={items}
      loading={loading}
      isAdmin={isAdmin()}
      isResearcher={isResearcher()}
      emptyItem={emptyItem}
      onSave={handleSave}
      onSubmitForReview={handleSubmitForReview}
      onReview={handleReview}
      onToggleStatus={isAdmin() ? handleToggleStatus : undefined}
      searchFields={(item) => [item.title, item.authors ?? "", item.type ?? ""]}
      filterOptions={[
        { label: "ALL", value: "ALL" },
        { label: "PUBLISHED", value: "APPROVED" },
        { label: "PENDING", value: "PENDING_ADMIN" },
        { label: "DRAFT", value: "DRAFT" },
      ]}
      renderListItem={(item, onClick) => (
        <div
          key={item.id}
          onClick={onClick}
          className="group border border-zinc-200 p-6 hover:border-black transition-all cursor-pointer flex flex-col gap-6 bg-white"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-black text-white shrink-0">
                <BookOpen size={14} />
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
                {item.type ? TYPE_LABELS[item.type] : "Scholarly Asset"}
              </span>
            </div>
            <Badge status={item.approval_status} />
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-black text-black uppercase tracking-tight leading-tight line-clamp-2">{item.title}</h3>
            {item.authors && (
              <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-tight line-clamp-1 italic">
                {item.authors}
              </p>
            )}
          </div>

          <div className="pt-4 border-t border-zinc-100 flex items-center justify-between">
            <span className="text-[10px] font-black text-black uppercase tracking-[0.2em]">
              ISO-{item.publication_year ?? new Date(item.created_at).getFullYear()}
            </span>
            <ArrowRight size={14} className="text-zinc-300 group-hover:text-black group-hover:translate-x-1 transition-all" />
          </div>
        </div>
      )}
      renderDetail={(item) => {
        const type = item.type;
        const details = type ? (item as any)[subtypeKey(type)] : null;

        return (
          <div className="space-y-12 pb-20 animate-enter">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-8 border border-zinc-200 bg-white space-y-4">
                <div className="flex items-center gap-2 text-zinc-400">
                  <Bookmark size={16} />
                  <span className="text-[10px] font-black uppercase tracking-widest">Classification</span>
                </div>
                <p className="text-sm font-black text-black uppercase">{type ? TYPE_LABELS[type] : "—"}</p>
              </div>
              <div className="p-8 border border-zinc-200 bg-white space-y-4">
                <div className="flex items-center gap-2 text-zinc-400">
                  <Calendar size={16} />
                  <span className="text-[10px] font-black uppercase tracking-widest">Release Year</span>
                </div>
                <p className="text-sm font-black text-black">
                  {item.publication_year ?? new Date(item.created_at).getFullYear()}
                </p>
              </div>
              <div className="p-8 border border-zinc-200 bg-white space-y-4 lg:col-span-2">
                <div className="flex items-center gap-2 text-zinc-400">
                  <Users size={16} />
                  <span className="text-[10px] font-black uppercase tracking-widest">Authorship Ledger</span>
                </div>
                <p className="text-sm font-black text-black uppercase line-clamp-2">{item.authors || "—"}</p>
              </div>
            </div>

            {details && (
              <div className="p-8 border border-black bg-zinc-50 space-y-2">
                <p className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.3em]">
                  {type === "ARTICLE" ? "Digital Object Identifier (DOI)" :
                   type === "BOOK" ? "International Standard Book Number (ISBN)" :
                   type === "JOURNAL" ? "International Standard Serial Number (ISSN)" :
                   "Subtype Identifier"}
                </p>
                <p className="text-lg font-black text-black tracking-tight uppercase">
                  {type === "ARTICLE" ? details.doi :
                   type === "BOOK" ? details.isbn :
                   type === "JOURNAL" ? details.issn :
                   details.paper_id}
                </p>
              </div>
            )}

            {details?.description && (
              <div className="space-y-6">
                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 flex items-center gap-2">
                  <Info size={14} /> Abstract / Scope
                </h4>
                <p className="text-sm font-bold text-black uppercase leading-loose tracking-tight whitespace-pre-wrap italic">
                  {details.description}
                </p>
              </div>
            )}

            {details?.link && (
              <div className="pt-6 border-t border-zinc-100">
                <Button
                  onClick={() => window.open(details.link, '_blank')}
                  variant="outline"
                  className="h-12 px-8 text-[11px] font-black tracking-widest uppercase"
                >
                  <ExternalLink size={16} className="mr-2" /> Access External Repository
                </Button>
              </div>
            )}
          </div>
        );
      }}
      renderEdit={(item, setItem) => {
        const type = item.type;
        const key = type ? subtypeKey(type) : null;
        const subtypeData = (key && (item as any)[key]) ? (item as any)[key] : {};

        const setSubtype = (patch: Record<string, string>) =>
          setItem({ ...item, [key!]: { ...subtypeData, ...patch } });

        return (
          <div className="space-y-10">
            <Input
              label="Asset Title"
              placeholder="ENTER PUBLICATION NAME..."
              value={item.title ?? ""}
              onChange={e => setItem({ ...item, title: e.target.value })}
            />

            <Input
              label="Authorship List"
              placeholder="NAMES, COMMA-SEPARATED..."
              value={item.authors ?? ""}
              onChange={e => setItem({ ...item, authors: e.target.value })}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Input
                label="Fiscal/Release Year"
                type="number"
                placeholder={String(new Date().getFullYear())}
                value={item.publication_year ?? ""}
                onChange={e => setItem({ ...item, publication_year: Number(e.target.value) })}
              />

              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-tight text-zinc-600">
                  Scholarly Class
                </label>
                <select
                  value={item.type ?? ""}
                  onChange={e => setItem({ ...item, type: e.target.value as PublicationType })}
                  className="input-monochrome focus:ring-1 focus:ring-black appearance-none cursor-pointer"
                >
                  <option value="">-- SELECT CLASS --</option>
                  <option value="ARTICLE">RESEARCH ARTICLE</option>
                  <option value="CONFERENCE">CONFERENCE PAPER</option>
                  <option value="BOOK">ACADEMIC BOOK</option>
                  <option value="JOURNAL">JOURNAL PERIODICAL</option>
                </select>
              </div>
            </div>

            {type && key && (
              <div className="pt-10 border-t border-zinc-100 space-y-10 animate-enter">
                <Input
                  label={type === "ARTICLE" ? "DOI" : type === "BOOK" ? "ISBN" : type === "JOURNAL" ? "ISSN" : "Paper ID"}
                  placeholder="IDENTIFIER PROTOCOL..."
                  value={(type === "ARTICLE" ? subtypeData.doi : type === "BOOK" ? subtypeData.isbn : type === "JOURNAL" ? subtypeData.issn : subtypeData.paper_id) ?? ""}
                  onChange={e => setSubtype({ [type === "ARTICLE" ? 'doi' : type === "BOOK" ? 'isbn' : type === "JOURNAL" ? 'issn' : 'paper_id']: e.target.value })}
                />

                <Input
                  label="Network Resource Location (URL)"
                  placeholder="https://doi.org/..."
                  value={subtypeData.link ?? ""}
                  onChange={e => setSubtype({ link: e.target.value })}
                />

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-tight text-zinc-600">
                    Publication abstract / details
                  </label>
                  <textarea
                    className="input-monochrome min-h-[160px] py-4"
                    placeholder="SYNOPSIS..."
                    value={subtypeData.description ?? ""}
                    onChange={e => setSubtype({ description: e.target.value })}
                  />
                </div>
              </div>
            )}
          </div>
        );
      }}
    />
  );
}
