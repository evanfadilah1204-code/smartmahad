import React, { useState } from 'react';
import {
  CheckSquare,
  Filter,
  User,
  BookOpen,
  CheckCircle2,
  Sparkles,
  Award
} from 'lucide-react';

export default function TrackingHafalanView({ santriList, trackingItems, setTrackingItems }) {
  const [selectedKelas, setSelectedKelas] = useState('Kelas 12');
  const [selectedSantriId, setSelectedSantriId] = useState(santriList[0]?.id || 1);

  const activeSantri = santriList.find(s => s.id === Number(selectedSantriId)) || santriList[0];

  const handleToggleCheck = (id, key) => {
    setTrackingItems(trackingItems.map(item => {
      if (item.id === id) {
        return { ...item, [key]: !item[key] };
      }
      return item;
    }));
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-700 font-bold">
            <CheckSquare className="w-5 h-5" />
            <h2 className="text-lg text-slate-800">Tracking Hafalan Ayat & Practical Checklist</h2>
          </div>
          <p className="text-xs text-slate-500">
            Monitoring 4 pilar penguasaan ayat Al-Qur'an (Hafal, Paham Makna, Ditadabburi, Dipraktikkan).
          </p>
        </div>

        {/* Filter */}
        <div className="flex items-center gap-3">
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase mb-0.5">Pilih Santri:</label>
            <select
              value={selectedSantriId}
              onChange={(e) => setSelectedSantriId(e.target.value)}
              className="px-3 py-1.5 bg-emerald-50 border border-emerald-300 text-emerald-900 rounded-xl font-bold text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            >
              {santriList.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.nama} ({s.nis})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Santri Active Card */}
      {activeSantri && (
        <div className="p-4 rounded-xl bg-slate-900 text-white flex items-center justify-between shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-sm">
              {activeSantri.nama[0]}
            </div>
            <div>
              <h3 className="font-extrabold text-white text-sm">{activeSantri.nama}</h3>
              <p className="text-xs text-slate-300 font-mono">NIS: {activeSantri.nis} | Mutqin: {activeSantri.mutqinJuz}</p>
            </div>
          </div>
          <div className="px-3 py-1 rounded-lg bg-emerald-950 text-emerald-300 text-xs font-semibold border border-emerald-800">
            Capaian Total: {activeSantri.totalJuz} Juz
          </div>
        </div>
      )}

      {/* Table Tracking Checklist */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="p-4 bg-slate-50/80 border-b border-slate-200/80 flex items-center justify-between">
          <h3 className="font-bold text-slate-800 text-xs uppercase tracking-wider">
            Matriks Evaluasi 4 Pilar Penguasaan Ayat
          </h3>
          <span className="text-xs text-slate-500 italic">Klik kotak centang untuk memperbarui status</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-100/70 text-slate-600 font-bold uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3.5 px-4 w-12">No</th>
                <th className="py-3.5 px-4">Nama Surah & Ayat</th>
                <th className="py-3.5 px-4 text-center">[1] Hafal</th>
                <th className="py-3.5 px-4 text-center">[2] Paham Makna</th>
                <th className="py-3.5 px-4 text-center">[3] Ditadabburi</th>
                <th className="py-3.5 px-4 text-center">[4] Dipraktikkan</th>
                <th className="py-3.5 px-4 text-center">Status Lengkap</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {trackingItems.map((item, idx) => {
                const isFullyComplete = item.hafal && item.paham && item.tadabbur && item.praktik;
                return (
                  <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-4 px-4 font-mono text-slate-400">{idx + 1}</td>
                    <td className="py-4 px-4 font-bold text-slate-900 text-sm">{item.ayat}</td>

                    {/* [1] Hafal */}
                    <td className="py-4 px-4 text-center">
                      <button
                        onClick={() => handleToggleCheck(item.id, 'hafal')}
                        className={`w-6 h-6 rounded-md border flex items-center justify-center mx-auto transition-all ${
                          item.hafal
                            ? 'bg-emerald-600 border-emerald-600 text-white shadow'
                            : 'bg-white border-slate-300 text-transparent hover:border-slate-400'
                        }`}
                      >
                        ✓
                      </button>
                    </td>

                    {/* [2] Paham Makna */}
                    <td className="py-4 px-4 text-center">
                      <button
                        onClick={() => handleToggleCheck(item.id, 'paham')}
                        className={`w-6 h-6 rounded-md border flex items-center justify-center mx-auto transition-all ${
                          item.paham
                            ? 'bg-emerald-600 border-emerald-600 text-white shadow'
                            : 'bg-white border-slate-300 text-transparent hover:border-slate-400'
                        }`}
                      >
                        ✓
                      </button>
                    </td>

                    {/* [3] Ditadabburi */}
                    <td className="py-4 px-4 text-center">
                      <button
                        onClick={() => handleToggleCheck(item.id, 'tadabbur')}
                        className={`w-6 h-6 rounded-md border flex items-center justify-center mx-auto transition-all ${
                          item.tadabbur
                            ? 'bg-emerald-600 border-emerald-600 text-white shadow'
                            : 'bg-white border-slate-300 text-transparent hover:border-slate-400'
                        }`}
                      >
                        ✓
                      </button>
                    </td>

                    {/* [4] Dipraktikkan */}
                    <td className="py-4 px-4 text-center">
                      <button
                        onClick={() => handleToggleCheck(item.id, 'praktik')}
                        className={`w-6 h-6 rounded-md border flex items-center justify-center mx-auto transition-all ${
                          item.praktik
                            ? 'bg-emerald-600 border-emerald-600 text-white shadow'
                            : 'bg-white border-slate-300 text-transparent hover:border-slate-400'
                        }`}
                      >
                        ✓
                      </button>
                    </td>

                    <td className="py-4 px-4 text-center">
                      {isFullyComplete ? (
                        <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200 text-[11px] font-bold inline-flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          Mumtaz 100%
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 border border-slate-200 text-[11px] font-semibold">
                          Proses Habituasi
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
