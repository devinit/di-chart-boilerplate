import React from 'react';
import { createRoot } from 'react-dom/client';
import ChartView from '../components/ChartViews';

const renderChartViews = () => {
  const viewWrapper = document.getElementsByClassName('dicharts--chart-views')[0];
  if (viewWrapper) {
    const root = createRoot(viewWrapper);
    root.render(<ChartView />);
  }
};

export default renderChartViews;
