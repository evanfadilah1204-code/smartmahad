import React, { useState } from 'react';
import {
  Boxes,
  Plus,
  Edit2,
  Trash2,
  CheckCircle2,
  HelpCircle,
  Sparkles,
  Layers,
  Search,
  X
} from 'lucide-react';

export default function ManajemenModulView({ parameters, setParameters }) {
  const [selectedModul, setSelectedModul] = useState("Ring Time (5 Binatang) & Kemandirian & Karakter Santri");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingParam, setEditingParam] = useState(null);

  const [formData, setFormData] = useState({
    kode: '',
    hewan: '',
    aspek: '',
    indikator: '',
    caraUkur: '',
    skala: '0 - 4'
  });

  const handleSave = (e) => {
    e.preventDefault();
    if (editingParam) {
      setParameters(parameters.map(p => p.kode === editingParam.kode ? { ...formData } : p));
      setEditingParam(null);
    } else {
      setParameters([...parameters, { ...formData }]);
    }
    setFormData({ kode: '', hewan: '', aspek: '', indikator: '', caraUkur: '', skala: '0 - 4' });
    setShowAddModal(false);
  };

  const handleEdit = (param) => {
    setEditingParam(param);
    setFormData({ ...param });
    setShowAddModal(true);
  };

  const handleDelete = (kode) => {
    if (confirm(`Yakin ingin menghapus parameter instrument ${kode}?`)) {
      setParameters(parameters.filter(p => p.kode !== kode));
    }
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header & Modul Selector */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Boxes className="w-5 h-5 text-emerald-600" />
            <h2 className="text-lg font-bold text-slate-800">Manajemen Modul & Model Instrumen Penilaian</h2>
          </div>
          <p className="text-xs text-slate-500">
            Kelola indikator, instrumen cara ukur, dan kode parameter karakter santri pesantren.
          </p>
        </div>

        {/* Dropdown Pemilih Modul */}
        <div className="w-full md:w-96">
          <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
            Pilih Modul Aktif:
          </label>
          <select
            value={selectedModul}
            onChange={(e) => setSelectedModul(e.target.value)}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:outline-none shadow-sm"
          >
            <option value="Ring Time (5 Binatang) & Kemandirian & Karakter Santri">
              🐾 Ring Time (5 Binatang) & Kemandirian & Karakter Santri
            </option>
            <option value="Shalat Khusyuk & Kepemimpinan">
              🕌 Shalat Khusyuk & Kepemimpinan Mahad 5.0
            </option>
          </select>
        </div>
      </div>

      {/* Info Card */}
      <div className="p-4 rounded-xl bg-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-md border border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-bold">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">{selectedModul}</h3>
            <p className="text-xs text-slate-300">
              Total {parameters.length} parameter instrumen karakter terdaftar dengan skala pengukuran 0 hingga 4.
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            setEditingParam(null);
            setFormData({
              kode: `LRT${parameters.length + 1}`,
              hewan: '',
              aspek: '',
              indikator: '',
              caraUkur: '',
              skala: '0 - 4'
            });
            setShowAddModal(true);
          }}
          className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-all shadow-md flex items-center gap-2 whitespace-nowrap"
        >
          <Plus className="w-4 h-4" />
          <span>+ Tambah Parameter</span>
        </button>
      </div>

      {/* Parameter Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="p-4 bg-slate-50/80 border-b border-slate-200/80 flex items-center justify-between">
          <h3 className="font-bold text-slate-800 text-xs uppercase tracking-wider">
            Tabel Instrumen Parameter Karakter (Ring Time 5 Binatang)
          </h3>
          <span className="text-xs text-slate-500 font-mono">Kode WS: LRT1 - LRT5</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-100/70 text-slate-600 font-bold uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3.5 px-4 w-24">Kode WS</th>
                <th className="py-3.5 px-4">Nama Parameter / Hewan</th>
                <th className="py-3.5 px-4">Aspek Karakter</th>
                <th className="py-3.5 px-4">Indikator Penilaian</th>
                <th className="py-3.5 px-4">Cara Ukur Instrumen</th>
                <th className="py-3.5 px-4 w-24 text-center">Skala</th>
                <th className="py-3.5 px-4 w-28 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {parameters.map((param) => (
                <tr key={param.kode} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-4 px-4 font-mono font-bold text-emerald-700 bg-emerald-50/40 border-r border-slate-100">
                    {param.kode}
                  </td>
                  <td className="py-4 px-4 font-bold text-slate-800 flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs border border-emerald-200">
                      {param.hewan ? param.hewan[0] : 'P'}
                    </span>
                    <span>{param.hewan}</span>
                  </td>
                  <td className="py-4 px-4 font-semibold text-slate-700">{param.aspek}</td>
                  <td className="py-4 px-4 max-w-xs text-slate-600 leading-relaxed">{param.indikator}</td>
                  <td className="py-4 px-4 max-w-xs text-slate-600 leading-relaxed bg-slate-50/40">{param.caraUkur}</td>
                  <td className="py-4 px-4 text-center font-mono font-bold text-slate-700">{param.skala}</td>
                  <td className="py-4 px-4 text-right space-x-1 whitespace-nowrap">
                    <button
                      onClick={() => handleEdit(param)}
                      className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
                      title="Edit Parameter"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(param.kode)}
                      className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition-colors"
                      title="Hapus Parameter"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-5 animate-in fade-in zoom-in duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-800 text-base">
                {editingParam ? 'Edit Parameter Instrumen' : 'Tambah Parameter Instrumen Baru'}
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Kode WS (LRT1-LRT5)</label>
                  <input
                    type="text"
                    required
                    value={formData.kode}
                    onChange={(e) => setFormData({ ...formData, kode: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl font-mono focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    placeholder="Contoh: LRT6"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Nama Parameter (Hewan)</label>
                  <input
                    type="text"
                    required
                    value={formData.hewan}
                    onChange={(e) => setFormData({ ...formData, hewan: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    placeholder="Contoh: Serigala"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Aspek Karakter</label>
                <input
                  type="text"
                  required
                  value={formData.aspek}
                  onChange={(e) => setFormData({ ...formData, aspek: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  placeholder="Contoh: Keberanian & Daya Tahan"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Indikator Penilaian</label>
                <textarea
                  rows="2"
                  required
                  value={formData.indikator}
                  onChange={(e) => setFormData({ ...formData, indikator: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  placeholder="Deskripsi indikator yang diamati..."
                ></textarea>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Cara Ukur Instrumen</label>
                <textarea
                  rows="2"
                  required
                  value={formData.caraUkur}
                  onChange={(e) => setFormData({ ...formData, caraUkur: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  placeholder="Metode pengukuran / observasi musyrif..."
                ></textarea>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-600 font-semibold hover:bg-slate-200"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-700 shadow"
                >
                  Simpan Parameter
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
