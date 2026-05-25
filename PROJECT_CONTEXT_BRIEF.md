# PROJECT_CONTEXT_BRIEF

> **Onboarding singkat** untuk AI assistant / dev baru. Baca file ini dulu sebelum eksplorasi kode.

---

## 1. Identitas

| Field | Value |
|---|---|
| **Nama** | Mockup Proses Pengadaan (`ai-studio-applet`) |
| **Tujuan** | Materi pengenalan **interaktif** alur pengadaan barang/jasa di satker TNI AU + modul terpisah **SIMTELOGAU** |
| **Audiens** | Siswa **Wingdik 600 / Pembekalan** TNI AU |
| **Bahasa konten** | Bahasa Indonesia (domain), label struktural English/ID mix |
| **Mode pembelajaran** | Self-paced, click-to-explore (bukan linear video) |
| **Origin** | Di-generate awalnya via Google AI Studio (link di README) |

## 2. Tech Stack

- **Next.js 15** (App Router) + **React 19** + **TypeScript 5.9** (strict)
- **Tailwind v4** + `tw-animate-css` + `@tailwindcss/typography`
- `lucide-react` (ikon), `motion` (animasi), `xlsx` (Excel export runtime)
- `@google/genai` ter-install tapi **belum dipakai** di runtime
- Build: `output: 'standalone'`, `reactStrictMode: true`, alias `@/* → ./`
- HMR bisa dimatikan via env `DISABLE_HMR=true` (kompat AI Studio)

## 3. Theme & Styling Convention

- Background dark navy: `#0F172A` / `#1E293B`
- Gold accent (highlight, focus ring, primary CTA): `#D4AF37`
- Text: `#F8FAFC` (primary), `text-white/{70,55,40}` (secondary)
- Border tipis: `border-white/10` / `border-white/15`
- Vibe: **militer formal**, banyak uppercase tracking-wider untuk label

## 4. Arsitektur Routing

**Single-page** dengan `useState` (BUKAN Next.js router). View dikontrol di [`app/page.tsx`](app/page.tsx):

```
'portal' | 'fase-1..5' | 'simtelog' | 'summary'
```

Konsekuensi: **tidak ada deep-link / share URL per fase** (current limitation, by design saat ini).

Layout root: [`app/layout.tsx`](app/layout.tsx) → ErrorBoundary global.
Shell visual: [`components/pengadaan/layout/app-shell.tsx`](components/pengadaan/layout/app-shell.tsx) (header Wingdik 600 + back button).

## 5. Domain: Dua Modul Utama

### A. Pengadaan (5 Fase Linear)

| Fase | Topik | Aplikasi terkait |
|---|---|---|
| 1 | Perencanaan Renbut (Skadik → Kemhan) | – |
| 2 | Penyaluran anggaran (DIPA → SAKTI → SIRUP) | SAKTI, SIRUP |
| 3 | Pengajuan Usul Pesanan (HAR → UP → SIKAL) | – |
| 4 | Pelaksanaan pengadaan (13 node, 2 baris) | – |
| 5 | Pendataan aset & persediaan | SAKTI, SIMAK BMN |

**Spesial Fase 4** — node `berkas-dukung` punya 3 tier paket dengan checklist Excel downloadable runtime:
- `< 10 jt` (18 dok) · `< 50 jt` (26 dok) · `> 50 jt` (32 dok)
- Tiap dokumen dikelompokkan ke 4 process group (A: Persiapan / B: Pemilihan / C: Pelaksanaan / D: Pembayaran)
- Generator: [`lib/pengadaan/fase-4-checklist-export.ts`](lib/pengadaan/fase-4-checklist-export.ts)
- Endpoint: `/api/pengadaan/fase4/checklist/[tierId]`

### B. SIMTELOG (Catalog Peran, Terpisah)

