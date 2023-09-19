import React, { useEffect, useState } from 'react';
import PreviewWidth from '../widgets/previewWidth';

const ChartView = () => {
  const width = new PreviewWidth();

  const [view, setView] = useState('desktop');
  const [isValidInput, setIsValidInput] = useState(true);
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

  const validateInput = (inputString) => {
    const reg = /^(\d+)px$/;
    const isValid = inputString.length === 0 || reg.test(inputString.trim());

    return isValid;
  };

  const handleInputChange = (event) => {
    const validationResult = validateInput(event.target.value);
    setIsValidInput(validationResult);
    setView(event.target.value);
  };

  const onEnterButtonClicked = () => {
    chartPreview.style.width = view;
  };

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
      <label htmlFor="preview-width" id="preview-width-label">
        Enter screen width
      </label>
      <div id="width-input">
        <div id="preview-width-input">
          <input placeholder="E.g 300px" id="preview-width" onChange={(event) => handleInputChange(event)}></input>
          <button className="button" id="preview-button" onClick={onEnterButtonClicked}>
            ENTER
          </button>
        </div>
        {!isValidInput && <small className="preview-input-error">Please enter a valid width in the format 100px</small>}
      </div>
    </div>
  );
};

export default ChartView;
