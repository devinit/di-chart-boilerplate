import React, { useEffect, useState } from 'react';

const ChartView = () => {
  const [view, setView] = useState('desktop');
  const [isValidInput, setIsValidInput] = useState(true);

  const chartPreview = document.getElementById('preview-iframe');

  useEffect(() => {
    if (view === 'mobile') {
      chartPreview.style.width = '500px';
    }
    if (view === 'desktop') {
      chartPreview.style.width = '1400px';
    }
    if (view === 'tablet') {
      chartPreview.style.width = '820px';
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

  return (
    <div>
      <button className="button" onClick={() => setView('desktop')}>
        Desktop
      </button>
      <button className="button" onClick={() => setView('tablet')}>
        Tablet
      </button>
      <button className="button" onClick={() => setView('mobile')}>
        Mobile
      </button>
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
