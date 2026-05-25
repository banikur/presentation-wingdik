'use client';

export const UpDocumentMock = () => {
  return (
    <div className="mt-8 bg-slate-100 border border-app-border rounded-xl overflow-hidden shadow-inner flex flex-col min-h-[300px]">
      <div className="bg-slate-100 text-slate-900 p-6 flex flex-col font-serif relative">
        <div className="absolute top-0 right-0 py-1 px-3 bg-[#1E40AF] text-app-text text-sm font-bold tracking-wider uppercase rounded-bl-lg font-sans">Contoh Dokumen</div>
        
        <div className="flex justify-end mb-4">
           <button className="flex items-center gap-1.5 px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white rounded text-xs font-sans font-bold transition-colors">
             <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
             Download Excel
           </button>
        </div>

        <div className="text-center font-bold mb-6 text-sm md:text-base border-b-2 border-slate-800 pb-2 uppercase text-slate-800 tracking-wider">
          USUL PESANAN (UP)
        </div>

        <div className="text-xs md:text-sm mb-4">
          <p className="mb-2"><strong>Dasar:</strong> Nota Dinas Progar Wingdik 600 Nomor ND/45/II/2024 tentang Pendistribusian HAR.</p>
          <p className="mb-4">Mohon kiranya dapat direalisasikan pengadaan barang/jasa untuk kebutuhan Skadik A dengan rincian sebagai berikut:</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse mb-4 min-w-[500px] text-xs md:text-sm">
            <thead>
              <tr className="bg-slate-200">
                <th className="border border-slate-500 p-2 text-center w-8">No</th>
                <th className="border border-slate-500 p-2 text-left">Macam Barang/Jasa</th>
                <th className="border border-slate-500 p-2 text-center w-12">Banyak</th>
                <th className="border border-slate-500 p-2 text-right">Harga Satuan (Rp)</th>
                <th className="border border-slate-500 p-2 text-right">Jumlah Harga (Rp)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-slate-500 p-2 text-center">1</td>
                <td className="border border-slate-500 p-2">Pemeliharaan Ringan Bangunan (Sesuai RAB terlampir)</td>
                <td className="border border-slate-500 p-2 text-center">1 Pkt</td>
                <td className="border border-slate-500 p-2 text-right">48.000.000</td>
                <td className="border border-slate-500 p-2 text-right">48.000.000</td>
              </tr>
              <tr className="font-bold bg-slate-100">
                <td colSpan={4} className="border border-slate-500 p-2 text-right bg-slate-200">Total</td>
                <td className="border border-slate-500 p-2 text-right">48.000.000</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-between mt-8 text-xs md:text-sm gap-8 sm:gap-4">
          <div className="w-full sm:w-1/2 text-center">
            <p className="mb-12">Menyetujui,<br/>Komandan Wingdik 600</p>
            <p className="font-bold underline uppercase">Nama Komandan Wing</p>
            <p>Pangkat / NRP</p>
          </div>
          <div className="w-full sm:w-1/2 text-center">
            <p className="mb-12">Yang Mengusulkan,<br/>Komandan Skadik A</p>
            <p className="font-bold underline uppercase">Nama Komandan Skadik</p>
            <p>Pangkat / NRP</p>
          </div>
        </div>
      </div>
    </div>
  );
}
