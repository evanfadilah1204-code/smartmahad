import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import LoginView from './views/LoginView';

import DashboardView from './views/DashboardView';
import ManajemenModulView from './views/ManajemenModulView';
import DataSantriView from './views/DataSantriView';
import InputPenilaianView from './views/InputPenilaianView';
import PbqView from './views/PbqView';
import GrafikAnalisisView from './views/GrafikAnalisisView';
import TrackingHafalanView from './views/TrackingHafalanView';
import PresensiIbadahView from './views/PresensiIbadahView';
import CapaianQuranView from './views/CapaianQuranView';
import PrestasiKasusView from './views/PrestasiKasusView';
import AuditTrailView from './views/AuditTrailView';
import EksporDataView from './views/EksporDataView';
import RaporCetakView from './views/RaporCetakView';
import DisplayTvLobiView from './views/DisplayTvLobiView';

import {
  INITIAL_SANTRI,
  CHARACTER_PARAMETERS,
  INITIAL_PBQ_HISTORY,
  INITIAL_PRESTASI,
  INITIAL_KASUS,
  INITIAL_AUDIT_LOGS,
  INITIAL_TRACKING_HAFALAN,
  SAMPLE_10_SANTRI
} from './data/mockData';

export default function App() {
  const [activeView, setActiveView] = useState('dashboard');
  const [showLoginModal, setShowLoginModal] = useState(false);

  // Global State: Santri starts EMPTY by default as requested
  const [santriList, setSantriList] = useState(INITIAL_SANTRI);
  const [parameters, setParameters] = useState(CHARACTER_PARAMETERS);
  const [pbqHistory, setPbqHistory] = useState(INITIAL_PBQ_HISTORY);
  const [prestasiList, setPrestasiList] = useState(INITIAL_PRESTASI);
  const [kasusList, setKasusList] = useState(INITIAL_KASUS);
  const [auditLogs, setAuditLogs] = useState(INITIAL_AUDIT_LOGS);
  const [trackingItems, setTrackingItems] = useState(INITIAL_TRACKING_HAFALAN);

  const handleLoadSampleData = () => {
    setSantriList(SAMPLE_10_SANTRI);
  };

  const handleClearData = () => {
    if (confirm("Kosongkan seluruh data santri?")) {
      setSantriList([]);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#FAFAFA] text-slate-800 font-sans">
      {/* Sidebar Navigation */}
      <Sidebar
        activeView={activeView}
        setActiveView={setActiveView}
        onOpenLogin={() => setShowLoginModal(true)}
      />

      {/* Main Workspace */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header
          activeView={activeView}
          setActiveView={setActiveView}
          santriCount={santriList.length}
          onLoadSampleData={handleLoadSampleData}
          onClearData={handleClearData}
        />

        <main className="flex-1 overflow-y-auto pb-12">
          {activeView === 'dashboard' && (
            <DashboardView
              santriList={santriList}
              parameters={parameters}
              setActiveView={setActiveView}
              onLoadSampleData={handleLoadSampleData}
            />
          )}

          {activeView === 'manajemen-modul' && (
            <ManajemenModulView
              parameters={parameters}
              setParameters={setParameters}
            />
          )}

          {activeView === 'data-santri' && (
            <DataSantriView
              santriList={santriList}
              setSantriList={setSantriList}
              setActiveView={setActiveView}
              onLoadSampleData={handleLoadSampleData}
            />
          )}

          {activeView === 'input-penilaian' && (
            <InputPenilaianView
              santriList={santriList}
              setSantriList={setSantriList}
              parameters={parameters}
              setActiveView={setActiveView}
            />
          )}

          {activeView === 'pbq' && (
            <PbqView
              pbqHistory={pbqHistory}
              setPbqHistory={setPbqHistory}
            />
          )}

          {activeView === 'grafik-analisis' && (
            <GrafikAnalisisView
              santriList={santriList}
              parameters={parameters}
              setActiveView={setActiveView}
            />
          )}

          {activeView === 'tracking-hafalan' && (
            <TrackingHafalanView
              santriList={santriList}
              trackingItems={trackingItems}
              setTrackingItems={setTrackingItems}
            />
          )}

          {activeView === 'presensi-ibadah' && (
            <PresensiIbadahView
              santriList={santriList}
              setActiveView={setActiveView}
            />
          )}

          {activeView === 'capaian-quran' && (
            <CapaianQuranView
              santriList={santriList}
              setSantriList={setSantriList}
              setActiveView={setActiveView}
            />
          )}

          {activeView === 'prestasi-kasus' && (
            <PrestasiKasusView
              santriList={santriList}
              prestasiList={prestasiList}
              setPrestasiList={setPrestasiList}
              kasusList={kasusList}
              setKasusList={setKasusList}
              setActiveView={setActiveView}
            />
          )}

          {activeView === 'audit-trail' && (
            <AuditTrailView
              auditLogs={auditLogs}
            />
          )}

          {activeView === 'ekspor-data' && (
            <EksporDataView
              santriList={santriList}
            />
          )}

          {activeView === 'rapor-cetak' && (
            <RaporCetakView
              santriList={santriList}
              parameters={parameters}
              setActiveView={setActiveView}
            />
          )}

          {activeView === 'display-tv' && (
            <DisplayTvLobiView
              santriList={santriList}
              onClose={() => setActiveView('dashboard')}
            />
          )}
        </main>
      </div>

      {/* Simulated Login Modal */}
      {showLoginModal && (
        <LoginView
          onLoginSuccess={() => setShowLoginModal(false)}
          onClose={() => setShowLoginModal(false)}
        />
      )}
    </div>
  );
}
