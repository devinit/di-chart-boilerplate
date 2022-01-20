import './styles/styles.css';
import './state';
import initTableOne from './core/TableOne';
import initDonorFilter from './core/DonorFilter';
import initBarChartOne from './core/BarChartOne';
import { fetchCoreData } from './utils/data';

// Your Code Goes Here i.e. functions

/**
 * Run your code after the page has loaded
 */
window.addEventListener('load', () => {
  fetchCoreData();
  initDonorFilter('dicharts--oda-root');
  initTableOne('dicharts--table-one-root');
  initBarChartOne('dicharts--chart-one-root');
});
