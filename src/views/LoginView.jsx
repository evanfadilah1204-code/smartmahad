import React, { useState } from 'react';
import {
  Lock,
  User,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  X
} from 'lucide-react';

export default function LoginView({ onLoginSuccess, onClose }) {
  const [username, setUsername] = useState('admin.musyrif');
  const [password, setPassword] = useState('••••••••');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#070A10] flex items-center justify-center p-4 font-sans select-none animate-in fade-in duration-200">
      {/* Background Subtle Glow */}
      <div className="absolute w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Simulated Browser URL bar */}
      <div className="absolute top-4 left-4 right-4 max-w-xl mx-auto bg-slate-900/90 border border-slate-800 rounded-xl px-4 py-2 flex items-center justify-between text-xs text-slate-400 font-mono shadow-xl">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500/80"></span>
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></span>
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></span>
          <span className="ml-2 text-emerald-400 font-bold">https://smartmahad.com/login.html</span>
        </div>
        {onClose && (
          <button onClick={onClose} className="hover:text-white">
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Login Card Minimalis Dark */}
      <div className="w-full max-w-md bg-slate-900/90 backdrop-blur-2xl border border-slate-800 rounded-3xl p-8 shadow-2xl relative z-10 space-y-6">
        {/* Logo & Header */}
        <div className="text-center space-y-3">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white font-extrabold text-2xl mx-auto shadow-xl ring-4 ring-emerald-500/20">
            SM
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-white tracking-tight flex items-center justify-center gap-2">
              SmartMahad
              <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                5.0
              </span>
            </h1>
            <p className="text-xs text-slate-400 font-medium mt-1">
              Sistem Informasi & Manajemen Pesantren Insan Mandiri
            </p>
          </div>
        </div>

        {/* Form Login */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-300 mb-1.5">
              Nama Pengguna (Username)
            </label>
            <div className="relative">
              <User className="w-4 h-4 absolute left-3.5 top-3 text-slate-500" />
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Masukkan username..."
                className="w-full pl-10 pr-4 py-2.5 bg-slate-950/80 border border-slate-800 rounded-xl text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 focus:outline-none transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-300 mb-1.5">
              Kata Sandi (Password)
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3.5 top-3 text-slate-500" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan kata sandi..."
                className="w-full pl-10 pr-4 py-2.5 bg-slate-950/80 border border-slate-800 rounded-xl text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 focus:outline-none transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-lg shadow-emerald-950/50 transition-all flex items-center justify-center gap-2 group mt-2"
          >
            {isLoading ? (
              <span>Memverifikasi Akses...</span>
            ) : (
              <>
                <span>Masuk ke System</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        <div className="pt-2 text-center text-[11px] text-slate-500 border-t border-slate-800/80 flex items-center justify-center gap-2">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
          <span>Sistem Informasi & Manajemen Pesantren v5.0 Insan Mandiri</span>
        </div>
      </div>
    </div>
  );
}
