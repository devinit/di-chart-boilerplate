import initTableOne from './TableOne';
import initDonorFilter from './DonorFilter';
import initBarChartOne from './BarChartOne';
import initBarChartTwo from './BarChartTwo';
import initTableTwo from './TableTwo';
import initOdaAidTable from './OdaAidTable';
import initOdaChannelsTable from './OdaChannelsTable';
import initOdaChannelsChart from './OdaChannelsChart';
import { fetchCoreData } from '../../utils/data';

// Your Code Goes Here i.e. functions

const init = () => {
  fetchCoreData();
  initDonorFilter('dicharts--oda-root');
  initTableOne('dicharts--table-one-root');
  initBarChartOne('dicharts--chart-one-root');
  initBarChartTwo('dicharts--chart-two-root');
  initTableTwo('dicharts--table-two-root');
  initOdaAidTable('dicharts--oda-aid-table');
  initOdaChannelsTable('dicharts--oda-channels-table');
  initOdaChannelsChart('dicharts--oda-channels-chart');
};

export default init;
