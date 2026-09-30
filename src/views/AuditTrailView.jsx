import React, { useState } from 'react';
import {
  History,
  Shield,
  Search,
  Filter,
  Terminal,
  Database
} from 'lucide-react';

export default function AuditTrailView({ auditLogs }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterAksi, setFilterAksi] = useState('Semua');

  const filteredLogs = auditLogs.filter(log => {
    const matchText = log.tabel.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      log.keyId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      log.operator.toLowerCase().includes(searchTerm.toLowerCase());
    const matchAksi = filterAksi === 'Semua' || log.aksi === filterAksi;
    return matchText && matchAksi;
  });

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-700 font-bold">
            <History className="w-5 h-5" />
            <h2 className="text-lg text-slate-800">System Audit Trail & Log Keamanan Data</h2>
          </div>
          <p className="text-xs text-slate-500">
            Pencatatan real-time seluruh mutasi data (INSERT, UPDATE, DELETE) pada sistem SmartMahad 5.0.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 text-emerald-400 font-mono text-xs border border-slate-800">
          <Terminal className="w-4 h-4" />
          <span>Audit Log Level: Verbose (Encrypted)</span>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Cari nama tabel, Key ID, atau Operator..."
            className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-3">
          <span className="font-semibold text-slate-500">Filter Aksi:</span>
          <select
            value={filterAksi}
            onChange={(e) => setFilterAksi(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-700 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
          >
            <option value="Semua">Semua Aksi</option>
            <option value="UPDATE">UPDATE</option>
            <option value="INSERT">INSERT</option>
            <option value="DELETE">DELETE</option>
          </select>
        </div>
      </div>

      {/* Table Audit Logs */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="p-4 bg-slate-50/80 border-b border-slate-200/80 flex items-center justify-between">
          <h3 className="font-bold text-slate-800 text-xs uppercase tracking-wider">
            Tabel Log Perubahan Database Terstruktur
          </h3>
          <span className="text-xs text-slate-500 font-mono">Total {filteredLogs.length} Records Log</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-100/70 text-slate-600 font-bold uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3.5 px-4">Log ID & Timestamp</th>
                <th className="py-3.5 px-4">Nama Tabel</th>
                <th className="py-3.5 px-4 text-center">Aksi</th>
                <th className="py-3.5 px-4">ID Kunci (Key ID)</th>
                <th className="py-3.5 px-4">Nilai Lama</th>
                <th className="py-3.5 px-4">Nilai Baru</th>
                <th className="py-3.5 px-4">Operator</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono text-[11px]">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4">
                    <span className="font-bold text-slate-900 block">{log.id}</span>
                    <span className="text-slate-400 text-[10px]">{log.timestamp}</span>
                  </td>
                  <td className="py-3.5 px-4 font-bold text-emerald-700">{log.tabel}</td>
                  <td className="py-3.5 px-4 text-center">
                    <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                      log.aksi === 'UPDATE' ? 'bg-amber-100 text-amber-800 border border-amber-200' :
                      log.aksi === 'INSERT' ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' :
                      'bg-rose-100 text-rose-800 border border-rose-200'
                    }`}>
                      {log.aksi}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-bold text-slate-800">{log.keyId}</td>
                  <td className="py-3.5 px-4 text-slate-500 max-w-xs truncate">{log.nilaiLama}</td>
                  <td className="py-3.5 px-4 text-emerald-900 font-semibold max-w-xs truncate bg-emerald-50/30">
                    {log.nilaiBaru}
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 font-sans">{log.operator}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
