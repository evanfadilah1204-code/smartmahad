import React from 'react';
import {
  Download,
  FileSpreadsheet,
  FileCheck,
  Sparkles,
  CheckCircle2
} from 'lucide-react';

export default function EksporDataView({ santriList }) {
  const downloadCSV = (content, filename) => {
    const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExportNGain = () => {
    let csv = 'NIS,Nama Santri,Kelas,Kamar,Klaster,Pretest_Avg,Posttest_Avg,NGain_Score\n';
    santriList.forEach(s => {
      const preAvg = (Object.values(s.scoresPre).reduce((a, b) => a + b, 0) / 5).toFixed(2);
      const postAvg = (Object.values(s.scoresPost).reduce((a, b) => a + b, 0) / 5).toFixed(2);
      csv += `"${s.nis}","${s.nama}","${s.kelas}","${s.kamar}","${s.klaster}",${preAvg},${postAvg},${s.nGain}\n`;
    });
    downloadCSV(csv, `N-Gain_Report_SmartMahad_Kelas12_${new Date().toISOString().split('T')[0]}.csv`);
  };

  const handleExportSemuaSkor = () => {
    let csv = 'NIS,Nama Santri,Kelas,LRT1_Singa,LRT2_Elang,LRT3_Sapi,LRT4_Ayam,LRT5_Bunglon,NGain,Tahsin,MutqinJuz\n';
    santriList.forEach(s => {
      csv += `"${s.nis}","${s.nama}","${s.kelas}",${s.scores.LRT1},${s.scores.LRT2},${s.scores.LRT3},${s.scores.LRT4},${s.scores.LRT5},${s.nGain},"${s.tahsin}","${s.mutqinJuz}"\n`;
    });
    downloadCSV(csv, `Semua_Skor_Karakter_InsanMandiri_${new Date().toISOString().split('T')[0]}.csv`);
  };

  return (
    <div className="p-6 space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-emerald-700 font-bold">
            <Download className="w-5 h-5" />
            <h2 className="text-lg text-slate-800">Ekspor Data Laporan (CSV / Excel)</h2>
          </div>
          <p className="text-xs text-slate-500">
            Unduh rekapitulasi data nilai N-Gain dan seluruh skor instrumen karakter santri.
          </p>
        </div>
      </div>

      {/* 2 Utama Buttons Hub */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Tombol 1: Ekspor N-Gain CSV */}
        <div className="bg-white p-6 rounded-2xl border border-emerald-200 shadow-sm space-y-4 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 border border-emerald-300 flex items-center justify-center font-bold text-xl">
              <FileSpreadsheet className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-base">Ekspor N-Gain CSV</h3>
              <p className="text-xs text-slate-500">Laporan indeks efektivitas peningkatan karakter pretest vs posttest.</p>
            </div>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl text-xs text-slate-600 space-y-1 font-mono">
            <p className="font-bold text-slate-700">Struktur Kolom CSV:</p>
            <p>NIS, Nama Santri, Kelas, Kamar, Klaster, Pretest_Avg, Posttest_Avg, NGain_Score</p>
          </div>

          <button
            onClick={handleExportNGain}
            className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" />
            <span>Ekspor N-Gain CSV (.csv)</span>
          </button>
        </div>

        {/* Tombol 2: Ekspor Semua Skor CSV */}
        <div className="bg-white p-6 rounded-2xl border border-teal-200 shadow-sm space-y-4 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-700 border border-teal-300 flex items-center justify-center font-bold text-xl">
              <FileCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-base">Ekspor Semua Skor CSV</h3>
              <p className="text-xs text-slate-500">Laporan lengkap seluruh 5 parameter (LRT1 - LRT5) & hafalan Qur'an.</p>
            </div>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl text-xs text-slate-600 space-y-1 font-mono">
            <p className="font-bold text-slate-700">Struktur Kolom CSV:</p>
            <p>NIS, Nama, Kelas, LRT1, LRT2, LRT3, LRT4, LRT5, NGain, Tahsin, MutqinJuz</p>
          </div>

          <button
            onClick={handleExportSemuaSkor}
            className="w-full py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" />
            <span>Ekspor Semua Skor CSV (.csv)</span>
          </button>
        </div>
      </div>

      {/* Preview Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="p-4 bg-slate-50/80 border-b border-slate-200/80 flex items-center justify-between">
          <h3 className="font-bold text-slate-800 text-xs uppercase tracking-wider">
            Preview Ringkas Data Siap Ekspor (10 Santri)
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-100/70 text-slate-700 font-bold uppercase">
              <tr>
                <th className="py-3 px-4">NIS</th>
                <th className="py-3 px-4">Nama Santri</th>
                <th className="py-3 px-4 text-center">Singa</th>
                <th className="py-3 px-4 text-center">Elang</th>
                <th className="py-3 px-4 text-center">Sapi</th>
                <th className="py-3 px-4 text-center">Ayam</th>
                <th className="py-3 px-4 text-center">Bunglon</th>
                <th className="py-3 px-4 text-center">N-Gain</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono">
              {santriList.map(s => (
                <tr key={s.id} className="hover:bg-slate-50">
                  <td className="py-3 px-4 font-bold text-slate-800">{s.nis}</td>
                  <td className="py-3 px-4 font-sans font-bold text-slate-900">{s.nama}</td>
                  <td className="py-3 px-4 text-center">{s.scores.LRT1}</td>
                  <td className="py-3 px-4 text-center">{s.scores.LRT2}</td>
                  <td className="py-3 px-4 text-center">{s.scores.LRT3}</td>
                  <td className="py-3 px-4 text-center">{s.scores.LRT4}</td>
                  <td className="py-3 px-4 text-center">{s.scores.LRT5}</td>
                  <td className="py-3 px-4 text-center font-bold text-teal-700">{s.nGain}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
