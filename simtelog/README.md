# Materi Pembekalan SIMTELOGAU

Sumber: `materi-pembekalan-simtelogau.html`

## Di aplikasi Next.js

- UI: `components/simtelog/simtelog-module.tsx`
- Data peran: `lib/simtelog/simtelog-roles.json`

## Alur layar

1. **Beranda** — pilih peran (16 tupoksi)
2. **Halaman peran** — skenario, kartu TPF, demo + pratinjau di bawah

## Screenshot & dokumen per peran

Satu folder per **nama peran** (bukan per subfolder tupoksi):

```text
public/img/simtelog/KAGPL/
public/img/simtelog/Kasikal/
public/img/simtelog/KaGPD/
…
```

Mapping `id` → folder: `lib/simtelog/simtelog-data.ts` (`SIMTELOG_ROLE_IMAGE_FOLDER`).

Saat kartu **Tupoksi** diklik, gambar difilter otomatis dari nama file (mis. `Kelola Inventory.jpeg` untuk tupoksi *Kelola Inventory*). Jika tidak ada yang cocok, ditampilkan semua gambar di folder peran itu.

Dokumen (opsional):

```text
public/docs/simtelog/KAGPL/
```

## Memperbarui data peran

```bash
node scripts/extract-simtelog-data.mjs
```
