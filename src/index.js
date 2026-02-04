import './state';
import renderD3Chart from './charts/d3/exampleChart';
import renderEChart from './core/ExampleChart';
import renderTable from './core/ExampleTable';
import './styles/styles.css';
import renderChartViews from './core/chartViews';

/**
 * Run your code after the page has loaded
 */
window.addEventListener('load', () => {
  renderChartViews();
  renderD3Chart();
  renderEChart();
  renderTable('dicharts--table-example');
});
