import './styles/styles.css';
import './state';
import initTableOne from './core/TableOne';
import initDonorFilter from './core/DonorFilter';
import initBarChartOne from './core/BarChartOne';
// import initTableTwo from './core/TableTwo';
import { fetchCoreData } from './utils/data';

// Your Code Goes Here i.e. functions

/**
 * Run your code after the page has loaded
 */
window.addEventListener('load', () => {
  fetchCoreData();
  initDonorFilter('dicharts--iati-root');
  initTableOne('dicharts--iati-table-one-root');
  initBarChartOne('dicharts--iati-chart-one-root');
  // initTableTwo('dicharts--table-two-root');
});
