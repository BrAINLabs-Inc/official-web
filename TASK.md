# TASK.md — BrAIN Labs Inc. Rebuild (Monochrome Edition)

> Status legend: `[ ]` = TODO · `[/]` = In Progress · `[x]` = Done

---

## Phase 0 — Blueprint & Architecture

- [x] Finalise Corrected Schema in `schema.sql` (Canonical Source)
- [x] Design Monochrome Design System (Black, White, Grayscale)
- [x] Define Frontend File Structure (`admin/src/` cleanup)
- [x] Write `prompt.md`, `CLAUDE.md`, and this `TASK.md` overhaul

---

## Phase 1 — Backend Foundation (`backend/`)

- [x] Initialise Express.js scaffold (JWT, CORS, Helmet, Supabase JS)
- [x] Auth Core:
  - [x] `POST /auth/register` (Handle RA `assigned_by_researcher_id` — FIX D1)
  - [x] `POST /auth/login` (Role resolution with JWT `sub` and `role`)
- [x] Global Middleware:
  - [x] Auth verify (`req.user`)
  - [x] Role gate factory (`requireRole`)
  - [x] Error handling & 健康检查 (`GET /health`)
- [ ] **API Excellence & Endpoint Correctness**:
  - [ ] audit all endpoints against Zod schemas for strict input validation
  - [ ] ensure consistent 403/401 JSON responses for role/auth failures
  - [ ] verify all `:table` param endpoints follow the unified content controller pattern
  - [ ] add request logging middleware for debugging workflow transitions


---

## Phase 2 — Frontend Design System & Architecture (`admin/`)

- [ ] **Frontend Restructuring**:
  - [ ] Standardize foldering: `api/`, `components/ui/`, `hooks/`, `pages/`, `store/`, `types/`
  - [ ] Centralize Axios logic in `src/api/` with Bearer interceptors
- [ ] **Monochrome Design System (White/Black/Gray)**:
  - [ ] Implement global styles in `index.css` (Inter font, 1px contrast borders)
  - [ ] Create UI primitives in `components/ui/`:
    - Button (Solid Black/White text), Input (1px Border), Card (No shadow, border-only)
    - Modal (Minimalist), Badge (Grayscale status indicators)
- [ ] **Auth Workflow**:
  - [x] Persisted Zustand store for Auth state
  - [x] Protected & Role-guarded route components

---

## Phase 3 — Identity & Profile Management

- [ ] **Member Directory (Admin Only)**:
  - [x] `GET /admin/members` with joined role info
  - [ ] `PATCH /admin/members/:id` to approve/reject Researchers & RAs
  - [ ] Implement Resignation workflow (XOR trigger safety — FIX C3/C6)
- [ ] **Profile Editor**:
  - [x] Linked Background/Research multi-row management
  - [ ] Handle `updated_at` triggers and display (FIX D5)
  - [ ] slug validation (lowercase alphanumeric only — FIX M1)

---

## Phase 4 — Core Content Infrastructure

- [ ] **Global Content Rules**:
  - [ ] Implement `approval_status_enum` logic (`DRAFT` as default for NEW content)
  - [ ] Handle `SET NULL` authorship in UI (Former Member display — FIX C1/C2/C5)
- [ ] **Content Tables (Backend + Form UI)**:
  - [ ] **Blogs**: Keyword & Image management; Author XOR check (FIX C4)
  - [ ] **Tutorials**: Description & Content (Rich Text)
  - [ ] **Projects**: Handle NEW `content` field and diagram UNIQUE constraint (FIX D6/M3)
  - [ ] **Events**: Implementation of merged `event_datetime` (FIX M2)
    - [ ] `POST/PUT /events`: Validate single `ISO-8601` datetime string via Zod
  - [ ] **Grants**: Implementation of `grant_document` child table (FIX D4)
    - [ ] `POST/PUT /grants`: Support `documents[]` array for atomic creation/update
  - [ ] **Publications**: Base table + subtype ISA logic (Conference, Book, Journal, Article)
    - [ ] `POST /publications`: Support subtype injection (e.g., `type: 'BOOK', bookDetails: { isbn, link }`)


---

## Phase 5 — Advanced Workflow (RA → Researcher → Admin)

- [ ] **Submission Stage (RA)**:
  - [ ] `PATCH /content/:table/:id/submit` — Hand off to assigned researcher
    - [ ] Set `approval_status = 'PENDING_RESEARCHER'`
    - [ ] Verify `reviewed_by_researcher_id` is automatically set to RA's assigned researcher
  - [ ] Dashboard view for RA: Tracking submission progress
- [ ] **Review Stage (Researcher)**:
  - [ ] `GET /researcher/reviews` — Content assigned to `me` for review
  - [ ] `PATCH /content/:table/:id/review` — Researcher action
    - [ ] Body: `{ status: 'PENDING_ADMIN' | 'REJECTED' | 'DRAFT' }`
- [ ] **Approval Stage (Admin)**:
  - [ ] `GET /admin/content/pending` — Final filter for `PENDING_ADMIN`
  - [ ] `PATCH /admin/content/:table/:id/approve` — Set `approved_by_admin_id` and status `APPROVED`


---

## Phase 6 — Public Website (`web/`)

- [ ] Connect `web/` project to new Express `/public/*` endpoints
- [ ] Implement matching Monochrome theme for the public surface
- [ ] SEO Optimisation (Sitemap, Metadata, Semantic HTML)
- [ ] Smoke tests: Full lifecycle from RA Draft to Public Visibility

---

## Phase 7 — Deployment & Quality

- [ ] Containerise backend (`Dockerfile`)
- [ ] Setup CI/CD: Render (Backend) + Cloudflare Pages (Frontend)
- [ ] Rate limiting & Refresh token support (Backlog)
- [ ] Storage integration (Supabase Storage for Images/Docs)
