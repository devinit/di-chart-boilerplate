import renderD3Chart from './charts/d3/exampleChart';
import renderEChart from './charts/echarts/exampleChart';
import './styles/styles.css';

/**
 * Run your code after the page has loaded
 */
window.addEventListener('load', () => {
  renderD3Chart();
  renderEChart();
});
