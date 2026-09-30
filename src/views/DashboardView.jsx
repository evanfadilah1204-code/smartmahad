import React from 'react';
import {
  Users,
  Boxes,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  ShieldCheck,
  Activity,
  Database,
  UserPlus,
  BookOpen
} from 'lucide-react';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export default function DashboardView({ santriList, parameters, setActiveView, onLoadSampleData }) {
  const totalSantri = santriList.length;
  const modulAktif = 2;
  const avgNGain = totalSantri > 0 ? (santriList.reduce((acc, s) => acc + s.nGain, 0) / totalSantri).toFixed(3) : "0.000";

  const klasterMerah = santriList.filter(s => s.klaster === 'Merah').length;
  const klasterKuning = santriList.filter(s => s.klaster === 'Kuning').length;
  const klasterHijau = santriList.filter(s => s.klaster === 'Hijau').length;

  const radarData = parameters.map(p => ({
    subject: `${p.hewan} (${p.kode})`,
    A: totalSantri > 0 ? 3.0 : 0,
    fullMark: 4
  }));

  const barData = santriList.map(s => ({
    nama: s.nama.split(' ')[0],
    nGain: s.nGain
  }));

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Running Text Hadits Hari Ini Banner */}
      <div className="bg-slate-950 text-white rounded-2xl p-3 border-2 border-slate-800 shadow-md overflow-hidden">
        <div className="flex items-center gap-3">
          <div className="px-3 py-1 rounded-xl bg-emerald-700 text-white text-xs font-black whitespace-nowrap shadow-sm flex items-center gap-1.5 border border-emerald-500">
            <BookOpen className="w-3.5 h-3.5" />
            <span>HADITS HARI INI</span>
          </div>
          <div className="overflow-hidden relative w-full py-0.5">
            <div className="animate-running-text text-sm font-bold text-emerald-300 font-serif tracking-wide">
              "خَيْرُكُمْ مَنْ تَعَلَّمَ الْقُرْآنَ وَعَلَّمَهُ" — Sebaik-baik kalian adalah orang yang mempelajari Al-Qur'an dan mengajarkannya (HR. Bukhari) &nbsp;&nbsp;•&nbsp;&nbsp; Pesantren Insan Mandiri — Mahad Modern Islamic Boarding School.
            </div>
          </div>
        </div>
      </div>

      {/* Welcome Banner */}
      <div className="rounded-2xl bg-slate-950 p-6 text-white shadow-md border-2 border-slate-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900/60 text-emerald-300 text-xs font-bold border border-emerald-500/40">
              <span>SmartMahad</span>
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight">
              Sistem Informasi & Manajemen Pesantren Insan Mandiri
            </h1>
            <p className="text-slate-300 text-xs leading-relaxed font-medium">
              Platform terpadu monitoring ibadah harian santri, evaluasi habituasi 5 pilar karakter (Singa, Elang, Sapi, Ayam, Bunglon), serta analisis N-Gain.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setActiveView('data-santri')}
              className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs transition-colors shadow-md flex items-center gap-2"
            >
              <UserPlus className="w-4 h-4" />
              <span>+ Tambah Santri Baru</span>
            </button>
            {totalSantri === 0 && (
              <button
                onClick={onLoadSampleData}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition-colors border border-slate-600 flex items-center gap-2"
              >
                <Database className="w-4 h-4 text-emerald-400" />
                <span>Isi Data Sampel</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Header Metrik Utama (6 Cards High Contrast) */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {/* Total Santri */}
        <div className="bg-white p-4 rounded-2xl border-2 border-slate-300 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold text-slate-700 uppercase tracking-wider">Total Santri</span>
            <div className="p-2 rounded-xl bg-blue-100 text-blue-900 border border-blue-300">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-3xl font-black text-slate-950">{totalSantri}</div>
            <p className="text-xs font-bold text-slate-600 mt-0.5">Santri Terdaftar</p>
          </div>
        </div>

        {/* Modul Aktif */}
        <div className="bg-white p-4 rounded-2xl border-2 border-slate-300 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold text-slate-700 uppercase tracking-wider">Modul Aktif</span>
            <div className="p-2 rounded-xl bg-indigo-100 text-indigo-900 border border-indigo-300">
              <Boxes className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-3xl font-black text-slate-950">{modulAktif}</div>
            <p className="text-xs font-bold text-slate-600 mt-0.5">Ring Time & Shalat</p>
          </div>
        </div>

        {/* Rata-rata N-Gain */}
        <div className="bg-white p-4 rounded-2xl border-2 border-slate-300 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold text-slate-700 uppercase tracking-wider">Rata-rata N-Gain</span>
            <div className="p-2 rounded-xl bg-teal-100 text-teal-900 border border-teal-300">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-3xl font-black text-slate-950">{avgNGain}</div>
            <p className="text-xs font-bold text-teal-800 mt-0.5">Indeks Peningkatan</p>
          </div>
        </div>

        {/* Klaster Merah */}
        <div className="bg-white p-4 rounded-2xl border-2 border-rose-300 shadow-sm bg-rose-50/40">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold text-rose-900 uppercase tracking-wider">Klaster Merah</span>
            <div className="p-2 rounded-xl bg-rose-200 text-rose-900 border border-rose-300">
              <AlertCircle className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-3xl font-black text-rose-950">{klasterMerah}</div>
            <p className="text-xs font-bold text-rose-900 mt-0.5">Butuh Intervensi</p>
          </div>
        </div>

        {/* Klaster Kuning */}
        <div className="bg-white p-4 rounded-2xl border-2 border-amber-300 shadow-sm bg-amber-50/40">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold text-amber-900 uppercase tracking-wider">Klaster Kuning</span>
            <div className="p-2 rounded-xl bg-amber-200 text-amber-900 border border-amber-300">
              <Activity className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-3xl font-black text-amber-950">{klasterKuning}</div>
            <p className="text-xs font-bold text-amber-900 mt-0.5">Pasif / Cukup</p>
          </div>
        </div>

        {/* Klaster Hijau */}
        <div className="bg-white p-4 rounded-2xl border-2 border-emerald-300 shadow-sm bg-emerald-50/40">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold text-emerald-900 uppercase tracking-wider">Klaster Hijau</span>
            <div className="p-2 rounded-xl bg-emerald-200 text-emerald-900 border border-emerald-300">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-3xl font-black text-emerald-950">{klasterHijau}</div>
            <p className="text-xs font-bold text-emerald-900 mt-0.5">Mandiri / Siap</p>
          </div>
        </div>
      </div>

      {/* Box Empty State or Normal Status Banner */}
      {totalSantri === 0 ? (
        <div className="p-5 rounded-2xl bg-amber-100/90 border-2 border-amber-400 text-amber-950 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-600 text-white flex items-center justify-center font-black text-lg shadow-sm">
              !
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-amber-950">Belum Ada Data Santri Terdaftar</h3>
              <p className="text-xs font-semibold text-amber-900">
                Sistem siap digunakan. Tambahkan santri baru secara manual atau klik tombol muat data sampel untuk menguji fitur.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 whitespace-nowrap">
            <button
              onClick={() => setActiveView('data-santri')}
              className="px-4 py-2 rounded-xl bg-emerald-700 text-white hover:bg-emerald-800 text-xs font-extrabold transition-colors shadow-sm"
            >
              + Tambah Santri
            </button>
            <button
              onClick={onLoadSampleData}
              className="px-4 py-2 rounded-xl bg-amber-700 text-white hover:bg-amber-800 text-xs font-extrabold transition-colors shadow-sm"
            >
              Muat Data Sampel
            </button>
          </div>
        </div>
      ) : (
        <div className="p-4 rounded-2xl bg-emerald-100/90 border-2 border-emerald-400 text-emerald-950 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-700 text-white flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-emerald-950">Status Peringatan Visual Intervensi Santri</h3>
              <p className="text-xs font-semibold text-emerald-900">
                "Alhamdulillah, tidak ada santri di klaster merah saat ini." Total {totalSantri} santri aktif dalam sistem.
              </p>
            </div>
          </div>
          <button
            onClick={() => setActiveView('data-santri')}
            className="px-3.5 py-2 rounded-xl bg-emerald-700 text-white hover:bg-emerald-800 text-xs font-extrabold transition-colors hidden sm:block shadow-sm"
          >
            Kelola Santri
          </button>
        </div>
      )}

      {/* Visual Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Radar Profile Karakter */}
        <div className="bg-white p-5 rounded-2xl border-2 border-slate-300 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b-2 border-slate-200 pb-3">
            <div>
              <h3 className="font-extrabold text-slate-950 text-sm">Profil 5 Pilar Karakter</h3>
              <p className="text-xs font-semibold text-slate-600">Skor Indikator Karakter Santri (Skala 0 - 4)</p>
            </div>
            <span className="text-xs px-3 py-1 bg-slate-200 rounded-full font-bold text-slate-800 border border-slate-300">Model Ring Time</span>
          </div>

          {totalSantri === 0 ? (
            <div className="h-64 flex flex-col items-center justify-center text-slate-500 text-xs space-y-2 border-2 border-dashed border-slate-300 rounded-xl bg-slate-50">
              <Boxes className="w-8 h-8 text-slate-400" />
              <p className="font-bold text-slate-700">Grafik radar akan tampil setelah data skor santri diisi.</p>
            </div>
          ) : (
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarData}>
                  <PolarGrid stroke="#cbd5e1" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#0f172a', fontSize: 11, fontWeight: 700 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 4]} />
                  <Radar name="Rata-rata Skor" dataKey="A" stroke="#047857" fill="#10b981" fillOpacity={0.45} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>

        {/* N-Gain Per Santri Chart */}
        <div className="bg-white p-5 rounded-2xl border-2 border-slate-300 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b-2 border-slate-200 pb-3">
            <div>
              <h3 className="font-extrabold text-slate-950 text-sm">Distribusi N-Gain Santri</h3>
              <p className="text-xs font-semibold text-slate-600">Indeks Peningkatan Pembelajaran</p>
            </div>
            <button
              onClick={() => setActiveView('grafik-analisis')}
              className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
            >
              Detail Grafik &rarr;
            </button>
          </div>

          {totalSantri === 0 ? (
            <div className="h-64 flex flex-col items-center justify-center text-slate-500 text-xs space-y-2 border-2 border-dashed border-slate-300 rounded-xl bg-slate-50">
              <TrendingUp className="w-8 h-8 text-slate-400" />
              <p className="font-bold text-slate-700">Grafik N-Gain akan tampil setelah data santri diisi.</p>
            </div>
          ) : (
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#cbd5e1" />
                  <XAxis dataKey="nama" tick={{ fill: '#0f172a', fontSize: 11, fontWeight: 700 }} />
                  <YAxis domain={[0, 1]} tick={{ fill: '#0f172a', fontSize: 11, fontWeight: 700 }} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0f172a', borderRadius: '8px', color: '#fff', fontSize: '12px' }}
                  />
                  <Bar dataKey="nGain" fill="#0d9488" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </div>

      {/* Table Santri Summary */}
      <div className="bg-white rounded-2xl border-2 border-slate-300 shadow-sm overflow-hidden">
        <div className="p-4 border-b-2 border-slate-200 bg-slate-50 flex items-center justify-between">
          <div>
            <h3 className="font-black text-slate-950 text-sm">Daftar Santri Terdaftar</h3>
            <p className="text-xs font-semibold text-slate-600">Status Klaster & Capaian Santri</p>
          </div>
          <button
            onClick={() => setActiveView('data-santri')}
            className="text-xs font-extrabold text-emerald-800 bg-emerald-50 border-2 border-emerald-300 px-3.5 py-1.5 rounded-xl hover:bg-emerald-100 transition-colors"
          >
            Kelola Santri
          </button>
        </div>

        {totalSantri === 0 ? (
          <div className="p-10 text-center text-xs text-slate-600 space-y-3 bg-white">
            <Users className="w-12 h-12 text-slate-400 mx-auto" />
            <p className="font-extrabold text-slate-900 text-sm">Belum Ada Santri Dalam Sistem</p>
            <p className="text-slate-600 max-w-sm mx-auto font-medium">
              Klik "+ Tambah Santri Baru" untuk mendaftarkan santri pertama anda.
            </p>
            <button
              onClick={() => setActiveView('data-santri')}
              className="px-5 py-2.5 rounded-xl bg-emerald-700 text-white font-extrabold text-xs shadow-md hover:bg-emerald-800 transition-colors inline-flex items-center gap-2"
            >
              <UserPlus className="w-4 h-4" />
              <span>+ Tambah Santri Pertama</span>
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-900">
              <thead className="bg-slate-200 text-slate-950 font-black uppercase tracking-wider border-b-2 border-slate-300">
                <tr>
                  <th className="py-3.5 px-4">NIS</th>
                  <th className="py-3.5 px-4">Nama Lengkap</th>
                  <th className="py-3.5 px-4">Kamar</th>
                  <th className="py-3.5 px-4">Klaster</th>
                  <th className="py-3.5 px-4">N-Gain</th>
                  <th className="py-3.5 px-4">Mutqin</th>
                  <th className="py-3.5 px-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 font-medium">
                {santriList.map((s) => (
                  <tr key={s.id} className="hover:bg-slate-100/80 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-950">{s.nis}</td>
                    <td className="py-3.5 px-4 font-extrabold text-slate-950">{s.nama}</td>
                    <td className="py-3.5 px-4 text-slate-800 font-semibold">{s.kamar}</td>
                    <td className="py-3.5 px-4">
                      <span className="px-3 py-1 rounded-full bg-amber-200 text-amber-950 border border-amber-400 text-[11px] font-extrabold flex items-center gap-1.5 w-max">
                        <span className="w-2 h-2 rounded-full bg-amber-600"></span>
                        {s.klaster} ({s.statusText})
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-black text-teal-800 text-sm">{s.nGain}</td>
                    <td className="py-3.5 px-4 text-slate-800 font-semibold">{s.mutqinJuz}</td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => setActiveView('rapor-cetak')}
                        className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-emerald-100 text-slate-900 hover:text-emerald-900 font-bold text-xs border border-slate-300 transition-colors"
                      >
                        Buka Rapor
                      </button>
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
