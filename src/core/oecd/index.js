import '../../styles/oecd.css';

import initTableOne from './TableOne';
import initDonorFilter from './DonorFilter';
import initBarChartOne from './BarChartOne';
import initTableTwo from './TableTwo';
import initYearFilter from './YearFilter';
import initTableThree from './TableMuskokaThree';
import { fetchCoreData } from '../../utils/data';

// Your Code Goes Here i.e. functions

const init = () => {
  fetchCoreData([
    { url: 'https://raw.githubusercontent.com/devinit/di-website-data/feature/update-rhfp-files/2022/data_1.csv', state: 'dataOne' },
    { url: 'https://raw.githubusercontent.com/devinit/di-website-data/feature/update-rhfp-files/2022/data_2.csv', state: 'dataTwo' },
    { url: 'https://raw.githubusercontent.com/devinit/di-website-data/feature/update-rhfp-files/2022/data_3.csv', state: 'dataThree' },
  ], { country: 'United States' });
  initDonorFilter('dicharts--donor-selector');
  initTableOne('dicharts--table-one');
  initBarChartOne('dicharts--chart-one');
  initTableTwo('dicharts--table-two');
  initYearFilter('dicharts--year-selector');
  initTableThree('dicharts--table-three');
};

export default init;
