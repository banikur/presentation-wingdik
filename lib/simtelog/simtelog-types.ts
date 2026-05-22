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
};

export type SimtelogScreen = 'landing' | 'role';
