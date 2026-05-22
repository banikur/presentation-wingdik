'use client';

import { CheckCircle2, Briefcase } from 'lucide-react';

export function SummarySection() {
  return (
  <div className="flex flex-col items-center justify-center h-full text-center animate-in fade-in zoom-in-95 duration-500 py-10">
    <div className="w-20 h-20 bg-[#1E40AF] rounded-full flex items-center justify-center mb-6 ring-8 ring-[#1E40AF]/30">
      <CheckCircle2 className="w-10 h-10 text-white" />
    </div>
    <h2 className="text-3xl font-extrabold text-[#F8FAFC] mb-4">Luar Biasa!</h2>
    <p className="text-white/80 max-w-lg mb-8 text-sm md:text-base">
      Anda telah menyelesaikan materi pengenalan konseptual prosedur pengadaan barang dan jasa. Pemahaman mulai dari <strong className="text-[#D4AF37]">Renbut</strong>, pencairan <strong className="text-[#D4AF37]">DIPA</strong>, hingga proses pemanggilan via <strong className="text-[#D4AF37]">SPPH</strong> adalah modal awal keberhasilan dukungan misi satuan!
    </p>
    <div className="bg-[#1E293B] border-l-4 border-l-[#D4AF37] rounded-r-xl p-5 max-w-md text-left">
      <h4 className="text-sm font-bold text-[#D4AF37] mb-2 flex items-center gap-2 uppercase tracking-wide">
        <Briefcase className="w-4 h-4 text-[#D4AF37]" /> Apa Selanjutnya?
      </h4>
      <p className="text-xs text-white/70 leading-relaxed">
        Materi ini hanyalah pengenalan alur konseptual. Untuk tahapan pengerjaan teknis, penyusunan formulir 26 ceklis, atau lelang tender besar, silakan merujuk kepada Perkasau dan Juknis pengadaan yang berlaku.
      </p>
    </div>
  </div>
  );
}
