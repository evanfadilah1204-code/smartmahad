import React, { useState } from 'react';
import {
  BookOpenCheck,
  Search,
  Bookmark,
  RefreshCw,
  Plus
} from 'lucide-react';

export default function PbqView({ pbqHistory, setPbqHistory }) {
  const [studiKasus, setStudiKasus] = useState('Shalat Khusyuk & Penjagaan Hati');
  const [tujuan, setTujuan] = useState('Kedisiplinan & Kesadaran Beribadah');
  const [jumlahAyat, setJumlahAyat] = useState(8);
  const [batasAyat, setBatasAyat] = useState('Prioritas Juz 30');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedResults, setGeneratedResults] = useState(null);

  const handleGenerateAyat = (e) => {
    e.preventDefault();
    setIsGenerating(true);
    setGeneratedResults(null);

    setTimeout(() => {
      setIsGenerating(false);
      setGeneratedResults([
        { surah: "QS. Al-Mu'minun: 1-2", arab: "قَدْ أَفْلَحَ الْمُؤْمِنُونَ ۝ الَّذِينَ هُمْ فِي صَلَاتِهِمْ خَاشِعُونَ", artinya: "Sungguh beruntung orang-orang yang beriman, (yaitu) orang yang khusyuk dalam shalatnya." },
        { surah: "QS. Al-Baqarah: 45", arab: "وَاسْتَعِينُوا بِالصَّبْرِ وَالصَّلَاةِ", artinya: "Dan mohonlah pertolongan (kepada Allah) dengan sabar dan shalat." },
        { surah: "QS. Al-Ankabut: 45", arab: "إِنَّ الصَّلَاةَ تَنْهَىٰ عَنِ الْفَحْشَاءِ وَالْمُنْكَرِ", artinya: "Sesungguhnya shalat itu mencegah dari (perbuatan) keji dan mungkar." },
        { surah: "QS. Al-Ma'arij: 22-23", arab: "إِلَّا الْمُصَلِّينَ ۝ الَّذِينَ هُمْ عَلَىٰ صَلَاتِهِمْ دَائِمُونَ", artinya: "Kecuali orang-orang yang melaksanakan shalat, yang mereka itu tetap setia melaksanakan shalatnya." }
      ]);
    }, 1000);
  };

  const handleSimpanKeRiwayat = () => {
    if (!generatedResults) return;
    const newCode = `PBQ-0${pbqHistory.length + 1}`;
    setPbqHistory([
      {
        id: newCode,
        studiKasus,
        tujuan,
        jumlahAyat: Number(jumlahAyat),
        parameter: "LRT4 (Ayam) & LRT2 (Elang)",
        status: "Aktif Berjalan",
        ayatRef: generatedResults.map(r => r.surah).join(', ')
      },
      ...pbqHistory
    ]);
    alert(`✅ Program PBQ ${newCode} berhasil disimpan ke Riwayat!`);
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-700 font-bold">
            <BookOpenCheck className="w-5 h-5" />
            <h2 className="text-lg text-slate-800">Project Based Qur'an (PBQ)</h2>
          </div>
          <p className="text-xs text-slate-500">
            Pencarian ayat Al-Qur'an tematik untuk intervensi karakter & studi kasus santri.
          </p>
        </div>
      </div>

      {/* Form Search Card */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-5">
        <h3 className="font-bold text-slate-800 text-xs uppercase tracking-wider flex items-center gap-2 border-b border-slate-100 pb-3">
          <Search className="w-4 h-4 text-emerald-600" />
          <span>Cari Ayat Al-Qur'an Berdasarkan Topik Studi Kasus</span>
        </h3>

        <form onSubmit={handleGenerateAyat} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Studi Kasus Santri
              </label>
              <input
                type="text"
                required
                value={studiKasus}
                onChange={(e) => setStudiKasus(e.target.value)}
                placeholder="Contoh: Shalat Khusyuk, Pengendalian Emosi..."
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Tujuan Intervensi
              </label>
              <input
                type="text"
                required
                value={tujuan}
                onChange={(e) => setTujuan(e.target.value)}
                placeholder="Contoh: Kedisiplinan & Kesadaran Beribadah..."
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Jumlah Rekomendasi Ayat
              </label>
              <input
                type="number"
                min="1"
                max="20"
                value={jumlahAyat}
                onChange={(e) => setJumlahAyat(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl font-mono focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Batas Ayat Al-Qur'an
              </label>
              <select
                value={batasAyat}
                onChange={(e) => setBatasAyat(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl font-semibold text-slate-700 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              >
                <option value="Prioritas Juz 30">Prioritas Juz 30 (Juz 'Amma)</option>
                <option value="Seluruh Al-Qur'an">Seluruh Al-Qur'an (30 Juz)</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={isGenerating}
              className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition-all flex items-center gap-2"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Mencari Ayat...</span>
                </>
              ) : (
                <>
                  <Search className="w-4 h-4" />
                  <span>Cari Ayat Tematik</span>
                </>
              )}
            </button>
          </div>
        </form>

        {/* Results Preview */}
        {generatedResults && (
          <div className="mt-6 p-5 rounded-2xl bg-slate-900 text-white space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">Hasil Pencarian Ayat</span>
                <h4 className="font-bold text-white text-sm">{studiKasus} &rarr; {tujuan}</h4>
              </div>
              <button
                onClick={handleSimpanKeRiwayat}
                className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs shadow flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Simpan ke Riwayat PBQ</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {generatedResults.map((res, i) => (
                <div key={i} className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-emerald-400 text-xs font-mono">{res.surah}</span>
                    <Bookmark className="w-3.5 h-3.5 text-slate-500" />
                  </div>
                  <p className="text-right text-lg font-serif text-amber-200 leading-loose">{res.arab}</p>
                  <p className="text-[11px] text-slate-300 italic">"{res.artinya}"</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Tabel Riwayat Program PBQ */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <h3 className="font-bold text-slate-800 text-xs uppercase tracking-wider">
            Tabel Riwayat Program Project Based Qur'an (PBQ)
          </h3>
          <span className="text-xs text-slate-500 font-mono">Total: {pbqHistory.length} Program</span>
        </div>

        {pbqHistory.length === 0 ? (
          <div className="p-8 text-center text-xs text-slate-400 space-y-2">
            <BookOpenCheck className="w-8 h-8 text-slate-300 mx-auto" />
            <p className="font-medium text-slate-600">Belum Ada Riwayat Program PBQ</p>
            <p>Gunakan form di atas untuk mencari ayat dan menyimpannya ke riwayat program.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50 text-slate-600 font-bold uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th className="py-3.5 px-4 w-24">Kode</th>
                  <th className="py-3.5 px-4">Studi Kasus & Tujuan</th>
                  <th className="py-3.5 px-4 w-28 text-center">Jumlah Ayat</th>
                  <th className="py-3.5 px-4">Parameter Target</th>
                  <th className="py-3.5 px-4">Referensi Ayat</th>
                  <th className="py-3.5 px-4 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {pbqHistory.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-emerald-700 bg-emerald-50/40">
                      {item.id}
                    </td>
                    <td className="py-3.5 px-4">
                      <p className="font-bold text-slate-900">{item.studiKasus}</p>
                      <p className="text-[11px] text-slate-500">{item.tujuan}</p>
                    </td>
                    <td className="py-3.5 px-4 text-center font-bold text-slate-700">{item.jumlahAyat} Ayat</td>
                    <td className="py-3.5 px-4 font-medium text-slate-700">{item.parameter}</td>
                    <td className="py-3.5 px-4 font-mono text-[11px] text-slate-600 max-w-xs truncate">
                      {item.ayatRef}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200 text-[11px] font-bold inline-flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