- **16 peran** dalam **4 kategori** (Gudang & Stok, Administrasi, HAR, Approval & Workflow)
- Sumber data: [`lib/simtelog/simtelog-roles.json`](lib/simtelog/simtelog-roles.json) + [`lib/simtelog/simtelog-categories.json`](lib/simtelog/simtelog-categories.json)
- Per peran punya: `tagline`, `scenario`, `tupoksi[]`, `docs[]`, `warning`, `demo{steps,takeaways}`, **`imageCaptions{}`** (per file)
- Coverage gambar: **9/16 peran punya screenshot**, 7 lainnya ditandai di `SIMTELOG_ROLES_WITHOUT_IMAGES`
- Peran tanpa gambar: `kasiminmat`, `kasubdisbinitem`, `sesdisbinitem`, `kadisbinitem`, `kasubdismatkomoditi`, `sesdismatau`, `kadismatau`

## 6. Struktur Folder Penting

```
app/
├── page.tsx                            # Switch view utama
├── layout.tsx                          # Root metadata + ErrorBoundary
└── api/
    ├── pengadaan/[phase]/[kind]/[folder]/route.ts   # Scan asset per fase
    ├── pengadaan/fase4/checklist/[tierId]/route.ts  # Stream Excel
    ├── simtelog/[kind]/[...path]/route.ts           # Scan asset SIMTELOG
    └── fase1-{images,docs}/[folder]/route.ts        # LEGACY (harusnya dimigrate)

components/
├── pengadaan/
│   ├── layout/app-shell.tsx
│   ├── portal/                         # Landing 5 fase + entry SIMTELOG
│   ├── fase-1..5/                      # Tiap fase: -section.tsx + -nodes.ts
│   ├── fase-4/                         # + berkas-pendukung-detail.tsx (special)
│   ├── shared/                         # PhaseVisualFlow, PhaseDetailPanel, ImageLightbox, ...
│   └── summary/summary-section.tsx
└── simtelog/
    ├── simtelog-section.tsx            # Entry
    ├── simtelog-module.tsx             # Landing + RoleTupoksiScreen
    ├── simtelog-tupoksi-detail.tsx     # Panel detail per tupoksi
    └── simtelog-ui.tsx                 # Reusable UI primitives

lib/
├── pengadaan/
│   ├── phase-registry.ts               # PHASE_FOLDERS whitelist per fase
│   ├── phase-assets.ts                 # types + image src builder + DOC/IMG ext set
│   ├── app-logos.ts                    # APP_LOGO_REGISTRY (SAKTI/SIRUP/dll.)
│   ├── fase1-folders.ts
│   ├── fase-4-berkas-tiers.ts          # 3 tier checklist
│   └── fase-4-checklist-export.ts      # Excel builder (xlsx)
└── simtelog/
    ├── simtelog-types.ts               # SimtelogRole, SimtelogImageCaptions
    ├── simtelog-data.ts                # helpers + SIMTELOG_ROLES_WITHOUT_IMAGES
    ├── simtelog-registry.ts            # folder whitelist
    ├── simtelog-assets.ts              # path builder + display name formatter
    ├── simtelog-about.ts               # Intro text & feature list
    ├── simtelog-categories.json        # 4 kategori + warna
    └── simtelog-roles.json             # SUMBER UTAMA konten 16 peran

public/
├── img/fase{1..5}/<folder>/*.{png,jpg,jpeg,webp}        # Asset gambar fase
├── docs/fase{1..5}/<folder>/*.{pdf,docx,xlsx,...}       # Asset dokumen fase
├── img/simtelog/<RoleFolder>/*.jpeg                     # Screenshot per peran
├── docs/simtelog/<RoleFolder>/*                         # Dokumen per peran
└── images/{apps,wingdik}/                               # Logo aplikasi & lembaga

scripts/
├── extract-simtelog-data.mjs           # Ekstrak data dari HTML asli (one-shot)
└── split-page.mjs
```

## 7. Pola Arsitektur yang WAJIB Diikuti

### Pola 1 — Asset Dinamis (jangan hardcode)
File gambar/dokumen **TIDAK pernah dihardcode** di kode. Selalu di-scan dari filesystem via API route → komponen pakai hook `usePhaseFiles()` / `useSimtelogFiles()`.

**Implikasi:** Tambah konten = drop file ke folder yang benar + (opsional) tambah caption. **TIDAK perlu edit komponen render.**

Validasi tight: cek `isPhaseNumber`, `isPhaseFolder`, `isSimtelogFolder`, ekstensi whitelist (`IMAGE_EXTENSIONS`, `DOC_EXTENSIONS`).

