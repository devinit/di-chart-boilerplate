import '../../styles/iati.css';
import { fetchCoreData } from '../../utils/data';
import { DEFAULT_DONOR } from '../../utils/iati';
import initBarChartOne from './BarChartOne';
import initBarChartTwo from './BarChartTwo';
import initDonorFilter from './DonorFilter';
import initTableOne from './TableOne';
import initIATIAidTable from './TableThree';
import initTableTwo from './TableTwo';


const init = () => {
  fetchCoreData([
    { url: 'https://raw.githubusercontent.com/devinit/di-website-data/main/2022/IATI-RHFP-data-v1.csv', state: 'dataOne' },
    { url: 'https://raw.githubusercontent.com/devinit/di-website-data/main/2022/IATI-RHFP-data-v2.csv', state: 'dataTwo' },
    { url: 'https://raw.githubusercontent.com/devinit/di-website-data/main/2022/iati_rhfp3.csv', state: 'dataThree' },
    { url: 'https://raw.githubusercontent.com/devinit/di-website-data/main/2022/iati_rhfp4.csv', state: 'dataFour' },
  ], { country: DEFAULT_DONOR });
  initDonorFilter('dicharts--donor-selector')
  initTableOne('dicharts--table-one');
  initBarChartOne('dicharts--chart-one');
  initTableTwo('dicharts--table-two');
  initIATIAidTable('dicharts--table-three');
  initBarChartTwo('dicharts--chart-two');
  // initIATIChannelsTable('dicharts--iati-channels-table');
  // initIATIChannelsChart('dicharts--iati-channels-chart');
};

export default init;