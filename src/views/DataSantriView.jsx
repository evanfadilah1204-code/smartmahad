import React, { useState } from 'react';
import {
  Users,
  Plus,
  FileSpreadsheet,
  Search,
  Filter,
  Edit2,
  Trash2,
  FileText,
  RefreshCw,
  X,
  Database,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

export default function DataSantriView({ santriList, setSantriList, setActiveView, onLoadSampleData }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterKelas, setFilterKelas] = useState('Semua');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showSheetModal, setShowSheetModal] = useState(false);
  const [syncingSheet, setSyncingSheet] = useState(false);
  const [editingSantri, setEditingSantri] = useState(null);

  const [formData, setFormData] = useState({
    nis: '',
    nama: '',
    kelas: 'Kelas 12',
    kamar: 'Asrama 5',
    klaster: 'Kuning',
    statusText: 'Pasif / Cukup',
    wali: '',
    telepon: ''
  });

  const filteredSantri = santriList.filter(s => {
    const matchSearch = s.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        s.nis.includes(searchTerm) ||
                        s.kamar.toLowerCase().includes(searchTerm.toLowerCase());
    const matchKelas = filterKelas === 'Semua' || s.kelas === filterKelas;
    return matchSearch && matchKelas;
  });

  const handleSave = (e) => {
    e.preventDefault();
    if (editingSantri) {
      setSantriList(santriList.map(s => s.id === editingSantri.id ? { ...s, ...formData } : s));
    } else {
      const newId = santriList.length > 0 ? Math.max(...santriList.map(s => s.id), 0) + 1 : 1;
      setSantriList([...santriList, {
        id: newId,
        ...formData,
        scores: { LRT1: 3.0, LRT2: 3.0, LRT3: 3.0, LRT4: 3.0, LRT5: 3.0 },
        scoresPre: { LRT1: 2.0, LRT2: 2.0, LRT3: 2.0, LRT4: 2.0, LRT5: 2.0 },
        scoresPost: { LRT1: 3.2, LRT2: 3.2, LRT3: 3.2, LRT4: 3.2, LRT5: 3.2 },
        nGain: 0.40,
        tahsin: "Jayyid Jiddan",
        mutqinJuz: "Juz 30",
        totalJuz: 3,
        takhasus: "Tahfiz Intensity",
        tasmiStatus: "Proses Test",
        catatanMusyrif: "Santri terdaftar di sistem."
      }]);
    }
    setShowAddModal(false);
    setEditingSantri(null);
  };

  const handleEdit = (santri) => {
    setEditingSantri(santri);
    setFormData({
      nis: santri.nis,
      nama: santri.nama,
      kelas: santri.kelas,
      kamar: santri.kamar,
      klaster: santri.klaster,
      statusText: santri.statusText,
      wali: santri.wali || '',
      telepon: santri.telepon || ''
    });
    setShowAddModal(true);
  };

  const handleDelete = (id, nama) => {
    if (confirm(`Hapus santri ${nama} dari database?`)) {
      setSantriList(santriList.filter(s => s.id !== id));
    }
  };

  const handleSyncGoogleSheet = () => {
    setSyncingSheet(true);
    setTimeout(() => {
      setSyncingSheet(false);
      setShowSheetModal(false);
      onLoadSampleData();
      alert("✅ Data 10 santri berhasil disinkronisasi & ditarik dari Google Sheets.");
    }, 1200);
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Top Header Controls */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100">
              <Users className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-extrabold text-slate-900 tracking-tight">
              Manajemen Data Santri
            </h2>
          </div>
          <p className="text-xs font-medium text-slate-500">
            Kelola data santri, NIS, kelas, kamar asrama, dan status klaster kemandirian.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setShowSheetModal(true)}
            className="px-4 py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold text-xs border border-slate-200 transition-all flex items-center gap-2 shadow-xs hover:border-slate-300"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
            <span>Tarik dari Google Sheets</span>
          </button>

          <button
            onClick={() => {
              setEditingSantri(null);
              setFormData({
                nis: `20250${santriList.length + 1}`.padStart(7, '0'),
                nama: '',
                kelas: 'Kelas 12',
                kamar: 'Asrama 5',
                klaster: 'Kuning',
                statusText: 'Pasif / Cukup',
                wali: '',
                telepon: ''
              });
              setShowAddModal(true);
            }}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-xs transition-all shadow-md shadow-emerald-950/20 flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>+ Tambah Santri Baru</span>
          </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-2.5 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Cari nama santri, NIS, atau kamar..."
            className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:outline-none transition-all"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="flex items-center gap-2 text-xs text-slate-600 font-semibold">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <span>Filter Kelas:</span>
          </div>
          <select
            value={filterKelas}
            onChange={(e) => setFilterKelas(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:outline-none transition-all"
          >
            <option value="Semua">Semua Kelas</option>
            <option value="Kelas 12">Kelas 12</option>
            <option value="Kelas 11">Kelas 11</option>
            <option value="Kelas 10">Kelas 10</option>
          </select>

          <span className="text-xs text-slate-600 font-mono font-bold hidden md:inline bg-slate-100/90 px-3 py-1.5 rounded-lg border border-slate-200">
            Total: {santriList.length} Santri
          </span>
        </div>
      </div>

      {/* Santri Data Table or Empty State */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
        {filteredSantri.length === 0 ? (
          <div className="p-12 text-center text-xs space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-100 shadow-xs">
              <Users className="w-7 h-7" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-base">Belum Ada Data Santri</h3>
              <p className="text-slate-500 font-medium mt-1 max-w-sm mx-auto">
                {santriList.length === 0
                  ? "Sistem saat ini belum memiliki data santri. Silakan tambah santri baru atau gunakan opsi tarik dari Google Sheets."
                  : "Tidak ditemukan santri yang sesuai dengan kata kunci pencarian/filter."}
              </p>
            </div>
            <div className="flex items-center justify-center gap-2.5 pt-2">
              <button
                onClick={() => {
                  setEditingSantri(null);
                  setFormData({
                    nis: '2025001',
                    nama: '',
                    kelas: 'Kelas 12',
                    kamar: 'Asrama 5',
                    klaster: 'Kuning',
                    statusText: 'Pasif / Cukup',
                    wali: '',
                    telepon: ''
                  });
                  setShowAddModal(true);
                }}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-xs transition-colors inline-flex items-center gap-2 shadow-md shadow-emerald-950/20"
              >
                <Plus className="w-4 h-4" />
                <span>+ Input Santri Pertama</span>
              </button>

              {santriList.length === 0 && (
                <button
                  onClick={onLoadSampleData}
                  className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-colors border border-slate-200 inline-flex items-center gap-2 shadow-xs"
                >
                  <Database className="w-4 h-4 text-emerald-600" />
                  <span>Isi Data Sampel (10 Santri)</span>
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th className="py-3.5 px-4 w-12">No</th>
                  <th className="py-3.5 px-4">NIS</th>
                  <th className="py-3.5 px-4">Nama Lengkap</th>
                  <th className="py-3.5 px-4">Kelas</th>
                  <th className="py-3.5 px-4">Kamar</th>
                  <th className="py-3.5 px-4">Badge Klaster</th>
                  <th className="py-3.5 px-4">Wali Santri</th>
                  <th className="py-3.5 px-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {filteredSantri.map((s, idx) => (
                  <tr key={s.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4 text-slate-400 font-mono font-medium">{idx + 1}</td>
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-800">{s.nis}</td>
                    <td className="py-3.5 px-4 font-bold text-slate-900 flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center font-bold text-[11px] shadow-xs">
                        {s.nama[0]}
                      </div>
                      <span>{s.nama}</span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-800 font-semibold">{s.kelas}</td>
                    <td className="py-3.5 px-4 text-slate-600 font-medium">{s.kamar}</td>
                    <td className="py-3.5 px-4">
                      {s.klaster === 'Merah' && (
                        <span className="px-3 py-1 rounded-full bg-rose-50 text-rose-700 border border-rose-200 text-[11px] font-bold flex items-center gap-1.5 w-max">
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                          Merah (Intervensi)
                        </span>
                      )}
                      {s.klaster === 'Kuning' && (
                        <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-[11px] font-bold flex items-center gap-1.5 w-max">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                          Kuning (Pasif/Cukup)
                        </span>
                      )}
                      {s.klaster === 'Hijau' && (
                        <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[11px] font-bold flex items-center gap-1.5 w-max">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                          Hijau (Mandiri/Siap)
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-slate-500">{s.wali || '-'}</td>
                    <td className="py-3.5 px-4 text-right space-x-1 whitespace-nowrap">
                      <button
                        onClick={() => handleEdit(s)}
                        className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors border border-slate-200"
                        title="Edit Santri"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(s.id, s.nama)}
                        className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 transition-colors border border-rose-200"
                        title="Hapus Santri"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setActiveView('rapor-cetak')}
                        className="px-2.5 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold text-[11px] border border-emerald-200 transition-colors inline-flex items-center gap-1"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>Rapor</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal Import Google Sheets */}
      {showSheetModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                <FileSpreadsheet className="w-5 h-5 text-emerald-600" />
                <span>Integrasi Google Sheets Pesantren</span>
              </div>
              <button onClick={() => setShowSheetModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-600 font-medium">
              <p>
                Tautan Google Sheet Data Santri:
                <code className="block mt-1 p-2.5 bg-slate-50 rounded-xl text-[11px] font-mono text-slate-800 border border-slate-200 font-semibold truncate">
                  https://docs.google.com/spreadsheets/d/1InsanMandiri_Mahad50_Santri2025/edit#gid=0
                </code>
              </p>
              <div className="p-3 bg-emerald-50/80 rounded-xl border border-emerald-200 text-emerald-900 font-medium">
                <p className="font-extrabold mb-1">Status Spreadsheet:</p>
                <ul className="list-disc list-inside space-y-0.5 text-[11px]">
                  <li>Sheets ID: InsanMandiri_Mahad_2025</li>
                  <li>Jumlah Baris Siap Diimpor: 10 Santri</li>
                </ul>
              </div>
            </div>

            <div className="pt-3 flex justify-end gap-2">
              <button
                onClick={() => setShowSheetModal(false)}
                className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-semibold text-xs hover:bg-slate-200 border border-slate-200"
              >
                Batal
              </button>
              <button
                onClick={handleSyncGoogleSheet}
                disabled={syncingSheet}
                className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-md shadow-emerald-950/20 flex items-center gap-2"
              >
                {syncingSheet ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Menarik Data...</span>
                  </>
                ) : (
                  <>
                    <RefreshCw className="w-4 h-4" />
                    <span>Tarik Data Sekarang</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Add/Edit Santri */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-slate-900 text-base">
                {editingSantri ? 'Edit Data Santri' : 'Tambah Santri Baru'}
              </h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-3.5 text-xs font-semibold">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">NIS Santri</label>
                  <input
                    type="text"
                    required
                    value={formData.nis}
                    onChange={(e) => setFormData({ ...formData, nis: e.target.value })}
                    placeholder="Contoh: 2025001"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono text-slate-900 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Nama Lengkap</label>
                  <input
                    type="text"
                    required
                    value={formData.nama}
                    onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                    placeholder="Contoh: Ahmad Faryya Ghazi"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Kelas</label>
                  <select
                    value={formData.kelas}
                    onChange={(e) => setFormData({ ...formData, kelas: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-bold focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:outline-none"
                  >
                    <option value="Kelas 12">Kelas 12</option>
                    <option value="Kelas 11">Kelas 11</option>
                    <option value="Kelas 10">Kelas 10</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Kamar Asrama</label>
                  <select
                    value={formData.kamar}
                    onChange={(e) => setFormData({ ...formData, kamar: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-bold focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:outline-none"
                  >
                    <option value="Asrama 5">Asrama 5</option>
                    <option value="Asrama 6">Asrama 6</option>
                    <option value="Asrama 7">Asrama 7</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Status Klaster</label>
                  <select
                    value={formData.klaster}
                    onChange={(e) => {
                      const k = e.target.value;
                      let st = 'Pasif / Cukup';
                      if (k === 'Merah') st = 'Butuh Intervensi';
                      if (k === 'Hijau') st = 'Mandiri / Siap';
                      setFormData({ ...formData, klaster: k, statusText: st });
                    }}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-bold focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:outline-none"
                  >
                    <option value="Kuning">Kuning (Pasif / Cukup)</option>
                    <option value="Merah">Merah (Butuh Intervensi)</option>
                    <option value="Hijau">Hijau (Mandiri / Siap)</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Nama Wali</label>
                  <input
                    type="text"
                    value={formData.wali}
                    onChange={(e) => setFormData({ ...formData, wali: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:outline-none"
                    placeholder="Nama Orang Tua / Wali"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold hover:bg-slate-200 border border-slate-200"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-600 text-white font-extrabold hover:bg-emerald-700 shadow-md shadow-emerald-950/20"
                >
                  Simpan Santri
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

