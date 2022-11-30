import { parse } from 'papaparse';

export const ACTIVE_BRANCH = 'main';

const fetchCSVData = (url) =>
  new Promise((resolve) => {
    parse(url, {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: ({ data }) => resolve(data),
    });
  });

export const formatNumber = (value, defaultForNan = '') => {
  const formattedNumber = Number(value);

  if (Number.isNaN(formattedNumber)) {
    return defaultForNan;
  }

  return new Intl.NumberFormat('en-IN', { maximumFractionDigits: 2 }).format(formattedNumber);
};

export const parseValuesToNumbers = (data, valueField) =>
  data.map((item) => ({
    ...item,
    [valueField]: item[valueField] ? Number(item[valueField]) : 'NA',
  }));

export default fetchCSVData;
