import { parse } from 'papaparse';
import { DEFAULT_DONOR } from "./constants";

export const formatNumber = (value, defaultForNan = '') => {
  const formattedNumber = Number(Number(value).toFixed(2));

  return isNaN(formattedNumber) ? defaultForNan : formattedNumber;
}

const fetchCSVData = (url) =>
  // eslint-disable-next-line no-undef
  new Promise((resolve) => {
    parse(url, {
      download: true,
      header: true,
      complete: ({ data }) => resolve(data),
    });
  });


export const filterDataByCountry = (data, country, countryField) =>
  // eslint-disable-next-line implicit-arrow-linebreak
  data.filter((item) => item[countryField] === country);
export const filterDataByPurpose = (data, purpose, purposeField) =>
  // eslint-disable-next-line implicit-arrow-linebreak
  data.filter((item) => purpose.includes(item[purposeField]));

export const fetchCoreData = () => {
  const dataOneUrl =
    'https://raw.githubusercontent.com/devinit/di-website-data/main/2022/IATI-RHFP-data-v1.csv';
  const dataTwoUrl =
  'https://raw.githubusercontent.com/devinit/di-website-data/main/2022/IATI-RHFP-data-v2.csv';
  if (window.DIState) {
    window.DIState.setState({ country: DEFAULT_DONOR });
    fetchCSVData(dataOneUrl).then((data) => {
      window.DIState.setState({ dataOne: data });
    });
    fetchCSVData(dataTwoUrl).then((data) => {
      window.DIState.setState({ dataTwo: data });
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
