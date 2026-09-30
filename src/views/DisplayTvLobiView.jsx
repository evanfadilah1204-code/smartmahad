import React, { useState, useEffect } from 'react';
import {
  Clock,
  Calendar,
  Users,
  Heart,
  CheckCircle2,
  Tv,
  X,
  BookOpen
} from 'lucide-react';

export default function DisplayTvLobiView({ santriList, onClose }) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedTime = time.toLocaleTimeString('id-ID', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });

  const formattedDate = time.toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const totalSantri = santriList.length;
  const puasaCount = santriList.length > 0 ? 5 : 0;

  return (
    <div className="fixed inset-0 z-50 bg-[#070A12] text-white flex flex-col justify-between p-8 font-sans overflow-hidden select-none animate-in fade-in duration-300">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between border-b-2 border-slate-800 pb-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-emerald-600 flex items-center justify-center font-black text-2xl shadow-xl ring-4 ring-emerald-500/30 text-white">
            SM
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-tight text-white flex items-center gap-3">
              SmartMahad - Insan Mandiri 5.0
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-xs font-bold uppercase tracking-wider">
                Display Layar TV Lobi
              </span>
            </h1>
            <p className="text-sm text-slate-300 font-semibold">
              Sistem Informasi & Manajemen Pesantren Terpadu
            </p>
          </div>
        </div>

        {/* Realtime Big Clock & Exit Button */}
        <div className="flex items-center gap-6">
          <div className="text-right">
            <div className="text-4xl font-mono font-black text-emerald-400 tracking-tight">
              {formattedTime}
            </div>
            <div className="text-xs text-slate-300 font-bold mt-0.5">
              {formattedDate}
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white transition-colors border-2 border-slate-700 shadow-md"
            title="Keluar Tampilan TV"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Main Body: 3 Big Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-auto">
        {/* Card 1: Santri Puasa Sunnah Hari Ini */}
        <div className="relative overflow-hidden rounded-3xl bg-slate-900/90 p-8 border-2 border-emerald-500/40 shadow-2xl space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-wider text-emerald-400">Habituasi Ibadah</span>
            <div className="p-3 rounded-2xl bg-emerald-600/30 text-emerald-400 border border-emerald-500/40">
              <Heart className="w-8 h-8" />
            </div>
          </div>
          <div>
            <h3 className="text-slate-200 font-bold text-sm">Santri Puasa Sunnah Hari Ini</h3>
            <div className="text-5xl font-black text-white mt-2 flex items-baseline gap-3">
              <span>{puasaCount}</span>
              <span className="text-2xl text-slate-400 font-bold">/ {totalSantri} Santri</span>
            </div>
          </div>
          <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-xs text-emerald-300 font-extrabold">
            ✨ Sunnah Senin - Kamis Berjalan
          </div>
        </div>

        {/* Card 2: Total Santri Aktif */}
        <div className="relative overflow-hidden rounded-3xl bg-slate-900/90 p-8 border-2 border-teal-500/40 shadow-2xl space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-wider text-teal-400">Status Mahad</span>
            <div className="p-3 rounded-2xl bg-teal-600/30 text-teal-400 border border-teal-500/40">
              <Users className="w-8 h-8" />
            </div>
          </div>
          <div>
            <h3 className="text-slate-200 font-bold text-sm">Total Santri Aktif</h3>
            <div className="text-5xl font-black text-white mt-2 flex items-baseline gap-3">
              <span>{totalSantri}</span>
              <span className="text-xl text-teal-400 font-extrabold font-mono">Klaster Kuning</span>
            </div>
          </div>
          <div className="p-3 rounded-xl bg-teal-950/80 border border-teal-500/40 text-xs text-teal-300 font-extrabold">
            🛡️ 0 Santri Butuh Intervensi
          </div>
        </div>

        {/* Card 3: Program Shalat & PBQ Berjalan (100%) */}
        <div className="relative overflow-hidden rounded-3xl bg-slate-900/90 p-8 border-2 border-indigo-500/40 shadow-2xl space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-wider text-indigo-400">Kurikulum Qur'an</span>
            <div className="p-3 rounded-2xl bg-indigo-600/30 text-indigo-400 border border-indigo-500/40">
              <CheckCircle2 className="w-8 h-8" />
            </div>
          </div>
          <div>
            <h3 className="text-slate-200 font-bold text-sm">Program Shalat & PBQ Berjalan</h3>
            <div className="text-5xl font-black text-white mt-2 flex items-baseline gap-2">
              <span>100%</span>
              <span className="text-lg text-emerald-400 font-extrabold">Tuntas</span>
            </div>
          </div>
          <div className="p-3 rounded-xl bg-indigo-950/80 border border-indigo-500/40 text-xs text-indigo-300 font-extrabold">
            📖 Program PBQ Berjalan Efektif
          </div>
        </div>
      </div>

      {/* Running Text / Hadits Banner Berjalan Smooth */}
      <div className="border-2 border-slate-800 bg-slate-950 rounded-2xl p-4 overflow-hidden shadow-2xl">
        <div className="flex items-center gap-4">
          <div className="px-3.5 py-1.5 rounded-xl bg-emerald-600 text-white text-xs font-black whitespace-nowrap shadow-md flex items-center gap-2 border border-emerald-400">
            <BookOpen className="w-4 h-4" />
            <span>HADITS HARI INI</span>
          </div>
          <div className="overflow-hidden relative w-full py-0.5">
            <div className="animate-running-text text-lg font-bold text-emerald-300 font-serif tracking-wide">
              "خَيْرُكُمْ مَنْ تَعَلَّمَ الْقُرْآنَ وَعَلَّمَهُ" — Sebaik-baik kalian adalah orang yang mempelajari Al-Qur'an dan mengajarkannya (HR. Bukhari) &nbsp;&nbsp;•&nbsp;&nbsp; Pesantren Insan Mandiri — Mahad 5.0 Modern Islamic Boarding School.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
