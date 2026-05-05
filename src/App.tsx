import { useState } from 'react';
import './index.css';
import MaterialPreview from './tabs/MaterialPreview';
import StudentActivity from './tabs/StudentActivity';
import GradedSubmissions from './tabs/GradedSubmissions';
import Statistics from './tabs/Statistics';
import UploadMaterialModal from './components/UploadMaterialModal';
import UploadAgentModal from './components/UploadAgentModal';

type Tab = 'material' | 'activity' | 'grades' | 'stats';

const tabs: { id: Tab; label: string }[] = [
  { id: 'material', label: 'Material Preview' },
  { id: 'activity', label: 'Student Activity' },
  { id: 'grades', label: 'Graded Submissions' },
  { id: 'stats', label: 'Statistics' },
];

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('material');
  const [showUploadMaterial, setShowUploadMaterial] = useState(false);
  const [showUploadAgent, setShowUploadAgent] = useState(false);

  function renderContent() {
    switch (activeTab) {
      case 'material': return <MaterialPreview />;
      case 'activity': return <StudentActivity />;
      case 'grades': return <GradedSubmissions />;
      case 'stats': return <Statistics />;
    }
  }

  return (
    <>
    <div className="dashboard">
      {/* Header */}
      <header className="header">
        <div className="header-left">
          <h1>Instructor Panel</h1>
          <p>CSC 101 — Lab 4: Linked Lists</p>
        </div>
        <div className="status-pill">● Lab in session</div>
      </header>

      {/* Body */}
      <div className="body">
        {/* Left Panel */}
        <aside className="left-panel">
          <div className="panel-section-label">Lab Material</div>

          <div className="uploaded-file">
            <div className="file-name">Lab4_specification.pdf</div>
            <div className="file-meta">Uploaded · 2.3 MB</div>
          </div>

          <button className="panel-btn panel-btn-ghost" onClick={() => setShowUploadMaterial(true)}>Upload Material</button>
          <button className="panel-btn panel-btn-ghost" onClick={() => setShowUploadAgent(true)}>Upload Agent Instructions</button>

          <hr className="panel-divider" />

          <div className="panel-section-label">AI Actions</div>
<button className="panel-btn panel-btn-tinted">Generate Lab Tasks</button>
          <button className="panel-btn panel-btn-tinted">Generate Quiz</button>

          <hr className="panel-divider" />

          <button className="panel-btn panel-btn-primary">Grade Submissions</button>
        </aside>

        {/* Main */}
        <main className="main">
          {/* Tab Bar */}
          <div className="tab-bar">
            {tabs.map(tab => (
              <button
                key={tab.id}
                className={`tab-btn${activeTab === tab.id ? ' active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="content-scroll">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>

    {showUploadMaterial && <UploadMaterialModal onClose={() => setShowUploadMaterial(false)} />}
    {showUploadAgent && <UploadAgentModal onClose={() => setShowUploadAgent(false)} />}
    </>
  );
}
