import React from 'react';
import {
  LayoutDashboard,
  Boxes,
  Users,
  ClipboardEdit,
  BookOpenCheck,
  BarChart3,
  CheckSquare,
  CalendarCheck,
  ShieldAlert,
  History,
  Download,
  Printer,
  Tv,
  LogIn,
  ChevronRight,
  BookMarked
} from 'lucide-react';

export default function Sidebar({ activeView, setActiveView, onOpenLogin }) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard Utama', icon: LayoutDashboard, category: 'UTAMA' },
    { id: 'manajemen-modul', label: 'Manajemen Modul', icon: Boxes, category: 'KONFIGURASI' },
    { id: 'data-santri', label: 'Data Santri', icon: Users, category: 'MANAJEMEN' },
    { id: 'input-penilaian', label: 'Input Penilaian Skor', icon: ClipboardEdit, category: 'PENILAIAN' },
    { id: 'pbq', label: 'Project Based Qur\'an', icon: BookOpenCheck, category: 'KURIKULUM' },
    { id: 'grafik-analisis', label: 'Grafik & Analisis', icon: BarChart3, category: 'ANALISIS' },
    { id: 'tracking-hafalan', label: 'Tracking Hafalan', icon: CheckSquare, category: 'AL-QUR\'AN' },
    { id: 'presensi-ibadah', label: 'Presensi Ibadah & 5R', icon: CalendarCheck, category: 'HABITUASI' },
    { id: 'capaian-quran', label: 'Capaian 3 Pilar Qur\'an', icon: BookMarked, category: 'AL-QUR\'AN' },
    { id: 'prestasi-kasus', label: 'Prestasi & Pelanggaran', icon: ShieldAlert, category: 'KEDISIPLINAN' },
    { id: 'audit-trail', label: 'Audit Log System', icon: History, category: 'SISTEM' },
    { id: 'ekspor-data', label: 'Ekspor Data CSV', icon: Download, category: 'LAPORAN' },
    { id: 'rapor-cetak', label: 'Rapor Cetak A4', icon: Printer, category: 'LAPORAN' },
    { id: 'display-tv', label: 'Display TV Lobi', icon: Tv, category: 'TAMPILAN' },
  ];

  return (
    <aside className="w-64 bg-[#090D16] text-white flex flex-col h-screen sticky top-0 border-r border-slate-800 z-30 select-none shadow-2xl">
      {/* Brand Header */}
      <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/80">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center text-white font-black text-base shadow-lg ring-2 ring-emerald-500/30">
            SM
          </div>
          <div>
            <h1 className="font-extrabold text-white text-sm tracking-tight leading-tight">
              SmartMahad
            </h1>
            <p className="text-[11px] text-slate-300 font-semibold">Insan Mandiri Pesantren</p>
          </div>
        </div>
      </div>

      {/* Navigation List */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-5">
        {['UTAMA', 'MANAJEMEN', 'PENILAIAN', 'HABITUASI', 'AL-QUR\'AN', 'KEDISIPLINAN', 'LAPORAN', 'TAMPILAN'].map((cat) => {
          const items = menuItems.filter(i => i.category === cat);
          if (items.length === 0) return null;
          return (
            <div key={cat} className="space-y-1">
              <div className="px-3 text-[10px] font-extrabold tracking-wider text-slate-400 uppercase">
                {cat}
              </div>
              {items.map((item) => {
                const Icon = item.icon;
                const isActive = activeView === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveView(item.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-150 group ${
                      isActive
                        ? 'bg-emerald-600 text-white shadow-md font-bold ring-1 ring-emerald-400/40'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className={`w-4 h-4 transition-colors ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'}`} />
                      <span>{item.label}</span>
                    </div>
                    {isActive && (
                      <div className="w-2 h-2 rounded-full bg-white shadow-xs" />
                    )}
                  </button>
                );
              })}
            </div>
          );
        })}
      </div>

      {/* Footer Profile */}
      <div className="p-3 border-t border-slate-800 bg-slate-950 space-y-2">
        <button
          onClick={onOpenLogin}
          className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-semibold border border-slate-700/80 transition-colors"
        >
          <div className="flex items-center gap-2">
            <LogIn className="w-3.5 h-3.5 text-emerald-400" />
            <span className="font-mono text-[11px]">login.html</span>
          </div>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        </button>

        <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-slate-900 border border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-emerald-600 border border-emerald-400 flex items-center justify-center font-bold text-[11px] text-white">
              MU
            </div>
            <div className="text-left">
              <p className="text-xs font-bold text-white">Musyrif Utama</p>
              <p className="text-[10px] text-slate-400 font-medium">Admin Pesantren</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
