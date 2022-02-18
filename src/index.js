import './styles/styles.css';
import './state';
import initTableOne from './core/TableOne';
import initDonorFilter from './core/DonorFilter';
import initBarChartOne from './core/BarChartOne';
import initTableTwo from './core/TableTwo';
import initIATIAidTable from './core/IATIAidTable';
import initBarChartTwo from './core/BarChartTwo';
import initIATIChannelsTable from './core/IATIChannelsTable';
import initIATIChannelsChart from './core/IATIChannelsChart';
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
  initTableTwo('dicharts--iati-table-two-root');
  initIATIAidTable('dicharts--iati-aid-table');
  initBarChartTwo('dicharts--chart-two-root')
  initIATIChannelsTable('dicharts--iati-channels-table');
  initIATIChannelsChart('dicharts--iati-channels-chart');
});
