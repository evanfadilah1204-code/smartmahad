import React, { useState } from 'react';
import {
  Printer,
  Download,
  CheckCircle2,
  Sparkles,
  Award,
  BookOpen
} from 'lucide-react';

export default function RaporCetakView({ santriList, parameters }) {
  const [selectedSantriId, setSelectedSantriId] = useState(santriList[0]?.id || 1);
  const santri = santriList.find(s => s.id === Number(selectedSantriId)) || santriList[0];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="p-6 space-y-6 max-w-5xl mx-auto">
      {/* Header Controls (Hidden on Print) */}
      <div className="no-print bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-700 font-bold">
            <Printer className="w-5 h-5" />
            <h2 className="text-lg text-slate-800">Rapor Cetak Santri (Printable View A4)</h2>
          </div>
          <p className="text-xs text-slate-500">
            Pratinjau dan cetak dokumen rapor resmi evaluasi karakter & capaian ibadah pesantren.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={selectedSantriId}
            onChange={(e) => setSelectedSantriId(e.target.value)}
            className="px-3 py-2 bg-emerald-50 border border-emerald-300 text-emerald-900 rounded-xl font-bold text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
          >
            {santriList.map(s => (
              <option key={s.id} value={s.id}>{s.nis} - {s.nama}</option>
            ))}
          </select>

          <button
            onClick={handlePrint}
            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-lg transition-all flex items-center gap-2"
          >
            <Printer className="w-4 h-4" />
            <span>Cetak / Simpan PDF</span>
          </button>
        </div>
      </div>

      {/* A4 PRINT SHEET WRAPPER */}
      <div className="page-a4 bg-white p-8 md:p-12 rounded-2xl border border-slate-300 shadow-2xl space-y-6 text-slate-900">
        {/* KOP RESMI PESANTREN INSAN MANDIRI */}
        <div className="border-b-4 border-emerald-700 pb-4 text-center space-y-1 relative">
          <div className="flex items-center justify-center gap-3">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-800 to-teal-600 text-white font-black text-2xl flex items-center justify-center shadow-md">
              IM
            </div>
            <div className="text-center">
              <h1 className="text-xl font-extrabold tracking-wider uppercase text-emerald-900">
                PESANTREN INSAN MANDIRI
              </h1>
              <h2 className="text-xs font-bold text-slate-700 tracking-tight">
                SISTEM INFORMASI & MANAJEMEN PESANTREN / MA'HAD 5.0
              </h2>
              <p className="text-[10px] text-slate-500">
                Jl. Raya Insan Mandiri No. 50, Kompleks Islamic Education Center | Telp: (021) 8890-1234
              </p>
            </div>
          </div>
          <div className="w-full h-0.5 bg-emerald-400 mt-2"></div>
        </div>

        <div className="text-center">
          <h3 className="text-base font-extrabold uppercase tracking-wide text-slate-900 underline">
            LAPORAN CAPAIAN KARAKTER & HABITUASI IBADAH SANTRI
          </h3>
          <p className="text-xs font-semibold text-slate-600">Semester Ganjil - Tahun Ajaran 2026/2027</p>
        </div>

        {/* IDENTITAS SANTRI */}
        <div className="grid grid-cols-2 gap-4 text-xs bg-slate-50 p-4 rounded-xl border border-slate-200">
          <div className="space-y-1">
            <p><span className="font-semibold text-slate-500 inline-block w-28">Nama Santri</span>: <strong className="text-slate-900 text-sm">{santri.nama}</strong></p>
            <p><span className="font-semibold text-slate-500 inline-block w-28">NIS</span>: <span className="font-mono font-bold text-slate-800">{santri.nis}</span></p>
            <p><span className="font-semibold text-slate-500 inline-block w-28">Kelas / Kamar</span>: {santri.kelas} ({santri.kamar})</p>
          </div>
          <div className="space-y-1 text-right">
            <p><span className="font-semibold text-slate-500">Wali Santri</span>: <strong>{santri.wali || '-'}</strong></p>
            <p><span className="font-semibold text-slate-500">Klaster Kemandirian</span>: <span className="px-2.5 py-0.5 rounded bg-amber-100 text-amber-900 font-bold border border-amber-300">{santri.klaster} ({santri.statusText})</span></p>
            <p><span className="font-semibold text-slate-500">Indeks N-Gain</span>: <strong className="text-emerald-700 font-mono text-sm">{santri.nGain}</strong></p>
          </div>
        </div>

        {/* SECTION 1: EVALUASI NILAI KARAKTER (5 PILAR) */}
        <div className="space-y-2">
          <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider border-b border-slate-200 pb-1">
            I. Evaluasi Karakter (Model Ring Time 5 Binatang) - Skala 0 s.d 4
          </h4>

          <table className="w-full text-left text-xs border border-slate-300">
            <thead className="bg-slate-100 text-slate-800 font-bold border-b border-slate-300">
              <tr>
                <th className="py-2 px-3 border-r border-slate-300 w-16">Kode</th>
                <th className="py-2 px-3 border-r border-slate-300">Aspek & Parameter</th>
                <th className="py-2 px-3 border-r border-slate-300 text-center w-20">Pretest</th>
                <th className="py-2 px-3 border-r border-slate-300 text-center w-20">Posttest</th>
                <th className="py-2 px-3 text-center w-24">Predikat</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {parameters.map((p) => {
                const pre = santri.scoresPre[p.kode] ?? 2.0;
                const post = santri.scoresPost[p.kode] ?? 3.2;
                return (
                  <tr key={p.kode}>
                    <td className="py-2 px-3 border-r border-slate-300 font-mono font-bold text-emerald-800">{p.kode}</td>
                    <td className="py-2 px-3 border-r border-slate-300">
                      <strong>{p.hewan}</strong> - {p.aspek}
                    </td>
                    <td className="py-2 px-3 border-r border-slate-300 text-center font-mono">{pre}</td>
                    <td className="py-2 px-3 border-r border-slate-300 text-center font-mono font-bold text-emerald-800">{post}</td>
                    <td className="py-2 px-3 text-center font-bold text-slate-700">
                      {post >= 3.5 ? 'Sangat Baik' : post >= 2.5 ? 'Baik' : 'Cukup'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* SECTION 2: CAPAIAN AL-QUR'AN & HABITUASI IBADAH */}
        <div className="grid grid-cols-2 gap-4 text-xs">
          <div className="p-3 border border-slate-300 rounded-xl space-y-2">
            <h5 className="font-bold text-slate-800 uppercase border-b border-slate-200 pb-1">
              II. Capaian Al-Qur'an (3 Pilar)
            </h5>
            <p><span className="text-slate-500 inline-block w-28">Predikat Tahsin</span>: <strong>{santri.tahsin}</strong></p>
            <p><span className="text-slate-500 inline-block w-28">Juz Mutqin</span>: <strong>{santri.mutqinJuz}</strong></p>
            <p><span className="text-slate-500 inline-block w-28">Total Capaian</span>: <strong className="text-emerald-700">{santri.totalJuz} Juz</strong></p>
            <p><span className="text-slate-500 inline-block w-28">Program Takhasus</span>: {santri.takhasus}</p>
          </div>

          <div className="p-3 border border-slate-300 rounded-xl space-y-2">
            <h5 className="font-bold text-slate-800 uppercase border-b border-slate-200 pb-1">
              III. Habituasi Ibadah Yaumiyah & 5R
            </h5>
            <p><span className="text-slate-500 inline-block w-28">Shalat Berjamaah</span>: <strong>100% Tuntas</strong></p>
            <p><span className="text-slate-500 inline-block w-28">Puasa Sunnah</span>: <strong>Istiqamah Senin-Kamis</strong></p>
            <p><span className="text-slate-500 inline-block w-28">Kedisiplinan 5R</span>: <strong className="text-teal-700">3.8 / 4.0 (Sangat Rapi)</strong></p>
            <p><span className="text-slate-500 inline-block w-28">Ujian Tasmi'</span>: {santri.tasmiStatus}</p>
          </div>
        </div>

        {/* REKOMENDASI MUSYRIF */}
        <div className="p-3 bg-slate-50 border border-slate-300 rounded-xl text-xs space-y-1">
          <h5 className="font-bold text-slate-800 uppercase">IV. Rekomendasi & Catatan Musyrif Pembina</h5>
          <p className="italic text-slate-700">"{santri.catatanMusyrif}"</p>
        </div>

        {/* TANDA TANGAN SECTION */}
        <div className="pt-8 grid grid-cols-2 text-center text-xs">
          <div>
            <p className="text-slate-500">Mengetahui,</p>
            <p className="font-bold text-slate-800">Musyrif Pembina Asrama</p>
            <div className="h-16"></div>
            <p className="font-bold underline text-slate-900">Ustadz Ahmad Subagja, S.Pd.I</p>
            <p className="text-[10px] text-slate-500">NIP. 19880412 201201 1 002</p>
          </div>

          <div>
            <p className="text-slate-500">Bogor, 30 September 2026</p>
            <p className="font-bold text-slate-800">Mudir Ma'had Insan Mandiri</p>
            <div className="h-16"></div>
            <p className="font-bold underline text-slate-900">Dr. KH. Muhammad Ridwan, M.Ag</p>
            <p className="text-[10px] text-slate-500">NIP. 19750915 200212 1 001</p>
          </div>
        </div>
      </div>
    </div>
  );
}
