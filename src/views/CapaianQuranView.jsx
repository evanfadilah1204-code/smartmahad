import React, { useState } from 'react';
import {
  BookMarked,
  Save,
  CheckCircle2,
  Award,
  Sparkles,
  Edit2
} from 'lucide-react';

export default function CapaianQuranView({ santriList, setSantriList }) {
  const [selectedSantriId, setSelectedSantriId] = useState(santriList[0]?.id || 1);
  const activeSantri = santriList.find(s => s.id === Number(selectedSantriId)) || santriList[0];

  const [formData, setFormData] = useState({
    tahsin: activeSantri?.tahsin || 'Mumtaz',
    mutqinJuz: activeSantri?.mutqinJuz || 'Juz 30, 29, 28',
    totalJuz: activeSantri?.totalJuz || 5,
    takhasus: activeSantri?.takhasus || 'Tahfiz Intensity',
    tasmiStatus: activeSantri?.tasmiStatus || 'Lulus Test 5 Juz',
    catatanMusyrif: activeSantri?.catatanMusyrif || 'Aktif dalam halaqah subuh.'
  });

  const handleSantriSelect = (id) => {
    setSelectedSantriId(id);
    const s = santriList.find(x => x.id === Number(id));
    if (s) {
      setFormData({
        tahsin: s.tahsin,
        mutqinJuz: s.mutqinJuz,
        totalJuz: s.totalJuz,
        takhasus: s.takhasus,
        tasmiStatus: s.tasmiStatus,
        catatanMusyrif: s.catatanMusyrif
      });
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    setSantriList(santriList.map(s => s.id === Number(selectedSantriId) ? { ...s, ...formData } : s));
    alert("✅ Data Evaluasi 3 Pilar Al-Qur'an Berhasil Diperbarui!");
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-700 font-bold">
            <BookMarked className="w-5 h-5" />
            <h2 className="text-lg text-slate-800">Capaian Al-Qur'an (3 Pilar: Tahsin, Tahfiz, Takhasus)</h2>
          </div>
          <p className="text-xs text-slate-500">
            Evaluasi berkala kelancaran munaqosyah, hafalan juz mutqin, serta sertifikasi tasmi' santri.
          </p>
        </div>
      </div>

      {/* Form Evaluasi Santri */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
        <h3 className="font-bold text-slate-800 text-xs uppercase tracking-wider border-b border-slate-100 pb-2">
          Form Evaluasi Capaian Al-Qur'an Santri
        </h3>

        <form onSubmit={handleSave} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Pilih Santri</label>
              <select
                value={selectedSantriId}
                onChange={(e) => handleSantriSelect(e.target.value)}
                className="w-full px-3 py-2 bg-emerald-50 border border-emerald-300 text-emerald-900 rounded-xl font-bold focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              >
                {santriList.map(s => (
                  <option key={s.id} value={s.id}>{s.nis} - {s.nama}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Predikat Tahsin</label>
              <select
                value={formData.tahsin}
                onChange={(e) => setFormData({ ...formData, tahsin: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl font-semibold text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              >
                <option value="Mumtaz">Mumtaz (Sangat Baik / Fasih)</option>
                <option value="Jayyid Jiddan">Jayyid Jiddan (Baik Sekali)</option>
                <option value="Jayyid">Jayyid (Baik)</option>
                <option value="Maqbul">Maqbul (Cukup)</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Program Takhasus Santri</label>
              <select
                value={formData.takhasus}
                onChange={(e) => setFormData({ ...formData, takhasus: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl font-semibold text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              >
                <option value="Tahfiz Intensity">Tahfiz Intensity</option>
                <option value="Project Based Quran">Project Based Quran</option>
                <option value="Leadership & Da'wah">Leadership & Da'wah</option>
                <option value="Bahasa Arab & Hadits">Bahasa Arab & Hadits</option>
                <option value="Islamic Hard Skill">Islamic Hard Skill</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Rincian Juz Mutqin</label>
              <input
                type="text"
                value={formData.mutqinJuz}
                onChange={(e) => setFormData({ ...formData, mutqinJuz: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                placeholder="Contoh: Juz 30, 29, 28"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Total Capaian (Juz)</label>
              <input
                type="number"
                min="0"
                max="30"
                value={formData.totalJuz}
                onChange={(e) => setFormData({ ...formData, totalJuz: Number(e.target.value) })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl font-bold font-mono focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Status Ujian Tasmi'</label>
              <input
                type="text"
                value={formData.tasmiStatus}
                onChange={(e) => setFormData({ ...formData, tasmiStatus: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl font-semibold text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                placeholder="Contoh: Lulus Test 5 Juz"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Catatan Evaluasi Musyrif / Ustadz</label>
            <textarea
              rows="2"
              value={formData.catatanMusyrif}
              onChange={(e) => setFormData({ ...formData, catatanMusyrif: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            ></textarea>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>Simpan Evaluasi Qur'an</span>
            </button>
          </div>
        </form>
      </div>

      {/* Tabel Rekapitulasi Data Capaian Al-Qur'an Santri */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="p-4 bg-slate-50/80 border-b border-slate-200/80 flex items-center justify-between">
          <h3 className="font-bold text-slate-800 text-xs uppercase tracking-wider">
            Tabel Rekapitulasi Data Capaian Al-Qur'an Santri Kelas 12
          </h3>
          <span className="text-xs text-slate-500 font-mono">10 Santri Terdaftar</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-100/70 text-slate-600 font-bold uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3.5 px-4">Nama Santri</th>
                <th className="py-3.5 px-4 text-center">Predikat Tahsin</th>
                <th className="py-3.5 px-4">Juz Mutqin</th>
                <th className="py-3.5 px-4 text-center">Total Juz</th>
                <th className="py-3.5 px-4">Program Takhasus</th>
                <th className="py-3.5 px-4">Status Tasmi'</th>
                <th className="py-3.5 px-4">Catatan Musyrif</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {santriList.map((s) => (
                <tr key={s.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-slate-900">{s.nama}</td>
                  <td className="py-3.5 px-4 text-center">
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200 font-semibold text-[11px]">
                      {s.tahsin}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-700 font-medium">{s.mutqinJuz}</td>
                  <td className="py-3.5 px-4 text-center font-extrabold text-teal-700 font-mono">{s.totalJuz} Juz</td>
                  <td className="py-3.5 px-4 font-semibold text-slate-800">{s.takhasus}</td>
                  <td className="py-3.5 px-4 text-slate-600">{s.tasmiStatus}</td>
                  <td className="py-3.5 px-4 text-slate-500 max-w-xs truncate">{s.catatanMusyrif}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
