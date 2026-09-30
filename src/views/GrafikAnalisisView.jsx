import React, { useState } from 'react';
import {
  BarChart3,
  Users,
  UserPlus
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';

export default function GrafikAnalisisView({ santriList, parameters, setActiveView }) {
  const [selectedKelas, setSelectedKelas] = useState('Kelas 12');
  const [selectedSantriId, setSelectedSantriId] = useState(santriList[0]?.id || '');

  const activeSantri = santriList.find(s => s.id === Number(selectedSantriId)) || santriList[0];

  const barChartData = parameters.map(p => ({
    parameter: `${p.hewan}`,
    Pretest: activeSantri?.scoresPre?.[p.kode] ?? 2.0,
    Posttest: activeSantri?.scoresPost?.[p.kode] ?? 3.2
  }));

  const radarData = parameters.map(p => ({
    subject: `${p.hewan}`,
    Score: activeSantri?.scoresPost?.[p.kode] ?? 3.2,
    fullMark: 4
  }));

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-700 font-bold">
            <BarChart3 className="w-5 h-5" />
            <h2 className="text-lg text-slate-800">Grafik & Analisis Karakter Santri</h2>
          </div>
          <p className="text-xs text-slate-500">
            Perbandingan nilai Pretest vs Posttest dan Radar Profil Keseimbangan 5 Pilar Karakter.
          </p>
        </div>

        {santriList.length > 0 && (
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
        )}
      </div>

      {santriList.length === 0 ? (
        <div className="bg-white p-12 rounded-2xl border border-slate-200 shadow-xs text-center text-xs space-y-4">
          <Users className="w-10 h-10 text-slate-300 mx-auto" />
          <div>
            <h3 className="font-bold text-slate-800 text-sm">Belum Ada Data Santri Untuk Dihasilkan Grafik</h3>
            <p className="text-slate-500 mt-1 max-w-sm mx-auto">
              Silakan tambahkan data santri terlebih dahulu agar grafik analisis pretest/posttest dan radar dapat ditampilkan.
            </p>
          </div>
          <button
            onClick={() => setActiveView('data-santri')}
            className="px-4 py-2.5 rounded-xl bg-emerald-600 text-white font-semibold text-xs shadow-xs hover:bg-emerald-700 transition-colors inline-flex items-center gap-2"
          >
            <UserPlus className="w-4 h-4" />
            <span>+ Tambah Santri Baru</span>
          </button>
        </div>
      ) : (
        <>
          {/* Active Santri Strip */}
          {activeSantri && (
            <div className="p-4 rounded-xl bg-slate-900 text-white flex flex-wrap items-center justify-between gap-4 shadow-xs border border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-extrabold text-sm">
                  {activeSantri.nama[0]}
                </div>
                <div>
                  <h3 className="font-bold text-white text-base">{activeSantri.nama}</h3>
                  <p className="text-xs text-slate-300">
                    NIS: <span className="font-mono text-emerald-400 font-bold">{activeSantri.nis}</span> | {activeSantri.kelas} ({activeSantri.kamar})
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs">
                <div className="text-right">
                  <span className="block text-[10px] text-slate-400 uppercase font-semibold">Klaster</span>
                  <span className="font-bold text-amber-300 bg-amber-500/20 px-2.5 py-0.5 rounded border border-amber-500/30">
                    {activeSantri.klaster} ({activeSantri.statusText})
                  </span>
                </div>

                <div className="text-right border-l border-slate-800 pl-4">
                  <span className="block text-[10px] text-slate-400 uppercase font-semibold">N-Gain</span>
                  <span className="font-mono font-bold text-emerald-400 text-base">{activeSantri.nGain}</span>
                </div>
              </div>
            </div>
          )}

          {/* Grid 2 Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Grafik 1: Pretest vs Posttest */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <h3 className="font-bold text-slate-800 text-sm">Grafik 1: Pretest vs Posttest</h3>
                  <p className="text-xs text-slate-500">Perbandingan Peningkatan Skor (0 - 4)</p>
                </div>
              </div>

              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={barChartData} margin={{ top: 20, right: 20, left: -20, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="parameter" tick={{ fill: '#475569', fontSize: 11, fontWeight: 600 }} />
                    <YAxis domain={[0, 4]} tick={{ fill: '#64748b', fontSize: 11 }} />
                    <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderRadius: '8px', color: '#fff', fontSize: '12px' }} />
                    <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                    <Bar dataKey="Pretest" fill="#94a3b8" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="Posttest" fill="#059669" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Grafik 2: Radar Chart */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <h3 className="font-bold text-slate-800 text-sm">Grafik 2: Radar Profil Keseimbangan</h3>
                  <p className="text-xs text-slate-500">Diagram Spider 5 Pilar Karakter</p>
                </div>
              </div>

              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarData}>
                    <PolarGrid stroke="#cbd5e1" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#334155', fontSize: 11, fontWeight: 700 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 4]} />
                    <Radar name={activeSantri?.nama || "Santri"} dataKey="Score" stroke="#0d9488" fill="#14b8a6" fillOpacity={0.4} />
                    <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderRadius: '8px', color: '#fff', fontSize: '12px' }} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
