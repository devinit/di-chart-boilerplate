import '../../styles/oecd.css';

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
  fetchCoreData([
    { url: 'https://raw.githubusercontent.com/devinit/di-website-data/main/2022/RH%20and%20FP%20Purpose%20code%20trends%20chart%20OECD.csv', state: 'dataOne' },
    { url: 'https://raw.githubusercontent.com/devinit/di-website-data/main/2022/donor-by-recip-2019.csv', state: 'dataTwo' },
    { url: 'https://raw.githubusercontent.com/devinit/di-website-data/main/2022/RH%20FP%20aid%20type%20OECD.csv', state: 'odaAidType' },
    { url: 'https://raw.githubusercontent.com/devinit/di-website-data/main/2022/RH%20FP%20channels%20OECD.csv', state: 'odaChannels' },
  ]);
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
