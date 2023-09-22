import React, { useEffect, useState } from 'react';
import PreviewWidth from '../widgets/previewWidth';

const ChartView = () => {
  const width = new PreviewWidth();

  const [view, setView] = useState('desktop');
  const [checked, setChecked] = useState(true);
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

  const handleToggleChange = () => {
    const previewPane = document.getElementById('preview-pane');
    const buttons = document.getElementById('buttons');
    const previewWidthLabel = document.getElementById('preview-width-label');
    const widthInput = document.getElementById('width-input');

    setChecked((preview) => !preview);
    previewPane.style.display = checked ? 'none' : 'block';
    buttons.style.display = checked ? 'none' : 'block';
    previewWidthLabel.style.display = checked ? 'none' : 'block';
    widthInput.style.display = checked ? 'none' : 'block';
    container.style.display = checked ? setDisplay('block') : setDisplay('flex');
  };

  return (
    <div className="preview">
      <div className="toggle-buttons">
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
        <label>
          {checked ? 'Hide Preview' : 'Show Preview'}{' '}
          <input type="checkbox" checked={checked} value={checked} onChange={() => handleToggleChange()} />
        </label>
      </div>
    </div>
  );
};

export default ChartView;
