import React, { useEffect, useState } from 'react';
import PreviewWidth from '../widgets/previewWidth';

const ChartView = () => {
  const width = new PreviewWidth();

  const [view, setView] = useState('desktop');
  const [isValidInput, setIsValidInput] = useState(true);
  const [checked, setChecked] = useState(true);

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

  const handleChange = (event) => {
    const validationResult = validateInput(event.target.value);
    setIsValidInput(validationResult);
    setView(event.target.value);
  };

  const handleClick = () => {
    chartPreview.style.width = view;
  };

  // const togglePreview = () => {
  // const previewPane = document.getElementsByClassName('preview-iframe');
  // console.log(checked);
  // if (checked) {
  // } else {
  // chartPreview.style.display = 'none';
  // }
  // };

  const handleToggleChange = () => {
    const previewPane = document.getElementById('preview-pane');
    const buttons = document.getElementById('buttons');
    const previewWidthLabel = document.getElementById('preview-width-label');
    const widthInput = document.getElementById('width-input');
    const container = document.getElementById('page-container');

    setChecked((preview) => !preview);
    previewPane.style.display = checked ? 'none' : 'block';
    buttons.style.display = checked ? 'none' : 'block';
    previewWidthLabel.style.display = checked ? 'none' : 'block';
    widthInput.style.display = checked ? 'none' : 'block';
    container.style.display = checked ? 'block' : 'flex';

    // if (checked) {
    //   previewPane.classList.remove('hidden');
    //   buttons.classList.remove('hidden');
    //   previewWidthLabel.classList.remove('hidden');
    //   widthInput.classList.remove('hidden');
    // } else {
    //   previewPane.classList.add('hidden');
    //   buttons.classList.add('hidden');
    //   previewWidthLabel.classList.add('hidden');
    //   widthInput.classList.add('hidden');
    // }

    // togglePreview();
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
          <input
            type="checkbox"
            checked={checked}
            value={checked}
            onChange={(event) => handleToggleChange(event.target.checked)}
          />
        </label>
      </div>
      <label htmlFor="preview-width" id="preview-width-label">
        Enter screen width
      </label>
      <div id="width-input">
        <div id="preview-width-input">
          <input placeholder="E.g 300px" id="preview-width" onChange={(event) => handleChange(event)}></input>
          <button className="button" id="preview-button" onClick={handleClick}>
            ENTER
          </button>
        </div>
        {!isValidInput && <small className="preview-input-error">Please enter a valid width in the format 100px</small>}
      </div>
    </div>
  );
};

export default ChartView;
