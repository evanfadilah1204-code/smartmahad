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
  BookOpen,
  ArrowUpRight,
  Sparkles
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
      {/* Hadits Hari Ini Running Text Banner */}
      <div className="bg-[#080C14] text-white rounded-2xl p-3 border border-slate-800 shadow-md overflow-hidden relative">
        <div className="flex items-center gap-3">
          <div className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xs font-extrabold whitespace-nowrap shadow-xs flex items-center gap-2 border border-emerald-400/30">
            <BookOpen className="w-3.5 h-3.5 text-emerald-100" />
            <span>HADITS HARI INI</span>
          </div>
          <div className="overflow-hidden relative w-full py-0.5">
            <div className="animate-running-text text-sm font-semibold text-emerald-300 font-serif tracking-wide">
              "خَيْرُكُمْ مَنْ تَعَلَّمَ الْقُرْآنَ وَعَلَّمَهُ" — Sebaik-baik kalian adalah orang yang mempelajari Al-Qur'an dan mengajarkannya (HR. Bukhari) &nbsp;&nbsp;•&nbsp;&nbsp; Pesantren Insan Mandiri — Mahad Modern Islamic Boarding School.
            </div>
          </div>
        </div>
      </div>

      {/* Hero Welcome Card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-950 via-slate-900 to-emerald-950/80 p-8 text-white shadow-xl border border-slate-800/80">
        <div className="absolute right-0 top-0 w-[450px] h-[450px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>SmartMahad Dashboard System</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
              Sistem Informasi & Manajemen Pesantren Insan Mandiri
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-medium">
              Platform terpadu monitoring ibadah harian santri, evaluasi habituasi 5 pilar karakter (Singa, Elang, Sapi, Ayam, Bunglon), serta analisis N-Gain.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setActiveView('data-santri')}
              className="px-5 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-xs transition-all shadow-lg shadow-emerald-950/50 flex items-center gap-2 group"
            >
              <UserPlus className="w-4 h-4" />
              <span>+ Tambah Santri Baru</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
            {totalSantri === 0 && (
              <button
                onClick={onLoadSampleData}
                className="px-4 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-slate-200 font-bold text-xs transition-colors border border-slate-700 flex items-center gap-2 shadow-sm"
              >
                <Database className="w-4 h-4 text-emerald-400" />
                <span>Isi Data Sampel</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Header Metrik Utama (6 Cards) */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {/* Total Santri */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Total Santri</span>
            <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600 border border-blue-100">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-extrabold text-slate-900">{totalSantri}</div>
            <p className="text-[11px] text-slate-500 font-medium mt-0.5">Santri Terdaftar</p>
          </div>
        </div>

        {/* Modul Aktif */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Modul Aktif</span>
            <div className="p-2.5 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100">
              <Boxes className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-extrabold text-slate-900">{modulAktif}</div>
            <p className="text-[11px] text-slate-500 font-medium mt-0.5">Ring Time & Shalat</p>
          </div>
        </div>

        {/* Rata-rata N-Gain */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Rata-rata N-Gain</span>
            <div className="p-2.5 rounded-xl bg-teal-50 text-teal-600 border border-teal-100">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-extrabold text-slate-900">{avgNGain}</div>
            <p className="text-[11px] text-teal-700 font-semibold mt-0.5">Indeks Peningkatan</p>
          </div>
        </div>

        {/* Klaster Merah */}
        <div className="bg-white p-4 rounded-2xl border border-rose-200 bg-rose-50/20 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-rose-700 uppercase tracking-wider">Klaster Merah</span>
            <div className="p-2.5 rounded-xl bg-rose-100 text-rose-600 border border-rose-200">
              <AlertCircle className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-extrabold text-rose-800">{klasterMerah}</div>
            <p className="text-[11px] text-rose-700 font-medium mt-0.5">Butuh Intervensi</p>
          </div>
        </div>

        {/* Klaster Kuning */}
        <div className="bg-white p-4 rounded-2xl border border-amber-200 bg-amber-50/20 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider">Klaster Kuning</span>
            <div className="p-2.5 rounded-xl bg-amber-100 text-amber-700 border border-amber-200">
              <Activity className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-extrabold text-amber-800">{klasterKuning}</div>
            <p className="text-[11px] text-amber-700 font-medium mt-0.5">Pasif / Cukup</p>
          </div>
        </div>

        {/* Klaster Hijau */}
        <div className="bg-white p-4 rounded-2xl border border-emerald-200 bg-emerald-50/20 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider">Klaster Hijau</span>
            <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-700 border border-emerald-200">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-extrabold text-emerald-800">{klasterHijau}</div>
            <p className="text-[11px] text-emerald-700 font-medium mt-0.5">Mandiri / Siap</p>
          </div>
        </div>
      </div>

      {/* Empty State Banner or Active Alert */}
      {totalSantri === 0 ? (
        <div className="p-6 rounded-2xl bg-amber-50/90 border border-amber-200 text-amber-900 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-amber-500 text-white flex items-center justify-center font-black text-lg shadow-sm">
              !
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-amber-950">Belum Ada Data Santri Terdaftar</h3>
              <p className="text-xs text-amber-800 font-medium mt-0.5">
                Sistem siap digunakan. Tambahkan santri baru secara manual atau klik tombol muat data sampel untuk menguji fitur.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 whitespace-nowrap">
            <button
              onClick={() => setActiveView('data-santri')}
              className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors shadow-xs"
            >
              + Tambah Santri
            </button>
            <button
              onClick={onLoadSampleData}
              className="px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs transition-colors shadow-xs"
            >
              Muat Data Sampel
            </button>
          </div>
        </div>
      ) : (
        <div className="p-4.5 rounded-2xl bg-emerald-50/90 border border-emerald-200 text-emerald-950 flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-bold shadow-sm">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-emerald-950">Status Peringatan Visual Intervensi Santri</h3>
              <p className="text-xs text-emerald-800 font-medium">
                "Alhamdulillah, tidak ada santri di klaster merah saat ini." Total {totalSantri} santri aktif dalam sistem.
              </p>
            </div>
          </div>
          <button
            onClick={() => setActiveView('data-santri')}
            className="px-4 py-2 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 text-xs font-bold transition-colors hidden sm:block shadow-xs"
          >
            Kelola Santri
          </button>
        </div>
      )}

      {/* Visual Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Radar Profile Karakter */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Profil 5 Pilar Karakter</h3>
              <p className="text-xs text-slate-500 font-medium">Skor Indikator Karakter Santri (Skala 0 - 4)</p>
            </div>
            <span className="text-xs px-3 py-1 bg-slate-100 rounded-full font-semibold text-slate-700 border border-slate-200">Model Ring Time</span>
          </div>

          {totalSantri === 0 ? (
            <div className="h-64 flex flex-col items-center justify-center text-slate-400 text-xs space-y-2 border border-dashed border-slate-200 rounded-2xl bg-slate-50/50">
              <Boxes className="w-8 h-8 text-slate-300" />
              <p className="font-medium">Grafik radar akan tampil setelah data skor santri diisi.</p>
            </div>
          ) : (
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarData}>
                  <PolarGrid stroke="#e2e8f0" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#334155', fontSize: 11, fontWeight: 600 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 4]} />
                  <Radar name="Rata-rata Skor" dataKey="A" stroke="#059669" fill="#10b981" fillOpacity={0.4} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>

        {/* N-Gain Per Santri Chart */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Distribusi N-Gain Santri</h3>
              <p className="text-xs text-slate-500 font-medium">Indeks Peningkatan Pembelajaran</p>
            </div>
            <button
              onClick={() => setActiveView('grafik-analisis')}
              className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
            >
              Detail Grafik &rarr;
            </button>
          </div>

          {totalSantri === 0 ? (
            <div className="h-64 flex flex-col items-center justify-center text-slate-400 text-xs space-y-2 border border-dashed border-slate-200 rounded-2xl bg-slate-50/50">
              <TrendingUp className="w-8 h-8 text-slate-300" />
              <p className="font-medium">Grafik N-Gain akan tampil setelah data santri diisi.</p>
            </div>
          ) : (
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="nama" tick={{ fill: '#475569', fontSize: 10, fontWeight: 600 }} />
                  <YAxis domain={[0, 1]} tick={{ fill: '#475569', fontSize: 10, fontWeight: 600 }} />
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
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-slate-900 text-sm">Daftar Santri Terdaftar</h3>
            <p className="text-xs text-slate-500 font-medium">Status Klaster & Capaian Santri</p>
          </div>
          <button
            onClick={() => setActiveView('data-santri')}
            className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 border border-emerald-200 px-3 py-1.5 rounded-lg hover:bg-emerald-50 transition-colors"
          >
            Kelola Santri
          </button>
        </div>

        {totalSantri === 0 ? (
          <div className="p-10 text-center text-xs text-slate-500 space-y-3 bg-white">
            <Users className="w-10 h-10 text-slate-300 mx-auto" />
            <p className="font-bold text-slate-800 text-sm">Belum Ada Santri Dalam Sistem</p>
            <p className="text-slate-500 max-w-sm mx-auto font-medium">
              Klik "+ Tambah Santri Baru" untuk mendaftarkan santri pertama anda.
            </p>
            <button
              onClick={() => setActiveView('data-santri')}
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition-colors inline-flex items-center gap-2"
            >
              <UserPlus className="w-4 h-4" />
              <span>+ Tambah Santri Pertama</span>
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 text-slate-500 font-semibold uppercase tracking-wider border-b border-slate-200">
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
              <tbody className="divide-y divide-slate-100 font-medium">
                {santriList.map((s) => (
                  <tr key={s.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-medium text-slate-800">{s.nis}</td>
                    <td className="py-3.5 px-4 font-bold text-slate-900">{s.nama}</td>
                    <td className="py-3.5 px-4 text-slate-600">{s.kamar}</td>
                    <td className="py-3.5 px-4">
                      <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 border border-amber-200 text-[11px] font-semibold flex items-center gap-1 w-max">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                        {s.klaster} ({s.statusText})
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-bold text-teal-700">{s.nGain}</td>
                    <td className="py-3.5 px-4 text-slate-600">{s.mutqinJuz}</td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => setActiveView('rapor-cetak')}
                        className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 text-[11px] font-semibold transition-colors"
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
