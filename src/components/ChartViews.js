import React, { useEffect, useState } from 'react';

const ChartView = () => {
  const [view, setView] = useState('desktop');

  useEffect(() => {
    const chartPreview = document.getElementById('preview-iframe');

    if (view === 'mobile') {
      chartPreview.style.width = '300px';
    }
    if (view === 'desktop') {
      chartPreview.style.width = '1400px';
    }
    if (view === 'tablet') {
      chartPreview.style.width = '820px';
    }
  }, [view]);

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
    </div>
  );
};

export default ChartView;
