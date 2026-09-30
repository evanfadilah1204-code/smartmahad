import React, { useState } from 'react';
import {
  CalendarCheck,
  Calendar,
  Filter,
  Check,
  X,
  Sparkles,
  Save
} from 'lucide-react';

export default function PresensiIbadahView({ santriList }) {
  const [selectedTanggal, setSelectedTanggal] = useState('2026-09-30');
  const [selectedKelas, setSelectedKelas] = useState('Kelas 12');

  // Matrix state for 10 santri
  const [attendance, setAttendance] = useState(() => {
    const init = {};
    santriList.forEach(s => {
      init[s.id] = {
        subuh: true,
        maghrib: true,
        isya: true,
        rawatib: true,
        puasaSunnah: s.id % 2 === 0, // 5 santri puasa
        kajian: true,
        hardSkill: true,
        apelJumat: true,
        skor5R: 3.8
      };
    });
    return init;
  });

  const toggleCheck = (id, key) => {
    setAttendance(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        [key]: !prev[id][key]
      }
    }));
  };

  const handle5RChange = (id, val) => {
    setAttendance(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        skor5R: Number(val)
      }
    }));
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header & Date/Class Filter */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-700 font-bold">
            <CalendarCheck className="w-5 h-5" />
            <h2 className="text-lg text-slate-800">Presensi Ibadah Daily & Kebersihan 5R</h2>
          </div>
          <p className="text-xs text-slate-500">
            Matriks checklist ibadah yaumiyah dan penilaian habituasi 5R (Ringkas, Rapi, Resik, Rawat, Rajin).
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase mb-0.5">Pilih Tanggal:</label>
            <input
              type="date"
              value={selectedTanggal}
              onChange={(e) => setSelectedTanggal(e.target.value)}
              className="px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-xl font-mono text-xs font-semibold text-slate-700 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase mb-0.5">Filter Kelas:</label>
            <select
              value={selectedKelas}
              onChange={(e) => setSelectedKelas(e.target.value)}
              className="px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-slate-700 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            >
              <option value="Kelas 12">Kelas 12</option>
              <option value="Kelas 11">Kelas 11</option>
            </select>
          </div>
        </div>
      </div>

      {/* Summary Chips */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        <div className="p-3 bg-white rounded-xl border border-slate-200/80 shadow-sm">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Shalat Jamaah Masjid</span>
          <p className="font-extrabold text-slate-800 text-base mt-0.5">100% Hadir</p>
        </div>
        <div className="p-3 bg-white rounded-xl border border-slate-200/80 shadow-sm">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Santri Puasa Sunnah</span>
          <p className="font-extrabold text-emerald-600 text-base mt-0.5">5 dari 10 Santri</p>
        </div>
        <div className="p-3 bg-white rounded-xl border border-slate-200/80 shadow-sm">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Rata-rata Kebersihan 5R</span>
          <p className="font-extrabold text-teal-600 text-base mt-0.5">3.8 / 4.0</p>
        </div>
        <div className="p-3 bg-white rounded-xl border border-slate-200/80 shadow-sm">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Kajian & Hard Skill</span>
          <p className="font-extrabold text-indigo-600 text-base mt-0.5">Tuntas 100%</p>
        </div>
      </div>

      {/* Presensi Matrix Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="p-4 bg-slate-50/80 border-b border-slate-200/80 flex items-center justify-between">
          <h3 className="font-bold text-slate-800 text-xs uppercase tracking-wider">
            Matriks Presensi Ibadah 10 Santri Kelas 12 (Tanggal: {selectedTanggal})
          </h3>
          <button
            onClick={() => alert("✅ Data presensi ibadah harian & 5R berhasil disimpan!")}
            className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs shadow flex items-center gap-1.5"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Simpan Presensi</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-100/70 text-slate-700 font-bold uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3.5 px-3">Nama Santri</th>
                <th className="py-3.5 px-2 text-center">Subuh</th>
                <th className="py-3.5 px-2 text-center">Maghrib</th>
                <th className="py-3.5 px-2 text-center">Isya</th>
                <th className="py-3.5 px-2 text-center">Rawatib</th>
                <th className="py-3.5 px-2 text-center">Puasa Sunnah</th>
                <th className="py-3.5 px-2 text-center">Kajian</th>
                <th className="py-3.5 px-2 text-center">Hard Skill</th>
                <th className="py-3.5 px-2 text-center">Apel/Jumat</th>
                <th className="py-3.5 px-3 text-center">Nilai 5R (0-4)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {santriList.map((s) => {
                const att = attendance[s.id] || {};
                return (
                  <tr key={s.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-3 font-bold text-slate-900 whitespace-nowrap">
                      {s.nama}
                      <span className="block text-[10px] text-slate-400 font-mono font-normal">{s.kamar}</span>
                    </td>

                    {['subuh', 'maghrib', 'isya', 'rawatib', 'puasaSunnah', 'kajian', 'hardSkill', 'apelJumat'].map((key) => (
                      <td key={key} className="py-3.5 px-2 text-center">
                        <button
                          onClick={() => toggleCheck(s.id, key)}
                          className={`w-6 h-6 rounded-md font-bold text-xs transition-all mx-auto flex items-center justify-center ${
                            att[key]
                              ? 'bg-emerald-600 text-white shadow'
                              : 'bg-slate-100 text-slate-400 hover:bg-slate-200'
                          }`}
                        >
                          {att[key] ? '✓' : '-'}
                        </button>
                      </td>
                    ))}

                    <td className="py-3.5 px-3 text-center">
                      <input
                        type="number"
                        min="0"
                        max="4"
                        step="0.1"
                        value={att.skor5R ?? 3.8}
                        onChange={(e) => handle5RChange(s.id, e.target.value)}
                        className="w-16 px-2 py-1 bg-slate-50 border border-slate-300 rounded-lg text-center font-bold text-emerald-700 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                      />
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
