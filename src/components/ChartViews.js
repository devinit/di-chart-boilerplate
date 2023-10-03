import React, { useEffect, useState } from 'react';
import PreviewWidth from '../widgets/previewWidth';

const ChartView = () => {
  const width = new PreviewWidth();

  const [view, setView] = useState('desktop');
  const [checked, setChecked] = useState(false);

  const chartPreview = document.getElementById('preview-iframe');
  const allCharts = document.getElementById('all-charts');

  useEffect(() => {
    if (view === 'mobile') {
      chartPreview.style.maxWidth = width.getWidth('mobile');
    }
    if (view === 'desktop') {
      chartPreview.style.maxWidth = width.getWidth('desktop');
    }
    if (view === 'tablet') {
      chartPreview.style.maxWidth = width.getWidth('tablet');
    }
  }, [view]);

  const container = document.getElementById('page-container');
  container.style.display = 'flex';

  const previewPane = document.getElementById('preview-pane');
  previewPane.style.display = checked ? 'block' : 'none';

  const handleToggleChange = () => {
    setChecked((preview) => !preview);
    container.style.display = checked ? 'block' : 'flex';
    previewPane.style.minWidth = checked ? '0%' : '30%';
    allCharts.style.minWidth = checked ? '100%' : '70%';
  };

  return (
    <div className="preview">
      <div className="toggle-buttons">
        {checked && (
          <div className="buttons" id="buttons">
            <button className="button" onClick={() => setView('desktop')}>
              Desktop
            </button>
            <button className="button" onClick={() => setView('tablet')}>
              Tablet
            </button>
            <button className="button" onClick={() => setView('mobile')}>
              Mobile
            </button>
          </div>
        )}
        <div className="preview-label">
          <h3> {checked ? 'Hide Preview' : 'Show Preview'}</h3>
          <label className="preview-switch">
            <input type="checkbox" checked={checked} value={checked} onChange={() => handleToggleChange()} />
            <span className="switch"></span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default ChartView;
