import { fetchCoreData } from '../../utils/data';

const init = () => {
  fetchCoreData([
    { url: 'https://raw.githubusercontent.com/devinit/di-website-data/main/2022/IATI-RHFP-data-v1.csv', state: 'dataOne' },
    { url: 'https://raw.githubusercontent.com/devinit/di-website-data/main/2022/IATI-RHFP-data-v2.csv', state: 'dataTwo' },
    { url: 'https://raw.githubusercontent.com/devinit/di-website-data/main/2022/iati_rhfp3.csv', state: 'dataThree' },
    { url: 'https://raw.githubusercontent.com/devinit/di-website-data/main/2022/iati_rhfp4.csv', state: 'dataFour' },
  ]);
};

export default init;
