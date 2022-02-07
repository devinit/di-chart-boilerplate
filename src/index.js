import './styles/styles.css';
import './state';
import initTableOne from './core/TableOne';
import initDonorFilter from './core/DonorFilter';
import initBarChartOne from './core/BarChartOne';
import initBarChartTwo from './core/BarChartTwo';
import initTableTwo from './core/TableTwo';
import initOdaAidTable from './core/OdaAidTable';
import initOdaChannelsTable from './core/OdaChannelsTable';
import initOdaChannelsChart from './core/OdaChannelsChart';
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
  initBarChartTwo('dicharts--chart-two-root');
  initTableTwo('dicharts--table-two-root');
  initOdaAidTable('dicharts--oda-aid-table');
  initOdaChannelsTable('dicharts--oda-channels-table');
  initOdaChannelsChart('dicharts--oda-channels-chart');
});
