'use client';

import { useState } from 'react';

export const DocumentGalleryFase5Mock = () => {
  const [activeTab, setActiveTab] = useState('SAKTI Aset');
  
  return (
    <div className="mt-8 bg-slate-100 border border-app-border rounded-xl overflow-hidden shadow-inner flex flex-col sm:flex-row min-h-[350px]">
      <div className="w-full sm:w-56 bg-white border-b sm:border-b-0 sm:border-r border-app-border flex flex-row sm:flex-col shrink-0 overflow-x-auto sm:overflow-visible">
        <div className="p-3 text-sm font-bold text-app-text-muted uppercase tracking-wider hidden sm:block shrink-0">Aplikasi terkait</div>
        <button onClick={() => setActiveTab('SAKTI Aset')} className={`px-4 py-3 text-left text-sm font-medium transition-colors whitespace-nowrap sm:whitespace-normal ${activeTab === 'SAKTI Aset' ? 'bg-app-accent/20 text-app-accent border-b-2 sm:border-b-0 sm:border-l-2 border-app-accent' : 'text-app-text-muted hover:bg-white'}`}>1. SAKTI Modul Aset</button>
        <button onClick={() => setActiveTab('SIMAK BMN')} className={`px-4 py-3 text-left text-sm font-medium transition-colors whitespace-nowrap sm:whitespace-normal ${activeTab === 'SIMAK BMN' ? 'bg-app-accent/20 text-app-accent border-b-2 sm:border-b-0 sm:border-l-2 border-app-accent' : 'text-app-text-muted hover:bg-white'}`}>2. SIMAK BMN</button>
      </div>

      <div className="p-4 md:p-6 flex-1 bg-slate-100 text-slate-900 border-b sm:border-b-0 sm:border-r border-app-border font-serif overflow-y-auto relative" style={{ maxHeight: '450px' }}>
        <div className="absolute top-0 right-0 py-1 px-3 bg-red-600 text-app-text text-sm font-bold tracking-wider uppercase rounded-bl-lg font-sans">Screenshot UI</div>
        
        {activeTab === 'SAKTI Aset' && (
          <div className="animate-in fade-in flex flex-col h-full border border-slate-300 rounded shadow-sm bg-white overflow-hidden">
            <div className="bg-blue-800 text-white px-4 py-2 flex justify-between items-center text-xs font-mono">
              <span className="font-bold tracking-wider">APLIKASI SAKTI - MODUL ASET TETAP</span>
              <span>Kemenkeu RI</span>
            </div>
            <div className="p-4 bg-slate-100 flex-1">
              <div className="grid grid-cols-4 gap-4 mb-4">
                <div className="col-span-1 bg-white p-3 border border-slate-200">
                  <ul className="text-xs space-y-2 text-slate-600 cursor-pointer">
                    <li className="font-bold text-blue-800 border-b pb-1">Transaksi MAB</li>
                    <li className="pl-2">Penyusutan</li>
                    <li className="pl-2">Penghapusan</li>
                    <li className="font-bold text-blue-800 border-b pb-1 mt-2">Laporan</li>
                    <li className="pl-2">Daftar Barang</li>
                  </ul>
                </div>
                <div className="col-span-3 bg-white p-4 border border-slate-200 shadow-sm relative text-xs">
                  <h4 className="font-bold text-slate-700 mb-4 border-bottom pb-2 border-slate-300">Form Pencatatan Aset</h4>
                  <div className="space-y-3">
                    <div className="flex gap-4">
                       <div className="w-1/3 text-right">Kode Barang:</div>
                       <div className="w-2/3 border p-1 bg-slate-50 min-h-6">3.1.2.03.01.033</div>
                    </div>
                    <div className="flex gap-4">
                       <div className="w-1/3 text-right">Nama Barang:</div>
                       <div className="w-2/3 border p-1 bg-slate-50 min-h-6">Peralatan Personal Komputer</div>
                    </div>
                    <div className="flex gap-4">
                       <div className="w-1/3 text-right">Nilai Perolehan:</div>
                       <div className="w-2/3 border p-1 bg-slate-50 min-h-6">Rp 15.000.000</div>
                    </div>
                  </div>
                  <div className="mt-8 flex justify-end gap-2">
                     <button className="px-4 py-1.5 bg-blue-600 text-white rounded">Simpan</button>
                     <button className="px-4 py-1.5 bg-slate-400 text-white rounded">Batal</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'SIMAK BMN' && (
          <div className="animate-in fade-in flex flex-col h-full border border-slate-300 bg-white rounded shadow-sm overflow-hidden">
            <div className="bg-emerald-700 text-white px-4 py-2 flex justify-between items-center text-xs font-mono font-bold tracking-wide">
              <span>Sistem Informasi Manajemen Akuntansi BMN</span>
            </div>
            <div className="p-4 flex-1 bg-emerald-50 text-xs">
              <div className="bg-white border p-3">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-200">
                      <th className="p-2 border">KODE</th>
                      <th className="p-2 border">URAIAN BMN</th>
                      <th className="p-2 border text-center">NUP</th>
                      <th className="p-2 border text-center">TAHUN</th>
                      <th className="p-2 border text-right">NILAI BUKU</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="p-2 border">3.1.2.03.01</td>
                      <td className="p-2 border">PC Desktop / Laptop</td>
                      <td className="p-2 border text-center">1</td>
                      <td className="p-2 border text-center">2024</td>
                      <td className="p-2 border text-right">15,000,000</td>
                    </tr>
                    <tr>
                      <td className="p-2 border">4.1.1.11.01</td>
                      <td className="p-2 border">Renovasi Bangunan</td>
                      <td className="p-2 border text-center">2</td>
                      <td className="p-2 border text-center">2024</td>
                      <td className="p-2 border text-right">45,000,000</td>
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
};
