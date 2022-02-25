import { fetchCoreData } from '../../utils/data';
import { DEFAULT_DONOR } from '../../utils/iati';
import initDonorFilter from './DonorFilter';
import initTableOne from './TableOne';

const init = () => {
  fetchCoreData([
    { url: 'https://raw.githubusercontent.com/devinit/di-website-data/main/2022/IATI-RHFP-data-v1.csv', state: 'dataOne' },
    { url: 'https://raw.githubusercontent.com/devinit/di-website-data/main/2022/IATI-RHFP-data-v2.csv', state: 'dataTwo' },
    { url: 'https://raw.githubusercontent.com/devinit/di-website-data/main/2022/iati_rhfp3.csv', state: 'dataThree' },
    { url: 'https://raw.githubusercontent.com/devinit/di-website-data/main/2022/iati_rhfp4.csv', state: 'dataFour' },
  ], { country: DEFAULT_DONOR });
  initDonorFilter('dicharts--donor-selector')
  initTableOne('dicharts--table-one');
};

export default init;
