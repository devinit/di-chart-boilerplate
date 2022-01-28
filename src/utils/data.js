const fetchCSVData = (url) =>
  // eslint-disable-next-line no-undef
  new Promise((resolve) => {
    window.d3.csv(url, (data) => resolve(data));
  });

export const filterDataByCountry = (data, country, countryField) =>
  // eslint-disable-next-line implicit-arrow-linebreak
  data.filter((item) => item[countryField] === country);
export const filterDataByPurpose = (data, purpose, purposeField) =>
  // eslint-disable-next-line implicit-arrow-linebreak
  data.filter((item) => purpose.includes(item[purposeField]));

export const fetchCoreData = () => {
  const crs_data_csv_one =
    'https://raw.githubusercontent.com/devinit/di-chart-boilerplate/page/iati-gates/IATI%20RHFP%20data.csv';
  const crs_data_csv_two =
  'https://raw.githubusercontent.com/devinit/di-chart-boilerplate/page/iati-gates/IATI%20RHFP%20data2.csv';
  if (window.DIState) {
    window.DIState.setState({ country: 'U.S. Agency for International Development' });
    fetchCSVData(crs_data_csv_one).then((data) => {
      window.DIState.setState({ dataOne: data });
    });
    fetchCSVData(crs_data_csv_two).then((data) => {
      window.DIState.setState({ dataTwo: data });
    });
  } else {
    console.log('State is not defined');
  }
};

export default fetchCSVData;
