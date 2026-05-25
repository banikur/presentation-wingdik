'use client';

import { CheckCircle2, Briefcase } from 'lucide-react';

export function SummarySection() {
  return (
  <div className="flex flex-col items-center justify-center h-full text-center animate-in fade-in zoom-in-95 duration-500 py-10">
    <div className="w-20 h-20 bg-[#1E40AF] rounded-full flex items-center justify-center mb-6 ring-8 ring-[#1E40AF]/30">
      <CheckCircle2 className="w-10 h-10 text-white" />
    </div>
    <h2 className="text-3xl font-extrabold text-app-text mb-4">Luar Biasa!</h2>
    <p className="text-app-text max-w-lg mb-8 text-sm md:text-base">
      Anda telah menyelesaikan materi pengenalan konseptual prosedur pengadaan barang dan jasa. Pemahaman mulai dari <strong className="text-app-accent">Renbut</strong>, pencairan <strong className="text-app-accent">DIPA</strong>, hingga proses pemanggilan via <strong className="text-app-accent">SPPH</strong> adalah modal awal keberhasilan dukungan misi satuan!
    </p>
    <div className="bg-slate-100 border-l-4 border-l-app-accent rounded-r-xl p-5 max-w-md text-left">
      <h4 className="text-sm font-bold text-app-accent mb-2 flex items-center gap-2 uppercase tracking-wide">
        <Briefcase className="w-4 h-4 text-app-accent" /> Apa Selanjutnya?
      </h4>
      <p className="text-xs text-app-text-muted leading-relaxed">
        Materi ini hanyalah pengenalan alur konseptual. Untuk tahapan pengerjaan teknis, penyusunan formulir 26 ceklis, atau lelang tender besar, silakan merujuk kepada Perkasau dan Juknis pengadaan yang berlaku.
      </p>
    </div>
  </div>
  );
}
