/**
 * Type definitions untuk modul "Implementasi SIMTELOG di WINGDIK 600".
 * Menggambarkan 6 Bentuk proses utama dengan alur antar aktor (TB, SIKAL, GPL/GPD, dst.).
 */

/** ID aktor yang terlibat dalam alur Bentuk. */
export type FlowActorId =
  | 'tb' // Kepala Tata Bench Stock (KaTB)
  | 'sikal' // Kasikal / Kasubsikal
  | 'gpl' // Kepala Gudang Pangkalan (KaGPL)
  | 'gpd' // Kepala Gudang Depo (KaGPD)
  | 'rpc' // Repair Center (eksternal/depot)
  | 'vendor' // Vendor warranty
  | 'sistem'; // Notifikasi sistem otomatis

export type FlowActor = {
  id: FlowActorId;
  /** Singkatan tampil di node (mis. "TB", "GPL"). */
  short: string;
  /** Nama lengkap untuk popup & card. */
  fullName: string;
  /** Deskripsi peran ringkas (1 kalimat). */
  role: string;
  /** Warna utama (HEX) untuk badge & border. */
  accent: string;
  /** Emoji ikon untuk node compact. */
  icon: string;
};

/** Status visual node dalam alur. */
export type FlowNodeState = 'idle' | 'active' | 'completed' | 'error';

/** Satu node dalam alur Bentuk. */
export type FlowNode = {
  /** ID unik dalam scope satu Bentuk. */
  id: string;
  /** Label utama (mis. "Validasi", "Shipped"). */
  label: string;
  /** Aktor yang bertanggung jawab di step ini. */
  actor: FlowActorId;
  /** Aksi spesifik yang dilakukan aktor (untuk popup). */
  action: string;
  /** Catatan tambahan opsional. */
  note?: string;
};

/** Status proses keseluruhan (untuk badge di canvas). */
export type FlowProcessStatus =
  | 'Pending Service'
  | 'In Repair'
  | 'Returned'
  | 'Warranty Process Active'
  | 'Stock Updated'
  | 'Notified'
  | 'Active';

/** Satu gambar referensi (workflow diagram BPMN atau screenshot UI aplikasi). */
export type FlowReferenceImage = {
  /** Path absolut public (mis. "/img/simtelog-flow/workflow/bentuk-40200-workflow.png"). */
  src: string;
  /** Caption singkat di bawah gambar. */
  caption: string;
  /** Set true bila gambar masih placeholder/duplikat dan belum versi aslinya. */
  placeholder?: boolean;
};

/** Definisi satu Bentuk (form proses). */
export type BentukFlow = {
  /** Kode bentuk (mis. "40200", "40170-1"). */
  code: string;
  /** Judul deskriptif. */
  title: string;
  /** Subtitle / catatan tambahan (opsional). */
  subtitle?: string;
  /** Aktor yang terlibat (di-render sebagai actor cards). */
  actors: FlowActorId[];
  /** Ringkasan alur compact untuk sidebar (mis. "TB → SIKAL → GPL → TB"). */
  shortPath: string;
  /** Node-node yang membentuk alur. */
  nodes: FlowNode[];
  /** Statuses yang bisa terjadi di proses ini. */
  statuses?: FlowProcessStatus[];
  /** Catatan khusus (mis. perbedaan dengan bentuk lain). */
  notes?: string[];
  /** Diagram BPMN-style workflow asli dari materi SIMTELOG. */
  workflowImage?: FlowReferenceImage;
  /** Screenshot dari aplikasi SIMTELOG asli (form / dashboard). */
  appScreenshots?: FlowReferenceImage[];
};