### Pola 2 — Data per Fase
Tiap fase punya file `fase-N-nodes.ts` yang export array `VisualFlowNode[]`. Field:
```ts
{ id, label, instansi, outputDoc, description, imgFolder, apps?, Icon?, flowSummary, flowBreakBefore? }
```
`imgFolder` **harus match** dengan nama folder di `public/img/faseN/` dan `public/docs/faseN/`, serta terdaftar di `PHASE_FOLDERS` ([`lib/pengadaan/phase-registry.ts`](lib/pengadaan/phase-registry.ts)).

### Pola 3 — Komponen Reusable
- `PhaseVisualFlow` — render flowchart (single/multi row, dengan arrow horizontal/vertical)
- `PhaseDetailPanel` — panel detail standar (deskripsi + image carousel + docs table)
- `PhaseSectionHeader` — header section seragam tiap fase
- `ImageLightbox` — fullscreen zoom + caption + keyboard nav
- `AppLogo` / `AppLogoStrip` — logo aplikasi (registry-based)
- `PhaseDocsTable` / `DocsFilesTable` — tabel dokumen dengan download link

### Pola 4 — Type Safety
- TS strict ON, **no `any`** kecuali sangat terjustifikasi
- JSON di-cast lewat `as` di `simtelog-data.ts` (`rolesJson as SimtelogRole[]`)
- Type-only imports pakai `import type { ... }`

## 8. Konvensi Konten

### Caption Gambar (SIMTELOG)
- **Format**: 5–12 kata, 1 kalimat
- **Tujuan**: deskripsi visual murni (apa yang dilihat di gambar) — **BUKAN** ngulang `tupoksi.desc` atau `demo.steps`
- **Lokasi storage**: `imageCaptions: { "namafile.jpeg": "caption" }` per peran di `simtelog-roles.json`
- **Lokasi render**: bawah panel preview (inline `<figcaption>`) + bawah counter di lightbox fullscreen
- Key = nama file persis (case-sensitive, fallback case-insensitive di helper)

### Penulisan Deskripsi Domain
- Pakai istilah resmi: **PPK, PPSPM, KPPN, DIPA, SAKTI, SIRUP, BMN, BAST, SPK, SP2D, HPS, SPPH, UP, HAR**
- Untuk SIMTELOG: **PALM, PN, NSN, Bentuk 40xxx**, Item Master, Storeroom, Reconcile Balances
- Bilangan paket: **"< 10 jt"**, **"< 50 jt"**, **"> 50 jt"** (singkat, konsisten)

## 9. Stateful Behavior yang Perlu Diketahui

- **View state**: 1 `useState` di `HomePage` — pindah view = reset semua state child (by design)
- **Phase node selection**: tiap section punya `activeNodeId` + `imageIndex` lokal
- **SIMTELOG**: 2 state — `screen` ('landing' | 'role') + `roleId`. Di role → ada `activeTupoksiIndex` + `imageIndex`
- **Lightbox**: state lokal per `ImageSlidePreview` (gak diangkat ke global)
- **Image filtering SIMTELOG**: file di 1 folder peran di-filter ke kartu tupoksi aktif via `filterSimtelogImagesForTupoksi()` (matching nama file vs judul tupoksi, fuzzy)

## 10. Hal yang Sering Salah Persepsi

| Mitos | Realita |
|---|---|
| "SIMTELOG = fase ke-6 pengadaan" | ❌ Modul **terpisah** — beda data model (catalog peran), beda layer (kategori → peran → tupoksi) |
| "Tambah file harus edit kode" | ❌ Drop ke folder yang sesuai, langsung muncul (dynamic scan API) |
| "Excel checklist pre-generated" | ❌ Di-build **runtime** per request via SheetJS |
| "Routing pakai Next.js router" | ❌ Single-page `useState`. Refresh = balik ke portal |
| "1 gambar = 1 tupoksi" | ⚠️ Umumnya iya, tapi filter `filterSimtelogImagesForTupoksi` bisa balikan multiple kalau nama match |
| "Field `apps` ada di semua node" | ❌ Opsional. Hanya muncul kalau node memang melibatkan aplikasi spesifik |

