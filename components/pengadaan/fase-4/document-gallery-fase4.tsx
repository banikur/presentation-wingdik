'use client';

import { useState } from 'react';

export const DocumentGalleryFase4Mock = () => {
  const [activeTab, setActiveTab] = useState('RAB');
  
  return (
    <div className="mt-8 bg-[#1E293B] border border-white/10 rounded-xl overflow-hidden shadow-inner flex flex-col sm:flex-row min-h-[300px]">
       <div className="w-full sm:w-48 bg-white/5 border-b sm:border-b-0 sm:border-r border-white/10 flex flex-row sm:flex-col shrink-0 overflow-x-auto sm:overflow-visible">
          <div className="p-3 text-[10px] font-bold text-white/50 uppercase tracking-wider hidden sm:block shrink-0">Galeri Dokumen (Contoh)</div>
          <button onClick={() => setActiveTab('RAB')} className={`px-4 py-3 text-left text-sm font-medium transition-colors whitespace-nowrap sm:whitespace-normal ${activeTab === 'RAB' ? 'bg-[#D4AF37]/20 text-[#D4AF37] border-b-2 sm:border-b-0 sm:border-l-2 border-[#D4AF37]' : 'text-white/70 hover:bg-white/5'}`}>Draf RAB</button>
          <button onClick={() => setActiveTab('SPPH')} className={`px-4 py-3 text-left text-sm font-medium transition-colors whitespace-nowrap sm:whitespace-normal ${activeTab === 'SPPH' ? 'bg-[#D4AF37]/20 text-[#D4AF37] border-b-2 sm:border-b-0 sm:border-l-2 border-[#D4AF37]' : 'text-white/70 hover:bg-white/5'}`}>Surat SPPH</button>
          <button onClick={() => setActiveTab('BAST')} className={`px-4 py-3 text-left text-sm font-medium transition-colors whitespace-nowrap sm:whitespace-normal ${activeTab === 'BAST' ? 'bg-[#D4AF37]/20 text-[#D4AF37] border-b-2 sm:border-b-0 sm:border-l-2 border-[#D4AF37]' : 'text-white/70 hover:bg-white/5'}`}>Draft BAST</button>
       </div>
       <div className="p-4 md:p-6 flex-1 bg-white text-slate-800 text-sm overflow-y-auto relative" style={{ maxHeight: '400px' }}>
          {activeTab === 'RAB' && (
             <div className="animate-in fade-in flex flex-col">
                <div className="flex justify-end mb-4">
                   <button className="flex items-center gap-1.5 px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white rounded text-xs font-sans font-bold transition-colors">
                     <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                     Download Excel
                   </button>
                </div>
                <h3 className="font-bold text-center border-b-[2px] border-slate-800 pb-2 mb-4 text-sm md:text-base">RENCANA ANGGARAN BIAYA (RAB)</h3>
                <div className="text-xs mb-4">
                  <p><strong>Pekerjaan:</strong> Pemeliharaan Ringan Bangunan</p>
                  <p><strong>Lokasi:</strong> Mako Wing</p>
                  <p><strong>Tahun Anggaran:</strong> 2024</p>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse mb-4 min-w-[450px] text-xs md:text-sm">
                    <thead>
                      <tr className="bg-slate-200">
                        <th className="border border-slate-400 p-2 text-center w-8">No</th>
                        <th className="border border-slate-400 p-2 text-left">Uraian Pekerjaan</th>
                        <th className="border border-slate-400 p-2 text-center w-12">Vol</th>
                        <th className="border border-slate-400 p-2 text-right w-24">Harga Satuan</th>
                        <th className="border border-slate-400 p-2 text-right w-28">Jumlah Harga</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-slate-400 p-2 text-center">1</td>
                        <td className="border border-slate-400 p-2">Pekerjaan Pengecatan Dinding & Plafon</td>
                        <td className="border border-slate-400 p-2 text-center">1 Ls</td>
                        <td className="border border-slate-400 p-2 text-right">15.000.000</td>
                        <td className="border border-slate-400 p-2 text-right">15.000.000</td>
                      </tr>
                      <tr>
                        <td className="border border-slate-400 p-2 text-center">2</td>
                        <td className="border border-slate-400 p-2">Perbaikan Atap Seng yang Bocor</td>
                        <td className="border border-slate-400 p-2 text-center">1 Ls</td>
                        <td className="border border-slate-400 p-2 text-right">25.000.000</td>
                        <td className="border border-slate-400 p-2 text-right">25.000.000</td>
                      </tr>
                      <tr className="font-bold bg-slate-100">
                        <td colSpan={4} className="border border-slate-400 p-2 text-right bg-slate-200">Total Harga</td>
                        <td className="border border-slate-400 p-2 text-right">40.000.000</td>
                      </tr>
                      <tr className="font-bold bg-slate-100">
                        <td colSpan={4} className="border border-slate-400 p-2 text-right bg-slate-200">PPN (11%)</td>
                        <td className="border border-slate-400 p-2 text-right">4.400.000</td>
                      </tr>
                      <tr className="font-bold bg-slate-100">
                        <td colSpan={4} className="border border-slate-400 p-2 text-right bg-slate-200">Total + PPN (Dibulatkan)</td>
                        <td className="border border-slate-400 p-2 text-right">44.400.000</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
             </div>
          )}
          {activeTab === 'SPPH' && (
             <div className="animate-in fade-in font-serif text-xs md:text-sm flex flex-col">
                <div className="flex justify-end mb-4">
                   <button className="flex items-center gap-1.5 px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded text-xs font-sans font-bold transition-colors">
                     <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                     Download PDF
                   </button>
                </div>
                <div className="flex flex-col sm:flex-row justify-between mb-4 border-b border-black pb-2">
                   <div>
                     <p>Nomor: B/123/XI/2024</p>
                     <p>Klasifikasi: Biasa</p>
                     <p>Lampiran: 1 (satu) berkas</p>
                     <p>Perihal: <strong>Permintaan Penawaran Harga</strong></p>
                   </div>
                   <div className="text-left sm:text-right mt-2 sm:mt-0">
                     <p>Jakarta, 10 November 2024</p>
                   </div>
                </div>
                <p className="mb-4">Kepada Yth.<br/><strong>Pimpinan CV. Bangun Sentosa</strong><br/>di<br/><span className="ml-4">Tempat</span></p>
                <p className="indent-8 mb-2 text-justify">Sehubungan dengan adanya rencana pengadaan <strong>Pemeliharaan Ringan Bangunan</strong>, kami mengundang perusahaan Saudara untuk menyampaikan penawaran harga untuk pekerjaan tersebut.</p>
                <p className="indent-8 mb-6 text-justify">Dokumen penawaran harga dan kelengkapan administrasi harap dikirimkan selambat-lambatnya pada tanggal <strong>15 November 2024</strong>. Adapun rincian kebutuhan pekerjaan terdapat pada lampiran surat ini.</p>
                <div className="w-[200px] ml-auto text-center mt-8">
                   <p className="mb-12">Pejabat Pembuat Komitmen</p>
                   <p className="font-bold underline uppercase">Nama Pejabat PPK</p>
                   <p>Pangkat / NRP</p>
                </div>
             </div>
          )}
          {activeTab === 'BAST' && (
             <div className="animate-in fade-in text-xs md:text-sm flex flex-col">
                <div className="flex justify-end mb-4">
                   <button className="flex items-center gap-1.5 px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded text-xs font-sans font-bold transition-colors">
                     <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                     Download PDF
                   </button>
                </div>
                <h3 className="font-bold text-center border-b-[2px] border-slate-800 pb-2 mb-4 text-sm md:text-base">
                  BERITA ACARA SERAH TERIMA<br/>HAK DAN KEWAJIBAN PENGADAAN BARANG/JASA
                </h3>
                <p className="text-center mb-6">Nomor: BAST/001/XI/2024</p>
                <p className="mb-4 text-justify indent-8">Pada hari ini, Senin tanggal Delapan Belas bulan November tahun Dua Ribu Dua Puluh Empat, kami yang bertanda tangan di bawah ini:</p>
                <ol className="list-decimal pl-5 mb-4 space-y-2">
                  <li>
                    <strong>Nama Pejabat PPK</strong>, jabatan selaku Pejabat Pembuat Komitmen, selanjutnya disebut sebagai <strong>PIHAK PERTAMA</strong>.
                  </li>
                  <li>
                    <strong>Pimpinan Rekanan</strong>, selaku Direktur CV. Bangun Sentosa, selanjutnya disebut sebagai <strong>PIHAK KEDUA</strong>.
                  </li>
                </ol>
                <p className="mb-8 text-justify indent-8">Bahwa PIHAK KEDUA telah menyelesaikan dan menyerahkan hasil pekerjaan berupa Pemeliharaan Bangunan sesuai dengan SPK Nomor: 001/SPK/XI/2024 kepada PIHAK PERTAMA dalam kondisi baik dan lengkap (100%), dan PIHAK PERTAMA menyatakan menerima hasil pekerjaan tersebut.</p>
                <div className="flex flex-col sm:flex-row justify-between text-center gap-8 sm:gap-4 mt-4">
                   <div className="w-full sm:w-1/2">
                      <p className="mb-12">Pihak Kedua</p>
                      <p className="font-bold underline">Pimpinan Rekanan</p>
                   </div>
                   <div className="w-full sm:w-1/2">
                      <p className="mb-12">Pihak Pertama (PPK)</p>
                      <p className="font-bold underline uppercase">Nama Pejabat PPK</p>
                   </div>
                </div>
             </div>
          )}
       </div>
    </div>
  )
}
