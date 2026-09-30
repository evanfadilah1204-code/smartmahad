import React, { useState } from 'react';
import {
  Award,
  ShieldAlert,
  Plus,
  Trash2,
  CheckCircle2,
  AlertTriangle,
  Sparkles
} from 'lucide-react';

export default function PrestasiKasusView({
  santriList,
  prestasiList,
  setPrestasiList,
  kasusList,
  setKasusList
}) {
  // Prestasi Form state
  const [pNama, setPNama] = useState(santriList[0]?.nama || '');
  const [pLomba, setPLomba] = useState('');
  const [pPeringkat, setPPeringkat] = useState('Juara 1');
  const [pApresiasi, setPApresiasi] = useState('');

  // Kasus Form state
  const [kNama, setKNama] = useState(santriList[0]?.nama || '');
  const [kWaktu, setKWaktu] = useState('2026-09-30 07:30');
  const [kTempat, setKTempat] = useState('Asrama 6');
  const [kKet, setKKet] = useState('');
  const [kTindakan, setKTindakan] = useState('');
  const [kBobot, setKBobot] = useState(5);

  const handleAddPrestasi = (e) => {
    e.preventDefault();
    setPrestasiList([
      {
        id: Math.max(...prestasiList.map(p => p.id), 0) + 1,
        santriNama: pNama,
        lomba: pLomba,
        peringkat: pPeringkat,
        apresiasi: pApresiasi || 'Sertifikat & Piagam',
        tanggal: new Date().toISOString().split('T')[0]
      },
      ...prestasiList
    ]);
    setPLomba('');
    setPApresiasi('');
    alert("✅ Data Prestasi Santri Berhasil Diabadikan!");
  };

  const handleAddKasus = (e) => {
    e.preventDefault();
    setKasusList([
      {
        id: Math.max(...kasusList.map(k => k.id), 0) + 1,
        santriNama: kNama,
        waktu: kWaktu,
        tempat: kTempat,
        keterangan: kKet,
        tindakan: kTindakan,
        bobotPoin: Number(kBobot),
        status: 'Dalam Pembinaan'
      },
      ...kasusList
    ]);
    setKKet('');
    setKTindakan('');
    alert("⚠️ Catatan Pembinaan Kasus Santri Berhasil Disimpan!");
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-emerald-700 font-bold">
            <Award className="w-5 h-5" />
            <h2 className="text-lg text-slate-800">Pencatatan Prestasi & Pelanggaran Kedisiplinan</h2>
          </div>
          <p className="text-xs text-slate-500">
            Modul ganda untuk mengapresiasi pencapaian santri sekaligus membina penanganan kasus pelanggaran.
          </p>
        </div>
      </div>

      {/* Split View Grid: Left Prestasi | Right Kasus */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* SISI KIRI: PRESTASI SANTRI */}
        <div className="space-y-6">
          <div className="bg-white p-5 rounded-2xl border border-emerald-200 shadow-sm space-y-4">
            <h3 className="font-bold text-emerald-800 text-xs uppercase tracking-wider flex items-center gap-2 border-b border-emerald-100 pb-2">
              <Award className="w-4 h-4 text-emerald-600" />
              <span>Form Pencatatan Prestasi Santri</span>
            </h3>

            <form onSubmit={handleAddPrestasi} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Pilih Santri</label>
                <select
                  value={pNama}
                  onChange={(e) => setPNama(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl font-bold text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                >
                  {santriList.map(s => (
                    <option key={s.id} value={s.nama}>{s.nama} ({s.nis})</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Nama Lomba / Event</label>
                  <input
                    type="text"
                    required
                    value={pLomba}
                    onChange={(e) => setPLomba(e.target.value)}
                    placeholder="Contoh: MHQ 5 Juz..."
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Peringkat / Juara</label>
                  <input
                    type="text"
                    required
                    value={pPeringkat}
                    onChange={(e) => setPPeringkat(e.target.value)}
                    placeholder="Contoh: Juara 1"
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Apresiasi / Penghargaan</label>
                <input
                  type="text"
                  value={pApresiasi}
                  onChange={(e) => setPApresiasi(e.target.value)}
                  placeholder="Contoh: Beasiswa Pendidikan & Medali"
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div className="flex justify-end pt-1">
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>Tambah Prestasi</span>
                </button>
              </div>
            </form>
          </div>

          {/* Tabel Prestasi */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
            <div className="p-3 bg-emerald-50/80 border-b border-emerald-200 flex items-center justify-between">
              <h4 className="font-bold text-emerald-900 text-xs uppercase tracking-wider">
                Tabel Riwayat Prestasi Santri
              </h4>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-600">
                <thead className="bg-slate-50 text-slate-700 font-bold uppercase">
                  <tr>
                    <th className="py-2.5 px-3">Santri</th>
                    <th className="py-2.5 px-3">Lomba & Peringkat</th>
                    <th className="py-2.5 px-3">Apresiasi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {prestasiList.map(p => (
                    <tr key={p.id} className="hover:bg-slate-50">
                      <td className="py-3 px-3 font-bold text-slate-800">{p.santriNama}</td>
                      <td className="py-3 px-3">
                        <p className="font-semibold text-slate-900">{p.lomba}</p>
                        <span className="inline-block mt-0.5 text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                          {p.peringkat}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-slate-600">{p.apresiasi}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* SISI KANAN: KASUS & PELANGGARAN SANTRI */}
        <div className="space-y-6">
          <div className="bg-white p-5 rounded-2xl border border-rose-200 shadow-sm space-y-4">
            <h3 className="font-bold text-rose-800 text-xs uppercase tracking-wider flex items-center gap-2 border-b border-rose-100 pb-2">
              <ShieldAlert className="w-4 h-4 text-rose-600" />
              <span>Form Pencatatan Kasus & Pelanggaran Santri</span>
            </h3>

            <form onSubmit={handleAddKasus} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Pilih Santri</label>
                  <select
                    value={kNama}
                    onChange={(e) => setKNama(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl font-bold text-slate-800 focus:ring-2 focus:ring-rose-500 focus:outline-none"
                  >
                    {santriList.map(s => (
                      <option key={s.id} value={s.nama}>{s.nama} ({s.nis})</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Waktu Kejadian</label>
                  <input
                    type="text"
                    value={kWaktu}
                    onChange={(e) => setKWaktu(e.target.value)}
                    className="w-full px-3 py-2 font-mono border border-slate-300 rounded-xl focus:ring-2 focus:ring-rose-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Lokasi / Tempat</label>
                  <input
                    type="text"
                    required
                    value={kTempat}
                    onChange={(e) => setKTempat(e.target.value)}
                    placeholder="Contoh: Asrama 6"
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-rose-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Bobot Poin Pelanggaran</label>
                  <input
                    type="number"
                    min="1"
                    max="50"
                    value={kBobot}
                    onChange={(e) => setKBobot(e.target.value)}
                    className="w-full px-3 py-2 font-bold font-mono border border-slate-300 rounded-xl focus:ring-2 focus:ring-rose-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Keterangan Pelanggaran</label>
                <input
                  type="text"
                  required
                  value={kKet}
                  onChange={(e) => setKKet(e.target.value)}
                  placeholder="Keterangan rincian kejadian..."
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-rose-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Tindakan Pembinaan Musyrif</label>
                <input
                  type="text"
                  required
                  value={kTindakan}
                  onChange={(e) => setKTindakan(e.target.value)}
                  placeholder="Bentuk tindakan edukatif & pembinaan..."
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-rose-500 focus:outline-none"
                />
              </div>

              <div className="flex justify-end pt-1">
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>Catat Pelanggaran</span>
                </button>
              </div>
            </form>
          </div>

          {/* Tabel Kasus */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
            <div className="p-3 bg-rose-50/80 border-b border-rose-200 flex items-center justify-between">
              <h4 className="font-bold text-rose-900 text-xs uppercase tracking-wider">
                Tabel Riwayat Penanganan Kasus
              </h4>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-600">
                <thead className="bg-slate-50 text-slate-700 font-bold uppercase">
                  <tr>
                    <th className="py-2.5 px-3">Santri & Waktu</th>
                    <th className="py-2.5 px-3">Pelanggaran & Pembinaan</th>
                    <th className="py-2.5 px-3 text-center">Poin</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {kasusList.map(k => (
                    <tr key={k.id} className="hover:bg-slate-50">
                      <td className="py-3 px-3">
                        <p className="font-bold text-slate-900">{k.santriNama}</p>
                        <p className="text-[10px] text-slate-400 font-mono">{k.waktu}</p>
                      </td>
                      <td className="py-3 px-3">
                        <p className="text-slate-800 font-medium">{k.keterangan}</p>
                        <p className="text-[11px] text-rose-700 italic">Solusi: {k.tindakan}</p>
                      </td>
                      <td className="py-3 px-3 text-center font-extrabold text-rose-600 font-mono">
                        +{k.bobotPoin}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
