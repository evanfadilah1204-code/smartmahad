import React, { useState, useEffect } from 'react';
import {
  ClipboardEdit,
  Save,
  CheckCircle2,
  UserPlus,
  Link,
  Users
} from 'lucide-react';

export default function InputPenilaianView({ santriList, setSantriList, parameters, setActiveView }) {
  const [selectedKelas, setSelectedKelas] = useState('Kelas 12');
  const [selectedSantriId, setSelectedSantriId] = useState('');
  const [jenisSesi, setJenisSesi] = useState('Posttest');
  const [tanggal, setTanggal] = useState('2026-09-30');
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [savedSantriNama, setSavedSantriNama] = useState('');

  // Auto select first santri if not selected or invalid
  useEffect(() => {
    if (santriList.length > 0 && (!selectedSantriId || !santriList.some(s => s.id === Number(selectedSantriId)))) {
      setSelectedSantriId(santriList[0].id);
    }
  }, [santriList, selectedSantriId]);

  const activeSantri = santriList.find(s => s.id === Number(selectedSantriId)) || santriList[0];

  const [scores, setScores] = useState({
    LRT1: 3,
    LRT2: 3,
    LRT3: 3,
    LRT4: 3,
    LRT5: 3
  });

  const [proofs, setProofs] = useState({
    LRT1: 'Catatan kegiatan olahraga dan kesehatan harian',
    LRT2: 'Jurnal observasi fokus KBM di kelas',
    LRT3: 'Catatan kerapian kamar & kelola saku',
    LRT4: 'Presensi ketepatan waktu di masjid',
    LRT5: 'Catatan sikap dan adab harian musyrif'
  });

  // Sync scores with activeSantri when activeSantri changes
  useEffect(() => {
    if (activeSantri) {
      const currentScores = jenisSesi === 'Pretest' ? activeSantri.scoresPre : activeSantri.scoresPost;
      if (currentScores) {
        setScores({
          LRT1: currentScores.LRT1 ?? 3,
          LRT2: currentScores.LRT2 ?? 3,
          LRT3: currentScores.LRT3 ?? 3,
          LRT4: currentScores.LRT4 ?? 3,
          LRT5: currentScores.LRT5 ?? 3
        });
      }
    }
  }, [selectedSantriId, jenisSesi]);

  const handleScoreChange = (kode, val) => {
    setScores(prev => ({ ...prev, [kode]: Number(val) }));
  };

  const handleProofChange = (kode, val) => {
    setProofs(prev => ({ ...prev, [kode]: val }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const targetSantri = activeSantri;
    if (!targetSantri) {
      alert("Silakan pilih santri terlebih dahulu.");
      return;
    }

    setSantriList(prevList => prevList.map(s => {
      if (s.id === targetSantri.id) {
        const targetField = jenisSesi === 'Pretest' ? 'scoresPre' : 'scoresPost';
        const updatedTarget = { ...(s[targetField] || {}), ...scores };

        const avg = Object.values(updatedTarget).reduce((a, b) => a + b, 0) / 5;
        let newKlaster = 'Kuning';
        let newStatus = 'Pasif / Cukup';

        if (avg >= 3.5) {
          newKlaster = 'Hijau';
          newStatus = 'Mandiri / Siap';
        } else if (avg < 2.0) {
          newKlaster = 'Merah';
          newStatus = 'Butuh Intervensi';
        }

        const preAvg = Object.values(s.scoresPre || { LRT1: 2, LRT2: 2, LRT3: 2, LRT4: 2, LRT5: 2 }).reduce((a, b) => a + b, 0) / 5;
        const postAvg = jenisSesi === 'Posttest' ? avg : (Object.values(s.scoresPost || {}).reduce((a, b) => a + b, 0) / 5 || avg);
        const nGainCalculated = Number(((postAvg - preAvg) / (4.0 - preAvg)).toFixed(3)) || 0.40;

        return {
          ...s,
          [targetField]: updatedTarget,
          scores: updatedTarget,
          klaster: newKlaster,
          statusText: newStatus,
          nGain: Math.max(0, Math.min(1, nGainCalculated))
        };
      }
      return s;
    }));

    setSavedSantriNama(targetSantri.nama);
    setSavedSuccess(true);
    alert(`✅ Penilaian untuk ${targetSantri.nama} berhasil disimpan!`);
    setTimeout(() => setSavedSuccess(false), 4000);
  };

  return (
    <div className="p-6 space-y-6 max-w-5xl mx-auto">
      {/* Header Banner */}
      <div className="bg-white p-6 rounded-2xl border-2 border-slate-300 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-800 font-black">
            <ClipboardEdit className="w-5 h-5 text-emerald-700" />
            <h2 className="text-lg text-slate-950">Form Input Penilaian Skor Karakter Santri</h2>
          </div>
          <p className="text-xs font-semibold text-slate-600">
            Penilaian 5 Pilar Karakter (Singa, Elang, Sapi, Ayam, Bunglon) dengan skala 0 hingga 4.
          </p>
        </div>

        {savedSuccess && (
          <div className="px-4 py-2 rounded-xl bg-emerald-100 border-2 border-emerald-400 text-emerald-950 text-xs font-extrabold flex items-center gap-2 shadow-sm animate-bounce">
            <CheckCircle2 className="w-4 h-4 text-emerald-700" />
            <span>Penilaian {savedSantriNama} Berhasil Disimpan!</span>
          </div>
        )}
      </div>

      {santriList.length === 0 ? (
        <div className="bg-white p-12 rounded-2xl border-2 border-slate-300 shadow-sm text-center text-xs space-y-4">
          <Users className="w-12 h-12 text-slate-400 mx-auto" />
          <div>
            <h3 className="font-black text-slate-950 text-base">Belum Ada Data Santri Untuk Dinilai</h3>
            <p className="text-slate-600 font-semibold mt-1 max-w-sm mx-auto">
              Silakan tambahkan santri terlebih dahulu melalui menu Data Santri agar dapat melakukan penilaian karakter.
            </p>
          </div>
          <button
            onClick={() => setActiveView('data-santri')}
            className="px-5 py-2.5 rounded-xl bg-emerald-700 text-white font-extrabold text-xs shadow-md hover:bg-emerald-800 transition-colors inline-flex items-center gap-2"
          >
            <UserPlus className="w-4 h-4" />
            <span>+ Tambah Santri Baru</span>
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Form Metadata Section */}
          <div className="bg-white p-5 rounded-2xl border-2 border-slate-300 shadow-sm space-y-4">
            <h3 className="font-black text-slate-950 text-xs uppercase tracking-wider border-b-2 border-slate-200 pb-2">
              1. Pilih Santri & Sesi Penilaian
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-semibold">
              <div>
                <label className="block font-bold text-slate-900 mb-1">Pilih Kelas</label>
                <select
                  value={selectedKelas}
                  onChange={(e) => setSelectedKelas(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border-2 border-slate-300 rounded-xl font-bold text-slate-900 focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                >
                  <option value="Kelas 12">Kelas 12</option>
                  <option value="Kelas 11">Kelas 11</option>
                  <option value="Kelas 10">Kelas 10</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-900 mb-1">Pilih Santri</label>
                <select
                  value={selectedSantriId}
                  onChange={(e) => setSelectedSantriId(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border-2 border-slate-300 rounded-xl font-extrabold text-slate-950 focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                >
                  {santriList.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.nis} - {s.nama} ({s.kamar})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-900 mb-1">Jenis Sesi</label>
                <select
                  value={jenisSesi}
                  onChange={(e) => setJenisSesi(e.target.value)}
                  className="w-full px-3 py-2 bg-emerald-100 border-2 border-emerald-300 text-emerald-950 rounded-xl font-extrabold focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                >
                  <option value="Posttest">Posttest (Evaluasi Akhir)</option>
                  <option value="Pretest">Pretest (Awal Periode)</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-900 mb-1">Tanggal Penilaian</label>
                <input
                  type="date"
                  value={tanggal}
                  onChange={(e) => setTanggal(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border-2 border-slate-300 rounded-xl font-mono font-bold text-slate-950 focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                />
              </div>
            </div>

            {/* Active Santri Card Preview */}
            {activeSantri && (
              <div className="p-3.5 bg-slate-950 text-white rounded-xl flex items-center justify-between text-xs border border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-600 border border-emerald-400 text-white flex items-center justify-center font-black">
                    {activeSantri.nama[0]}
                  </div>
                  <div>
                    <span className="font-extrabold text-white text-sm">{activeSantri.nama}</span>
                    <span className="ml-2 text-slate-300 font-mono font-bold">NIS: {activeSantri.nis}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded bg-slate-800 text-slate-200 font-bold border border-slate-700">{activeSantri.kamar}</span>
                  <span className="px-2.5 py-1 rounded bg-amber-500/30 text-amber-200 border border-amber-400 font-black">
                    Klaster: {activeSantri.klaster}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* 5 Parameters Assessment Inputs */}
          <div className="bg-white p-5 rounded-2xl border-2 border-slate-300 shadow-sm space-y-6">
            <h3 className="font-black text-slate-950 text-xs uppercase tracking-wider border-b-2 border-slate-200 pb-2">
              2. Input Skor 5 Indicator Karakter (Skala 0 - 4)
            </h3>

            <div className="space-y-6">
              {parameters.map((param) => {
                const currentVal = scores[param.kode] ?? 3;
                const currentProof = proofs[param.kode] ?? '';

                return (
                  <div key={param.kode} className="p-4 rounded-2xl bg-slate-50 border-2 border-slate-300 space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <span className="px-3 py-1 rounded-xl bg-emerald-700 text-white font-mono font-black text-xs shadow-xs">
                          {param.kode}
                        </span>
                        <h4 className="font-extrabold text-slate-950 text-sm">
                          {param.hewan} ({param.aspek})
                        </h4>
                      </div>

                      {/* Radio Skor Selector 0-4 */}
                      <div className="flex items-center gap-1.5 bg-white p-1 rounded-xl border-2 border-slate-300">
                        {[0, 1, 2, 3, 4].map((num) => (
                          <button
                            key={num}
                            type="button"
                            onClick={() => handleScoreChange(param.kode, num)}
                            className={`w-8 h-8 rounded-lg font-black text-xs transition-all ${
                              currentVal === num
                                ? 'bg-emerald-700 text-white shadow-md ring-2 ring-emerald-500'
                                : 'text-slate-800 hover:bg-slate-200 font-bold'
                            }`}
                          >
                            {num}
                          </button>
                        ))}
                      </div>
                    </div>

                    <p className="text-xs text-slate-700 font-medium leading-relaxed italic">
                      <span className="font-bold text-slate-900">Indikator: </span>
                      {param.indikator}
                    </p>

                    {/* Bukti Input */}
                    <div className="space-y-1">
                      <label className="block text-[11px] font-bold text-slate-800 flex items-center gap-1">
                        <Link className="w-3.5 h-3.5 text-slate-600" />
                        <span>Catatan Bukti Jurnal Observasi:</span>
                      </label>
                      <input
                        type="text"
                        value={currentProof}
                        onChange={(e) => handleProofChange(param.kode, e.target.value)}
                        placeholder="Masukkan catatan jurnal atau bukti portofolio..."
                        className="w-full px-3 py-2 bg-white border-2 border-slate-300 rounded-xl text-xs font-semibold text-slate-950 focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Submit Bar */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => {
                setScores({ LRT1: 3, LRT2: 3, LRT3: 3, LRT4: 3, LRT5: 3 });
              }}
              className="px-5 py-2.5 rounded-xl bg-slate-200 text-slate-900 font-bold text-xs hover:bg-slate-300 transition-colors border border-slate-300"
            >
              Reset Form
            </button>

            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-black text-xs shadow-md transition-all flex items-center gap-2 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Simpan Penilaian Santri</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
