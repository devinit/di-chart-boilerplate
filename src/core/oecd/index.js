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
  initDonorFilter('dicharts--donor-selector');
  initTableOne('dicharts--table-one');
  initBarChartOne('dicharts--chart-one');
  initBarChartTwo('dicharts--chart-two');
  initTableTwo('dicharts--table-two');
  initOdaAidTable('dicharts--table-three');
  initOdaChannelsTable('dicharts--table-four');
  initOdaChannelsChart('dicharts--chart-three');
};

export default init;
