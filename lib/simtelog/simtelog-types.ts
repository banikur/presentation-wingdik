export type SimtelogCategoryId = 'gudang' | 'admin' | 'har' | 'approval';

export type SimtelogCategory = {
  name: string;
  color: string;
};

export type SimtelogTupoksiItem = {
  icon: string;
  title: string;
  desc: string;
};

export type SimtelogWarning = {
  label: string;
  text: string;
};

export type SimtelogDemoStep = {
  title: string;
  desc: string;
};

export type SimtelogDemo = {
  title: string;
  subtitle: string;
  context: string;
  steps: SimtelogDemoStep[];
  takeaways: string[];
};

/**
 * Caption per file gambar pada folder peran.
 * Key: nama file (case-sensitive, harus persis dengan file di public/img/simtelog/<folder>/).
 * Value: paragraf caption (1-3 kalimat) yang muncul di bawah gambar - baik di panel maupun lightbox.
 */
export type SimtelogImageCaptions = Record<string, string>;

export type SimtelogRole = {
  id: string;
  name: string;
  fullname: string;
  category: SimtelogCategoryId;
  icon: string;
  tagline: string;
  scenario: string;
  tupoksi: SimtelogTupoksiItem[];
  docs: string[];
  warning: SimtelogWarning | null;
  demo: SimtelogDemo;
  /** Caption per file gambar. Kosong/undefined = belum ada caption. */
  imageCaptions?: SimtelogImageCaptions;
};

export type SimtelogScreen = 'landing' | 'role';
