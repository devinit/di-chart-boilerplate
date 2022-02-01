export const formatNumber = (value) => Number(value.toFixed(2));

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
    'https://raw.githubusercontent.com/devinit/di-website-data/main/2022/RH-and-FP-CRS-Data-2019.csv';
  const crs_data_csv_two =
    'https://raw.githubusercontent.com/devinit/di-website-data/main/2022/donor-by-recip-2019.csv';
  const oda_aid_type_url = 'https://staging-ddw.devinit.org/api/dataset/data/1238/';
  if (window.DIState) {
    window.DIState.setState({ country: 'United States' });
    fetchCSVData(crs_data_csv_one).then((data) => {
      window.DIState.setState({ dataOne: data });
    });
    fetchCSVData(crs_data_csv_two).then((data) => {
      window.DIState.setState({ dataTwo: data });
    });
    window.fetch(oda_aid_type_url)
      .then((response) => response.json())
      .then((data) => {
        window.DIState.setState({ odaAidType: data.results || [] });
      });

  } else {
    console.log('State is not defined');
  }
};

export const getYearsFromRange = (range) => {
  const yearDiff = range[1] - range[0] + 1;
  const count = [];
  for (const key of Array(yearDiff).keys()) {
    count.push(key);
  }

  return count.map((key) => range[0] + key);
}

export const getYearRangeDataAsSum = (data, yearRange, valueField) => {
  return yearRange.reduce((row, column) => {
    const yearData = data.filter((d) => d.year === `${column}`);
    const sum = yearData.reduce((_sum, prev) => formatNumber(_sum + formatNumber(Number(prev[valueField]) || 0)), 0);

    return row.concat(sum);
  }, []);
}

export default fetchCSVData;
