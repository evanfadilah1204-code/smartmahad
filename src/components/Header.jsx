import React, { useState, useEffect } from 'react';
import {
  Tv,
  Plus,
  Calendar,
  Clock,
  Database
} from 'lucide-react';

export default function Header({ activeView, setActiveView, santriCount, onLoadSampleData, onClearData }) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const getTitle = () => {
    switch (activeView) {
      case 'dashboard': return 'Dashboard Utama';
      case 'manajemen-modul': return 'Manajemen Parameter Karakter';
      case 'data-santri': return 'Data Santri Pesantren';
      case 'input-penilaian': return 'Input Penilaian Santri';
      case 'pbq': return 'Project Based Qur\'an (PBQ)';
      case 'grafik-analisis': return 'Grafik & Analisis';
      case 'tracking-hafalan': return 'Tracking Hafalan Ayat';
      case 'presensi-ibadah': return 'Presensi Ibadah & 5R';
      case 'capaian-quran': return 'Capaian Al-Qur\'an';
      case 'prestasi-kasus': return 'Prestasi & Pelanggaran';
      case 'audit-trail': return 'Catatan Audit Sistem';
      case 'ekspor-data': return 'Ekspor Laporan (CSV)';
      case 'rapor-cetak': return 'Rapor Cetak Santri (A4)';
      case 'display-tv': return 'Display Layar TV Lobi';
      default: return 'SmartMahad Insan Mandiri';
    }
  };

  const formattedDate = time.toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const formattedTime = time.toLocaleTimeString('id-ID', {
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <header className="h-16 bg-white border-b-2 border-slate-300 sticky top-0 z-20 px-6 flex items-center justify-between shadow-xs">
      {/* Title */}
      <div className="flex items-center gap-3">
        <div>
          <h2 className="text-base font-extrabold text-slate-950 tracking-tight">
            {getTitle()}
          </h2>
          <p className="text-xs text-slate-600 font-semibold hidden sm:block">
            Sistem Informasi & Manajemen Pesantren Insan Mandiri 5.0
          </p>
        </div>

        {santriCount === 0 ? (
          <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold border border-amber-300 hidden md:inline-flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-600 animate-pulse"></span>
            Belum ada data santri
          </span>
        ) : (
          <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold border border-emerald-300 hidden md:inline-flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
            {santriCount} Santri Terdaftar
          </span>
        )}
      </div>

      {/* Controls */}
      <div className="flex items-center gap-2.5">
        {/* Real-time Clock Badge */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-300 text-xs text-slate-800 font-semibold">
          <Calendar className="w-3.5 h-3.5 text-slate-600" />
          <span>{formattedDate}</span>
          <span className="text-slate-400">|</span>
          <Clock className="w-3.5 h-3.5 text-emerald-700" />
          <span className="font-mono font-bold text-slate-950">{formattedTime}</span>
        </div>

        {/* Demo Toggle Buttons */}
        {santriCount === 0 ? (
          <button
            onClick={onLoadSampleData}
            className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-900 text-xs font-bold border border-slate-300 transition-colors flex items-center gap-1.5 shadow-xs"
            title="Muat 10 data santri contoh"
          >
            <Database className="w-3.5 h-3.5 text-emerald-700" />
            <span className="hidden sm:inline">Isi Data Sampel</span>
          </button>
        ) : (
          <button
            onClick={onClearData}
            className="px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-red-100 text-slate-800 hover:text-red-700 text-xs font-bold border border-slate-300 transition-colors"
            title="Kosongkan Data"
          >
            Reset Kosong
          </button>
        )}

        {/* TV Signage Mode */}
        <button
          onClick={() => setActiveView('display-tv')}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-white text-xs font-bold border border-slate-800 transition-colors shadow-xs"
        >
          <Tv className="w-3.5 h-3.5 text-emerald-400" />
          <span className="hidden sm:inline">Layar TV</span>
        </button>

        {/* + Tambah Santri */}
        <button
          onClick={() => setActiveView('data-santri')}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-xs transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">+ Tambah Santri</span>
        </button>
      </div>
    </header>
  );
}