## 11. Tech Debt / Hal yang Perlu Diperhatikan

1. **API legacy** `/api/fase1-images/[folder]` & `/api/fase1-docs/[folder]` overlap dengan `/api/pengadaan/[phase]/[kind]/[folder]` → harus dimigrate dan dihapus
2. **No deep-link** — bisa di-upgrade ke `useSearchParams` tanpa breaking change besar
3. **No test suite** — kalau mau tambah, mulai dari helper murni (`getSimtelogImageCaption`, `filterSimtelogImagesForTupoksi`, `buildChecklistExcelBuffer`)
4. `@google/genai` terpasang tapi unused — potensi fitur AI explainer / quiz di masa depan
5. Logo aplikasi mixed format (`sakti.jpg` & `sakti.svg` koeksis) — perlu konsolidasi
6. `up-document-mock.tsx` di fase 3 — cek apakah masih dipakai
7. **ESLint di-ignore saat build** (`ignoreDuringBuilds: true`) — harus dibersihkan agar lint enforce

## 12. Workflow Edit Konten Cepat

| Mau apa | Edit file mana |
|---|---|
| Ubah teks node pengadaan | `components/pengadaan/fase-N/fase-N-nodes.ts` |
| Ubah teks peran SIMTELOG | `lib/simtelog/simtelog-roles.json` |
| Ubah checklist Fase 4 | `lib/pengadaan/fase-4-berkas-tiers.ts` |
| Tambah gambar di node fase | Drop ke `public/img/faseN/<imgFolder>/` |
| Tambah gambar peran SIMTELOG | Drop ke `public/img/simtelog/<RoleFolder>/` + tambah entry di `imageCaptions` |
| Hapus tanda "tanpa SS" untuk 1 peran | Hapus id dari `SIMTELOG_ROLES_WITHOUT_IMAGES` di `lib/simtelog/simtelog-data.ts` |
| Ubah portal landing | `components/pengadaan/portal/portal-overview.tsx` + `portal-phases.ts` |
| Ubah header app | `components/pengadaan/layout/app-shell.tsx` |

## 13. Cara Run

```bash
npm install          # sekali di awal
npm run dev          # dev server di :3000
npm run build        # production build
npm run lint         # ESLint
npm run clean        # rm -rf .next
```

Env opsional di `.env.local`:
```
GEMINI_API_KEY=...           # untuk @google/genai (belum aktif)
DISABLE_HMR=true             # disable file watcher (mode AI Studio)
```

## 14. Glossary Singkat Domain

| Istilah | Arti |
|---|---|
| Renbut | Rencana Kebutuhan barang/jasa |
| DIPA | Daftar Isian Pelaksanaan Anggaran |
| HAR | Harkat Anggaran (distribusi pagu ke satker) |
| UP | Usul Pesanan |
| HPS | Harga Perkiraan Sendiri |
| SPPH | Surat Permintaan Penawaran Harga |
| SPK | Surat Perintah Kerja |
| BAST | Berita Acara Serah Terima |
| SPM | Surat Perintah Membayar |
| SP2D | Surat Perintah Pencairan Dana (KPPN) |
| PPK | Pejabat Pembuat Komitmen |
| PPSPM | Pejabat Penandatangan Surat Perintah Membayar |
| KPPN | Kantor Pelayanan Perbendaharaan Negara |
| SAKTI | Sistem Aplikasi Keuangan Tingkat Instansi |
| SIRUP | Sistem Informasi Rencana Umum Pengadaan |
| SIMAK BMN | Sistem Manajemen Akuntansi Barang Milik Negara |
| SIMTELOG | Sistem Informasi Manajemen Terintegrasi Logistik (TNI AU) |
| PALM | (SIMTELOG) dokumen administrasi item materiel |
| PN | Part Number |
| NSN | National Stock Number |
| Bentuk 4xxxx | Form resmi pengelolaan materiel TNI AU (40170, 40220, 40400, 40510, 41300, 45100, dst.) |

---

**Last updated**: 2026-05-26 · setelah penambahan field `imageCaptions` (36 caption untuk 9 peran SIMTELOG) + badge "Tanpa SS" untuk 7 peran tanpa gambar.
