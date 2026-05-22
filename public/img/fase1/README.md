# Gambar Fase 1

Letakkan file gambar (`.png`, `.jpg`, `.jpeg`, `.webp`, `.gif`) di folder subfase. Aplikasi **otomatis mendeteksi** semua file di folder — tidak wajib mengisi `imgs` di kode.

## Folder

```
public/img/fase1/skadik/
public/img/fase1/wingdik/
public/img/fase1/pusdik/
public/img/fase1/kodiklatau/
public/img/fase1/mabesau/
public/img/fase1/srena/
public/img/fase1/kemhan/
```

## Contoh

```
public/img/fase1/skadik/01-renbut.png
public/img/fase1/skadik/02-tabel.jpg
```

Setelah menyimpan file, **refresh browser** (Ctrl+F5). Urutan tampil: nama file A→Z.

## Opsional: urutan manual

Jika perlu urutan khusus, isi `imgs` di `components/pengadaan/fase-1/fase-1-nodes.ts`:

```ts
imgs: ['02-tabel.jpg', '01-renbut.png'],
```
