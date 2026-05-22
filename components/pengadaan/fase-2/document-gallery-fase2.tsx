'use client';

import React, { useState } from 'react';
import { LayoutDashboard, Building, Briefcase } from 'lucide-react';

export const DocumentGalleryFase2Mock = () => {
  const [activeTab, setActiveTab] = useState('DIPA');
  
  return (
    <div className="mt-8 bg-[#1E293B] border border-white/10 rounded-xl overflow-hidden shadow-inner flex flex-col sm:flex-row min-h-[350px]">
      <div className="w-full sm:w-56 bg-white/5 border-b sm:border-b-0 sm:border-r border-white/10 flex flex-row sm:flex-col shrink-0 overflow-x-auto sm:overflow-visible">
        <div className="p-3 text-[10px] font-bold text-white/50 uppercase tracking-wider hidden sm:block shrink-0">Galeri Fase 2</div>
        <button onClick={() => setActiveTab('DIPA')} className={`px-4 py-3 text-left text-sm font-medium transition-colors whitespace-nowrap sm:whitespace-normal ${activeTab === 'DIPA' ? 'bg-[#D4AF37]/20 text-[#D4AF37] border-b-2 sm:border-b-0 sm:border-l-2 border-[#D4AF37]' : 'text-white/70 hover:bg-white/5'}`}>1. DIPA Petikan</button>
        <button onClick={() => setActiveTab('SAKTI')} className={`px-4 py-3 text-left text-sm font-medium transition-colors whitespace-nowrap sm:whitespace-normal ${activeTab === 'SAKTI' ? 'bg-[#D4AF37]/20 text-[#D4AF37] border-b-2 sm:border-b-0 sm:border-l-2 border-[#D4AF37]' : 'text-white/70 hover:bg-white/5'}`}>2. Aplikasi SAKTI (SS)</button>
        <button onClick={() => setActiveTab('Nota Dinas')} className={`px-4 py-3 text-left text-sm font-medium transition-colors whitespace-nowrap sm:whitespace-normal ${activeTab === 'Nota Dinas' ? 'bg-[#D4AF37]/20 text-[#D4AF37] border-b-2 sm:border-b-0 sm:border-l-2 border-[#D4AF37]' : 'text-white/70 hover:bg-white/5'}`}>3. Nota Dinas (HAR)</button>
        <button onClick={() => setActiveTab('SIRUP')} className={`px-4 py-3 text-left text-sm font-medium transition-colors whitespace-nowrap sm:whitespace-normal ${activeTab === 'SIRUP' ? 'bg-[#D4AF37]/20 text-[#D4AF37] border-b-2 sm:border-b-0 sm:border-l-2 border-[#D4AF37]' : 'text-white/70 hover:bg-white/5'}`}>4. SIRUP LKPP (SS)</button>
      </div>

      <div className="p-4 md:p-6 flex-1 bg-slate-100 text-slate-900 border-b sm:border-b-0 sm:border-r border-white/10 font-serif overflow-y-auto" style={{ maxHeight: '450px' }}>
        <div className="absolute top-0 right-0 py-1 px-3 bg-[#1E40AF] text-[#F8FAFC] text-[10px] font-bold tracking-wider uppercase rounded-bl-lg font-sans z-10">Contoh</div>
        
        {activeTab === 'DIPA' && (
          <div className="animate-in fade-in flex flex-col relative h-full">
            <div className="text-center font-bold mb-4 text-sm md:text-base border-b-[3px] border-black pb-2">
              DAFTAR ISIAN PELAKSANAAN ANGGARAN (DIPA) PETIKAN<br/>TAHUN ANGGARAN 2024
            </div>
            
            <div className="text-xs md:text-sm mb-4 space-y-1">
              <div className="flex"><div className="w-32 font-bold">NOMOR DIPA</div><div>: SP DIPA-012.04.2.312345/2024</div></div>
              <div className="flex"><div className="w-32 font-bold">KEMENTERIAN</div><div>: 012 - KEMENTERIAN PERTAHANAN</div></div>
              <div className="flex"><div className="w-32 font-bold">UNIT ORGANISASI</div><div>: 04 - MABES TNI AU</div></div>
              <div className="flex"><div className="w-32 font-bold">SATUAN KERJA</div><div>: 312345 - WING PENDIDIKAN 600/PEMBEKALAN</div></div>
            </div>

            <div className="text-justify text-xs md:text-sm mb-4">
              Mengesahkan alokasi dana sebesar <strong>Rp 24.500.000.000</strong> (Dua Puluh Empat Miliar Lima Ratus Juta Rupiah) kepada Satuan Kerja tersebut dengan rincian sebagaimana terlampir, untuk membiayai kegiatan selama Tahun Anggaran 2024.
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse mb-4 min-w-[500px] text-xs">
                <thead>
                  <tr className="bg-slate-200">
                    <th className="border border-slate-500 p-2 text-center w-12">Program / Kegiatan / KRO / RO</th>
                    <th className="border border-slate-500 p-2 text-right">Pagu (Rp)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-slate-500 p-2 font-bold">012.04.WA - Program Penyelenggaraan Manajemen dan Operasional</td>
                    <td className="border border-slate-500 p-2 text-right font-bold">24.500.000.000</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-500 p-2 pl-4">2965 - Dukungan Manajemen dan Teknis Kodiklatau</td>
                    <td className="border border-slate-500 p-2 text-right">24.500.000.000</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-500 p-2 pl-8 text-slate-700 italic">2965.EBA.994 - Pemeliharaan Gedung dan Bangunan Pendidikan</td>
                    <td className="border border-slate-500 p-2 text-right">4.500.000.000</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div className="flex justify-end mt-4 text-xs">
              <div className="text-center">
                <p className="mb-2">Jakarta, 29 Desember 2023</p>
                <p className="mb-10">A.n. Menteri Keuangan<br/>Direktur Jenderal Anggaran,</p>
                <p className="font-bold underline uppercase">Isa Rachmatarwata</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'SAKTI' && (
           <div className="animate-in fade-in flex flex-col h-[380px] bg-[#f3f4f6] text-black font-sans rounded border shadow-sm relative overflow-hidden">
              {/* Fake Chrome/App Header */}
              <div className="bg-[#1e40af] text-white p-2 flex items-center justify-between text-xs font-medium">
                 <div className="flex items-center gap-2">
                    <div className="bg-white/20 p-1 rounded"><LayoutDashboard className="w-4 h-4"/></div>
                    <span>SAKTI (Sistem Aplikasi Keuangan Tingkat Instansi)</span>
                 </div>
                 <div className="flex gap-4 items-center">
                    <span className="hidden sm:inline-block">2024 | Modul Penganggaran</span>
                    <div className="flex items-center gap-1 bg-white/10 px-2 py-1 rounded">
                       <div className="w-4 h-4 rounded-full bg-white text-blue-900 flex items-center justify-center text-[10px] font-bold">K</div>
                       <span>KPA Satker</span>
                    </div>
                 </div>
              </div>
              <div className="flex flex-1 overflow-hidden">
                 {/* Sidebar */}
                 <div className="w-40 md:w-48 bg-white border-r border-gray-200 p-2 text-[10px] md:text-xs overflow-y-auto">
                    <ul className="space-y-1">
                       <li className="font-bold text-slate-500 mb-1 px-2">MENU UTAMA</li>
                       <li className="px-2 py-1.5 hover:bg-blue-50 rounded">Dashboard</li>
                       <li className="px-2 py-1.5 hover:bg-blue-50 rounded font-bold text-blue-700 bg-blue-50">RUH</li>
                       <li className="pl-6 py-1 text-slate-600 hover:text-blue-600 cursor-pointer">Belanja</li>
                       <li className="pl-6 py-1 text-slate-600 hover:text-blue-600 cursor-pointer">Pendapatan</li>
                       <li className="px-2 py-1.5 hover:bg-blue-50 rounded mt-2">DIPA</li>
                       <li className="pl-6 py-1 font-bold text-blue-700">Monitoring DIPA</li>
                       <li className="pl-6 py-1 text-slate-600 hover:text-blue-600 cursor-pointer">Cetak DIPA</li>
                    </ul>
                 </div>
                 {/* Main Content */}
                 <div className="flex-1 bg-[#f8fafc] p-3 md:p-4 overflow-y-auto">
                    <h4 className="font-bold border-b border-gray-200 pb-2 mb-4 text-sm">Validasi & Monitoring DIPA</h4>
                    
                    <div className="bg-white p-3 border border-gray-200 shadow-sm rounded mb-4">
                       <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                          <div>
                             <label className="block text-gray-500 mb-1">Kode Satker</label>
                             <input type="text" value="312345" className="border border-gray-300 p-1.5 w-full rounded focus:outline-none" readOnly />
                          </div>
                          <div>
                             <label className="block text-gray-500 mb-1">Status DIPA</label>
                             <div className="p-1.5 border border-green-200 bg-green-50 text-green-700 font-bold rounded text-center">Awal / Disahkan</div>
                          </div>
                          <div className="flex items-end">
                             <button className="bg-blue-600 text-white px-3 py-1.5 rounded hover:bg-blue-700 w-full font-medium">Tampilkan Data</button>
                          </div>
                       </div>
                    </div>

                    <div className="bg-white border border-gray-200 shadow-sm rounded overflow-hidden">
                       <table className="w-full text-[10px] md:text-xs">
                         <thead className="bg-gray-100 border-b border-gray-200">
                           <tr>
                              <th className="p-2 text-left">Kode</th>
                              <th className="p-2 text-left">Uraian</th>
                              <th className="p-2 text-right">Pagu DIPA</th>
                              <th className="p-2 text-center">Status SAKTI</th>
                           </tr>
                         </thead>
                         <tbody>
                           <tr className="border-b border-gray-100">
                              <td className="p-2 font-medium">012.04.WA</td>
                              <td className="p-2">Prog Pengelolaan & Ops</td>
                              <td className="p-2 text-right font-medium">24,500,000,000</td>
                              <td className="p-2 text-center"><span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-[9px] font-bold">Otorisasi OK</span></td>
                           </tr>
                         </tbody>
                       </table>
                    </div>
                 </div>
              </div>
           </div>
        )}

        {activeTab === 'Nota Dinas' && (
          <div className="animate-in fade-in flex flex-col font-serif">
            <div className="text-xs md:text-sm mb-4 border-b-2 border-slate-800 pb-4 mt-2">
              <div className="font-bold underline mb-2">NOTA DINAS</div>
              <table className="w-full text-xs md:text-sm">
                <tbody>
                  <tr><td className="w-20 align-top">Nomor</td><td className="w-4 align-top">:</td><td>ND/45/II/2024</td></tr>
                  <tr><td className="align-top">Kepada</td><td className="align-top">:</td><td>Para Dansatker jajaran Wingdik 600</td></tr>
                  <tr><td className="align-top">Dari</td><td className="align-top">:</td><td>Progar Wingdik 600</td></tr>
                  <tr><td className="align-top">Perihal</td><td className="align-top">:</td><td><strong>Pendistribusian Alokasi Anggaran (HAR) TA 2024</strong></td></tr>
                </tbody>
              </table>
            </div>
            
            <p className="indent-8 text-xs md:text-sm mb-4 text-justify">
              Bersama ini kami sampaikan alokasi persetujuan anggaran (Harga Perkiraan Perencanaan - HAR) Tahun Anggaran 2024 berdasarkan DIPA Petikan Pusat yang telah turun melalui SAKTI, dengan rincian alokasi kepada jajaran sebagai berikut:
            </p>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse mb-4 min-w-[400px] text-xs md:text-sm shadow-sm">
                <thead>
                  <tr className="bg-slate-200">
                    <th className="border border-slate-500 p-2 text-center w-8">No</th>
                    <th className="border border-slate-500 p-2 text-left">Satker Penerima</th>
                    <th className="border border-slate-500 p-2 text-left">Jenis Kebutuhan (HAR)</th>
                    <th className="border border-slate-500 p-2 text-right">Alokasi Anggaran (Rp)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-slate-500 p-2 text-center">1</td>
                    <td className="border border-slate-500 p-2">Skadik A</td>
                    <td className="border border-slate-500 p-2">Pemeliharaan Ringan Bangunan</td>
                    <td className="border border-slate-500 p-2 text-right">48.000.000</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-500 p-2 text-center">2</td>
                    <td className="border border-slate-500 p-2">Skadik B</td>
                    <td className="border border-slate-500 p-2">Pengadaan ATK &amp; Sarana Kelas</td>
                    <td className="border border-slate-500 p-2 text-right">25.000.000</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <p className="text-xs md:text-sm text-justify mt-2 mb-8">
              Dimohon untuk segera menyiapkan kelengkapan administrasi pengajuan (Usul Pesanan/UP) ke Layanan Pengadaan sesuai paket yang telah kami riliskan juga ke SIRUP.
            </p>

            <div className="flex justify-end text-xs md:text-sm">
              <div className="text-center">
                <p className="mb-12">Perwira Program dan Anggaran</p>
                <p className="font-bold underline uppercase">Nama Paprogar</p>
                <p>Pangkat / NRP</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'SIRUP' && (
           <div className="animate-in fade-in flex flex-col h-[380px] bg-[#f8fafc] font-sans rounded border shadow-sm relative overflow-hidden">
              {/* Header SIRUP */}
              <div className="bg-[#b91c1c] text-white p-3 flex flex-col sm:flex-row sm:items-center justify-between text-xs border-b-4 border-yellow-400">
                 <div className="font-bold flex items-center gap-2 text-sm sm:text-base">
                    SIRUP (Sistem Informasi Rencana Umum Pengadaan)
                 </div>
                 <div className="flex gap-4 mt-2 sm:mt-0 opacity-90 text-[10px] sm:text-xs">
                    <span className="hover:underline cursor-pointer">Rekap Nasional</span>
                    <span className="hover:underline cursor-pointer">K/L/PD</span>
                    <span className="font-bold">Login KPA/PPK</span>
                 </div>
              </div>

              <div className="p-4 overflow-y-auto">
                 <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                    <h4 className="font-bold text-sm md:text-base text-slate-800">Rekap Rencana Pengadaan (RUP) Tahun 2024</h4>
                    <div className="bg-slate-200 px-3 py-1 rounded text-xs mt-2 sm:mt-0 font-medium text-slate-700">Satker: Wing Pendidikan 600</div>
                 </div>
                 
                 <div className="grid grid-cols-2 gap-3 mb-5">
                    <div className="bg-white p-3 border border-blue-200 rounded-lg shadow-sm border-l-4 border-l-blue-500 relative overflow-hidden">
                       <div className="text-slate-500 text-[10px] sm:text-xs font-bold uppercase mb-1">Total Penyedia</div>
                       <div className="text-lg sm:text-xl font-bold text-slate-800">120 <span className="text-[10px] sm:text-xs font-normal text-slate-500">Paket</span></div>
                       <div className="text-xs sm:text-sm font-semibold text-blue-700 mt-1">Rp 15.000.000.000</div>
                       <div className="absolute top-2 right-2 opacity-10"><Building className="w-8 h-8"/></div>
                    </div>
                    <div className="bg-white p-3 border border-green-200 rounded-lg shadow-sm border-l-4 border-l-green-500 relative overflow-hidden">
                       <div className="text-slate-500 text-[10px] sm:text-xs font-bold uppercase mb-1">Total Swakelola</div>
                       <div className="text-lg sm:text-xl font-bold text-slate-800">12 <span className="text-[10px] sm:text-xs font-normal text-slate-500">Kegiatan</span></div>
                       <div className="text-xs sm:text-sm font-semibold text-green-700 mt-1">Rp 9.500.000.000</div>
                       <div className="absolute top-2 right-2 opacity-10"><Briefcase className="w-8 h-8"/></div>
                    </div>
                 </div>

                 <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
                    <div className="bg-slate-50 p-2 border-b border-slate-200 flex justify-between items-center text-xs">
                       <span className="font-bold text-slate-700">Daftar Paket Penyedia</span>
                       <span className="text-blue-600 hover:underline cursor-pointer">Lihat Semua →</span>
                    </div>
                    <table className="w-full text-[10px] sm:text-xs">
                       <thead className="bg-slate-100 text-slate-600">
                          <tr>
                             <th className="p-2 text-center border-b border-slate-200">ID RUP</th>
                             <th className="p-2 text-left border-b border-slate-200">Nama Paket</th>
                             <th className="p-2 text-right border-b border-slate-200">Pagu (Rp)</th>
                             <th className="p-2 text-center border-b border-slate-200">Metode</th>
                             <th className="p-2 text-center border-b border-slate-200">Status</th>
                          </tr>
                       </thead>
                       <tbody>
                          <tr className="hover:bg-slate-50 border-b border-slate-100">
                             <td className="p-2 text-center text-blue-600 bg-blue-50/50">4567891</td>
                             <td className="p-2 font-medium text-slate-800">Pemeliharaan Bangunan Aula</td>
                             <td className="p-2 text-right">45.000.000</td>
                             <td className="p-2 text-center">Pengadaan Langsung</td>
                             <td className="p-2 text-center"><span className="bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded text-[9px] font-bold whitespace-nowrap">Diumumkan</span></td>
                          </tr>
                          <tr className="hover:bg-slate-50">
                             <td className="p-2 text-center text-blue-600 bg-blue-50/50">4567892</td>
                             <td className="p-2 font-medium text-slate-800">Pengadaan Sarana Kelas / ATK</td>
                             <td className="p-2 text-right">15.000.000</td>
                             <td className="p-2 text-center">E-Purchasing</td>
                             <td className="p-2 text-center"><span className="bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded text-[9px] font-bold whitespace-nowrap">Diumumkan</span></td>
                          </tr>
                       </tbody>
                    </table>
                 </div>
              </div>
           </div>
        )}
      </div>
    </div>
  );
}
