'use client';

export const DocumentGalleryFase1Mock = ({ activeTab, setActiveTab }: { activeTab: string, setActiveTab: (t: string) => void }) => {
  return (
    <div className="mt-8 bg-[#1E293B] border border-white/10 rounded-xl overflow-hidden shadow-inner flex flex-col sm:flex-row min-h-[350px]">
      <div className="w-full sm:w-56 bg-white/5 border-b sm:border-b-0 sm:border-r border-white/10 flex flex-row sm:flex-col shrink-0 overflow-x-auto sm:overflow-visible">
        <div className="p-3 text-[10px] font-bold text-white/50 uppercase tracking-wider hidden sm:block shrink-0">Galeri Dokumen Fase 1</div>
        <button onClick={() => setActiveTab('Skadik')} className={`px-4 py-3 text-left text-sm font-medium transition-colors whitespace-nowrap sm:whitespace-normal ${activeTab === 'Skadik' ? 'bg-[#D4AF37]/20 text-[#D4AF37] border-b-2 sm:border-b-0 sm:border-l-2 border-[#D4AF37]' : 'text-white/70 hover:bg-white/5'}`}>1. Renbut Skadik</button>
        <button onClick={() => setActiveTab('Wingdik')} className={`px-4 py-3 text-left text-sm font-medium transition-colors whitespace-nowrap sm:whitespace-normal ${activeTab === 'Wingdik' ? 'bg-[#D4AF37]/20 text-[#D4AF37] border-b-2 sm:border-b-0 sm:border-l-2 border-[#D4AF37]' : 'text-white/70 hover:bg-white/5'}`}>2. Renbut Wingdik</button>
        <button onClick={() => setActiveTab('Pusdik')} className={`px-4 py-3 text-left text-sm font-medium transition-colors whitespace-nowrap sm:whitespace-normal ${activeTab === 'Pusdik' ? 'bg-[#D4AF37]/20 text-[#D4AF37] border-b-2 sm:border-b-0 sm:border-l-2 border-[#D4AF37]' : 'text-white/70 hover:bg-white/5'}`}>3. Renbut Pusdik</button>
        <button onClick={() => setActiveTab('Kodik')} className={`px-4 py-3 text-left text-sm font-medium transition-colors whitespace-nowrap sm:whitespace-normal ${activeTab === 'Kodik' ? 'bg-[#D4AF37]/20 text-[#D4AF37] border-b-2 sm:border-b-0 sm:border-l-2 border-[#D4AF37]' : 'text-white/70 hover:bg-white/5'}`}>4. Renbut Kodik</button>
        <button onClick={() => setActiveTab('Mabes AU')} className={`px-4 py-3 text-left text-sm font-medium transition-colors whitespace-nowrap sm:whitespace-normal ${activeTab === 'Mabes AU' ? 'bg-[#D4AF37]/20 text-[#D4AF37] border-b-2 sm:border-b-0 sm:border-l-2 border-[#D4AF37]' : 'text-white/70 hover:bg-white/5'}`}>5. Usulan Mabes AU</button>
      </div>

      <div className="p-4 md:p-6 flex-1 bg-slate-100 text-slate-900 border-b sm:border-b-0 sm:border-r border-white/10 font-serif overflow-y-auto" style={{ maxHeight: '450px' }}>
        <div className="absolute top-0 right-0 py-1 px-3 bg-[#1E40AF] text-[#F8FAFC] text-[10px] font-bold tracking-wider uppercase rounded-bl-lg font-sans">Contoh Dokumen</div>
        
        {activeTab === 'Renbut Satuan' && (
          <div className="animate-in fade-in flex flex-col">
            <div className="text-center font-bold mb-6 text-sm md:text-base border-b-2 border-slate-800 pb-2">
              RENCANA KEBUTUHAN (RENBUT) BARANG/JASA<br/>WING PENDIDIKAN 600 / PEMBEKALAN<br/>TAHUN ANGGARAN 2024
            </div>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse mb-4 min-w-[500px] text-xs md:text-sm">
                <thead>
                  <tr className="bg-slate-200">
                    <th className="border border-slate-500 p-2 text-center w-8">No</th>
                    <th className="border border-slate-500 p-2 text-left">Nama Barang / Jasa</th>
                    <th className="border border-slate-500 p-2 text-center w-12">Vol</th>
                    <th className="border border-slate-500 p-2 text-center w-16">Satuan</th>
                    <th className="border border-slate-500 p-2 text-right w-24">Harga (Rp)</th>
                    <th className="border border-slate-500 p-2 text-left">Alasan Singkat</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-slate-500 p-2 text-center">1</td>
                    <td className="border border-slate-500 p-2">Pemeliharaan Ringan Bangunan Aula</td>
                    <td className="border border-slate-500 p-2 text-center">1</td>
                    <td className="border border-slate-500 p-2 text-center">Paket</td>
                    <td className="border border-slate-500 p-2 text-right">45.000.000</td>
                    <td className="border border-slate-500 p-2 text-sm text-slate-700">Atap bocor, plafon rusak</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-500 p-2 text-center">2</td>
                    <td className="border border-slate-500 p-2">Pengadaan ATK Rutin & Kertas</td>
                    <td className="border border-slate-500 p-2 text-center">1</td>
                    <td className="border border-slate-500 p-2 text-center">Paket</td>
                    <td className="border border-slate-500 p-2 text-right">15.000.000</td>
                    <td className="border border-slate-500 p-2 text-sm text-slate-700">Dukungan opsdik semester I</td>
                  </tr>
                  <tr className="font-bold bg-slate-100">
                    <td colSpan={4} className="border border-slate-500 p-2 text-right bg-slate-200">Total Usulan Satuan</td>
                    <td className="border border-slate-500 p-2 text-right">60.000.000</td>
                    <td className="border border-slate-500 p-2"></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="flex justify-end mt-4 text-xs md:text-sm">
              <div className="text-center">
                <p className="mb-10">Komandan Satuan</p>
                <p className="font-bold underline uppercase">Nama Komandan Wing</p>
                <p>Pangkat / NRP</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'Renbut Kotama' && (
          <div className="animate-in fade-in flex flex-col">
            <div className="text-center font-bold mb-6 text-sm md:text-base border-b-2 border-slate-800 pb-2">
              REKAPITULASI RENCANA KEBUTUHAN<br/>KODIKLATAU<br/>TAHUN ANGGARAN 2024
            </div>
            <p className="text-xs md:text-sm mb-4 indent-8 text-justify">
              Berikut adalah rekapitulasi usulan kebutuhan dari berbagai satuan di bawah jajaran Kodiklatau sebagai bahan usulan kepada tingkat Markas Besar / Srena:
            </p>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse mb-4 min-w-[500px] text-xs md:text-sm">
                <thead>
                  <tr className="bg-slate-200">
                    <th className="border border-slate-500 p-2 text-center w-8">No</th>
                    <th className="border border-slate-500 p-2 text-left">Nama Satuan (Wingdik / Pusdik)</th>
                    <th className="border border-slate-500 p-2 text-right">Usulan Barang/Jasa</th>
                    <th className="border border-slate-500 p-2 text-right">Usulan Pemeliharaan</th>
                    <th className="border border-slate-500 p-2 text-right">Total Anggaran (Rp)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-slate-500 p-2 text-center">1</td>
                    <td className="border border-slate-500 p-2">Wing Pendidikan 100 / Terbang</td>
                    <td className="border border-slate-500 p-2 text-right">150.000.000</td>
                    <td className="border border-slate-500 p-2 text-right">300.000.000</td>
                    <td className="border border-slate-500 p-2 text-right">450.000.000</td>
                  </tr>
                  <tr className="bg-yellow-100">
                    <td className="border border-slate-500 p-2 text-center">...</td>
                    <td className="border border-slate-500 p-2 font-bold">Wing Pendidikan 600 / Pembekalan</td>
                    <td className="border border-slate-500 p-2 text-right">15.000.000</td>
                    <td className="border border-slate-500 p-2 text-right">45.000.000</td>
                    <td className="border border-slate-500 p-2 text-right font-bold">60.000.000</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-500 p-2 text-center">...</td>
                    <td className="border border-slate-500 p-2">Sekkau / Seskoau</td>
                    <td className="border border-slate-500 p-2 text-right">...</td>
                    <td className="border border-slate-500 p-2 text-right">...</td>
                    <td className="border border-slate-500 p-2 text-right">...</td>
                  </tr>
                  <tr className="font-bold bg-slate-100">
                    <td colSpan={4} className="border border-slate-500 p-2 text-right bg-slate-200">Total Kompilasi Kodiklatau</td>
                    <td className="border border-slate-500 p-2 text-right">24.500.000.000</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="flex justify-end mt-4 text-xs md:text-sm">
              <div className="text-center">
                <p className="mb-10">Komandan Kodiklatau</p>
                <p className="font-bold underline uppercase">Nama Dankodiklatau</p>
                <p>Pangkat / NRP</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'Renbut Mabes' && (
          <div className="animate-in fade-in flex flex-col">
            <div className="text-center font-bold mb-6 text-sm md:text-base border-b-2 border-slate-800 pb-2">
              USULAN RENCANA KEBUTUHAN TNI ANGKATAN UDARA<br/>MARKAS BESAR (SRENAAU)<br/>TAHUN ANGGARAN 2024
            </div>
            <p className="text-xs md:text-sm mb-4 indent-8 text-justify">
              Kompilasi usulan rencana kebutuhan tingkat Markas Besar TNI AU berdasarkan pengajuan dari berbagai Komando Utama (Kotama) jajaran:
            </p>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse mb-4 min-w-[500px] text-xs md:text-sm">
                <thead>
                  <tr className="bg-slate-200">
                    <th className="border border-slate-500 p-2 text-center w-8">No</th>
                    <th className="border border-slate-500 p-2 text-left">Kotama / Balakpus</th>
                    <th className="border border-slate-500 p-2 text-center">Prioritas 1 (Rp)</th>
                    <th className="border border-slate-500 p-2 text-center">Prioritas 2 (Rp)</th>
                    <th className="border border-slate-500 p-2 text-right">Total Akumulasi (Rp)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-slate-500 p-2 text-center">1</td>
                    <td className="border border-slate-500 p-2">Koopsudnas</td>
                    <td className="border border-slate-500 p-2 text-right">150 Milyar</td>
                    <td className="border border-slate-500 p-2 text-right">50 Milyar</td>
                    <td className="border border-slate-500 p-2 text-right">200.000.000.000</td>
                  </tr>
                  <tr className="bg-yellow-100">
                    <td className="border border-slate-500 p-2 text-center">2</td>
                    <td className="border border-slate-500 p-2 font-bold">Kodiklatau (Termasuk Wingdik 600)</td>
                    <td className="border border-slate-500 p-2 text-right">20 Milyar</td>
                    <td className="border border-slate-500 p-2 text-right">4.5 Milyar</td>
                    <td className="border border-slate-500 p-2 text-right font-bold">24.500.000.000</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-500 p-2 text-center">3</td>
                    <td className="border border-slate-500 p-2">Koharmatau</td>
                    <td className="border border-slate-500 p-2 text-right">120 Milyar</td>
                    <td className="border border-slate-500 p-2 text-right">30 Milyar</td>
                    <td className="border border-slate-500 p-2 text-right">150.000.000.000</td>
                  </tr>
                  <tr className="font-bold bg-slate-100">
                    <td colSpan={4} className="border border-slate-500 p-2 text-right bg-slate-200">Total Kebutuhan TNI AU</td>
                    <td className="border border-slate-500 p-2 text-right">374.500.000.000</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="flex justify-end mt-4 text-xs md:text-sm">
              <div className="text-center">
                <p className="mb-10">Asisten Perencanaan dan Anggaran (Asrena) Kasau</p>
                <p className="font-bold underline uppercase">Nama Asrena</p>
                <p>Pangkat / NRP</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'Kertas Kerja' && (
          <div className="animate-in fade-in flex flex-col">
            <div className="text-center font-bold mb-6 text-sm md:text-base border-b-2 border-slate-800 pb-2">
              KERTAS KERJA PROGRAM DAN ANGGARAN (RKA) TNI AU<br/>KEMENTERIAN PERTAHANAN RI<br/>TAHUN ANGGARAN 2024
            </div>
            
            <div className="text-xs md:text-sm mb-4 space-y-2">
              <p><strong>Bagian Anggaran:</strong> 012 (Kementerian Pertahanan)</p>
              <p><strong>Unit Organisasi:</strong> 04 (TNI Angkatan Udara)</p>
              <p><strong>Program:</strong> Program Penyelenggaraan Manajemen dan Operasional Matra Udara</p>
              <p><strong>Kegiatan:</strong> Dukungan Pendidikan dan Pembentukan Personel</p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse mb-4 min-w-[500px] text-xs md:text-sm">
                <thead>
                  <tr className="bg-slate-200">
                    <th className="border border-slate-500 p-2 text-left">Kode / Rincian KRO / RO / Komponen</th>
                    <th className="border border-slate-500 p-2 text-center w-16">Volume</th>
                    <th className="border border-slate-500 p-2 text-right w-32">Harga Satuan (Rp)</th>
                    <th className="border border-slate-500 p-2 text-right w-32">Jumlah (Rp)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="font-bold bg-slate-100">
                    <td className="border border-slate-500 p-2">2965.EBA.994 - Dukungan Manajemen dan Teknis Kodiklatau</td>
                    <td className="border border-slate-500 p-2 text-center">12 Bln</td>
                    <td className="border border-slate-500 p-2 text-right">-</td>
                    <td className="border border-slate-500 p-2 text-right">24.500.000.000</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-500 p-2 pl-6">051 - Pemeliharaan Gedung dan Bangunan Pendidikan</td>
                    <td className="border border-slate-500 p-2 text-center">...</td>
                    <td className="border border-slate-500 p-2 text-right">...</td>
                    <td className="border border-slate-500 p-2 text-right">...</td>
                  </tr>
                  <tr className="bg-yellow-100/50">
                    <td className="border border-slate-500 p-2 pl-12 text-slate-700">A. Pemeliharaan Ringan Aula Wingdik 600</td>
                    <td className="border border-slate-500 p-2 text-center">1 Pkt</td>
                    <td className="border border-slate-500 p-2 text-right">45.000.000</td>
                    <td className="border border-slate-500 p-2 text-right">45.000.000</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-500 p-2 pl-6">052 - Pengadaan Barang Persediaan (ATK)</td>
                    <td className="border border-slate-500 p-2 text-center">...</td>
                    <td className="border border-slate-500 p-2 text-right">...</td>
                    <td className="border border-slate-500 p-2 text-right">...</td>
                  </tr>
                  <tr className="bg-yellow-100/50">
                    <td className="border border-slate-500 p-2 pl-12 text-slate-700">A. Dukungan Opsdik Wingdik 600</td>
                    <td className="border border-slate-500 p-2 text-center">1 Pkt</td>
                    <td className="border border-slate-500 p-2 text-right">15.000.000</td>
                    <td className="border border-slate-500 p-2 text-right">15.000.000</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <p className="text-xs md:text-sm text-slate-700 italic mt-2">
              *Kertas Kerja ini akan menjadi dasar DIPA/RKA-KL setelah dibahas dan disetujui bersama Kementerian Keuangan dan DPR-RI.
            </p>
          </div>
        )}

        {activeTab === 'RKA-KL' && (
          <div className="animate-in fade-in flex flex-col">
            <div className="flex justify-between items-start mb-6 border-b-4 border-slate-800 pb-2">
              <div className="text-left font-bold text-sm">
                KEMENTERIAN KEUANGAN RI<br/>DIREKTORAT JENDERAL ANGGARAN
              </div>
              <div className="text-right font-bold text-xs md:text-sm">
                FORMAT RKA-K/L DIPA<br/>TAHUN ANGGARAN 2024
              </div>
            </div>
            
            <div className="text-center font-bold mb-6 text-sm md:text-base">
              RENCANA KERJA DAN ANGGARAN KEMENTERIAN NEGARA/LEMBAGA<br/>(DRAFT / DOKUMEN HASIL PENELAAHAN)
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs md:text-sm mb-6 border border-slate-400 p-4">
              <div>
                <p><strong>Bagian Anggaran :</strong> 012 - Kementerian Pertahanan</p>
                <p><strong>Unit Organisasi :</strong> 04 - Mabes TNI AU</p>
                <p><strong>Provinsi/Kab :</strong> DKI Jakarta</p>
              </div>
              <div>
                <p><strong>Kode Satker :</strong> 312345</p>
                <p><strong>Nama Satker :</strong> Pusat Perbendaharaan Kodiklatau</p>
                <p><strong>Kewenangan :</strong> Pusat (KP)</p>
              </div>
            </div>

            <p className="text-xs md:text-sm mb-2 font-bold">REKAPITULASI ALOKASI:</p>
            <div className="overflow-x-auto mb-6">
              <table className="w-full border-collapse min-w-[500px] text-xs md:text-sm">
                <thead>
                  <tr className="bg-slate-200">
                    <th className="border border-slate-500 p-2 text-center w-12">Kode</th>
                    <th className="border border-slate-500 p-2 text-left">Fungsi / Subfungsi / Program / Kegiatan</th>
                    <th className="border border-slate-500 p-2 text-right">Rupiah Murni</th>
                    <th className="border border-slate-500 p-2 text-right">Total Anggaran</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="font-bold">
                    <td className="border border-slate-500 p-2 text-center">03</td>
                    <td className="border border-slate-500 p-2">PERTAHANAN</td>
                    <td className="border border-slate-500 p-2 text-right">24.500.000.000</td>
                    <td className="border border-slate-500 p-2 text-right">24.500.000.000</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-500 p-2 text-center">03.01</td>
                    <td className="border border-slate-500 p-2 pl-6">Pertahanan Negara</td>
                    <td className="border border-slate-500 p-2 text-right">...</td>
                    <td className="border border-slate-500 p-2 text-right">...</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-500 p-2 text-center">...</td>
                    <td className="border border-slate-500 p-2 pl-10 text-slate-700 italic">... (Alokasi turun hingga tingkat DIPA Petikan Satker) ...</td>
                    <td className="border border-slate-500 p-2 text-right">...</td>
                    <td className="border border-slate-500 p-2 text-right">...</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-red-50 text-red-800 p-4 rounded text-xs md:text-sm border border-red-200">
              <strong className="block mb-1">Catatan Penting:</strong>
              Dokumen RKA-KL inilah yang kemudian disahkan menjadi DIPA (Daftar Isian Pelaksanaan Anggaran) yang menjadi dasar bagi Satker untuk dapat melakukan belanja pengadaan barang/jasa, baik itu melalui penarikan UP atau LS.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
