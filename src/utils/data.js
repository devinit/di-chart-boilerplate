import { parse } from 'papaparse';

export const formatNumber = (value) => Number(value.toFixed(2));

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
export const extractPurposeCodes = (data, purposeField) =>
  data.reduce((codes, prev) => {
    const value = prev[purposeField];

    return !codes.includes(value) ? codes.concat(value) : codes;
  }, []);

export const fetchCoreData = () => {
  const crsDataOneUrl = 'https://staging-ddw.devinit.org/api/dataset/data/1241/';
  const crsDataCsvTwo = 'https://raw.githubusercontent.com/devinit/di-website-data/main/2022/donor-by-recip-2019.csv';
  const odaAidTypeUrl = 'https://staging-ddw.devinit.org/api/dataset/data/1238/';
  const odaChannelsUrl = 'https://staging-ddw.devinit.org/api/dataset/data/1237/';
  if (window.DIState) {
    window.DIState.setState({ country: 'United States' });
    window
      .fetch(crsDataOneUrl)
      .then((response) => response.json())
      .then((data) => {
        window.DIState.setState({ dataOne: data.results || [] });
      });
    fetchCSVData(crsDataCsvTwo).then((data) => {
      window.DIState.setState({ dataTwo: data });
    });
    window
      .fetch(odaAidTypeUrl)
      .then((response) => response.json())
      .then((data) => {
        window.DIState.setState({ odaAidType: data.results || [] });
      });
    window
      .fetch(odaChannelsUrl)
      .then((response) => response.json())
      .then((data) => {
        window.DIState.setState({ odaChannels: data.results || [] });
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
};

export const getYearRangeDataAsSum = (data, yearRange, valueField) => {
  return yearRange.reduce((row, column) => {
    const yearData = data.filter((d) => {
      return parseInt(d.year) === parseInt(column);
    });
    const sum = yearData.reduce((_sum, prev) => formatNumber(_sum + formatNumber(Number(prev[valueField]) || 0)), 0);

    return row.concat(sum);
  }, []);
};

export const getYearRangeData = (data, yearRange, valueField) => {
  return yearRange.map((year) => {
    const yearValue = data.find((item) => item.year === year);

    return yearValue ? formatNumber(yearValue[valueField]) : 0;
  });
};

export default fetchCSVData;
