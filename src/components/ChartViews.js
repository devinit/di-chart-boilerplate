import React, { useEffect, useState } from 'react';
import PreviewWidth from '../widgets/previewWidth';

const ChartView = () => {
  const width = new PreviewWidth();

  const [view, setView] = useState('desktop');
  const [checked, setChecked] = useState(false);
  const [display, setDisplay] = useState('flex');

  const chartPreview = document.getElementById('preview-iframe');

  useEffect(() => {
    if (view === 'mobile') {
      chartPreview.style.width = width.getWidth('mobile');
    }
    if (view === 'desktop') {
      chartPreview.style.width = width.getWidth('desktop');
    }
    if (view === 'tablet') {
      chartPreview.style.width = width.getWidth('tablet');
    }
  }, [view]);

  const container = document.getElementById('page-container');
  container.style.display = display;

  const previewPane = document.getElementById('preview-pane');

  previewPane.style.display = checked ? 'block' : 'none';

  const handleToggleChange = () => {
    const buttons = document.getElementById('buttons');

    setChecked((preview) => !preview);
    buttons.style.display = checked ? 'block' : 'none';
    container.style.display = checked ? setDisplay('flex') : setDisplay('block');
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
