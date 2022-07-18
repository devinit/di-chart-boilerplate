import '../../styles/oecd.css';

import initTableOne from './TableOne';
import initDonorFilter from './DonorFilter';
import initBarChartOne from './BarChartOne';
import initTableTwo from './TableTwo';
import { fetchCoreData } from '../../utils/data';

// Your Code Goes Here i.e. functions

const init = () => {
  fetchCoreData([
    { url: 'https://raw.githubusercontent.com/devinit/di-website-data/main/2022/data_1.csv', state: 'dataOne' },
    { url: 'https://raw.githubusercontent.com/devinit/di-website-data/main/2022/data_2.csv', state: 'dataTwo' },
  ], { country: 'United States' });
  initDonorFilter('dicharts--donor-selector');
  initTableOne('dicharts--table-one');
  initBarChartOne('dicharts--chart-one');
  initTableTwo('dicharts--table-two');
};

export default init;
