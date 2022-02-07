import { toJS } from 'mobx';
import { filterDataByPurpose, getYearRangeDataAsSum } from './data';

export const extractChartData = (data, purpose, years, valueField, purposeField) => {
  const chartData = toJS(data);
  const filteredData = filterDataByPurpose(chartData, [purpose], purposeField);

  return getYearRangeDataAsSum(filteredData, years, valueField);
};

export const getChartPercentages = (data, purpose, years, valueField, purposeField) => {
  const yearRangeDataSums = extractChartData(data, purpose, years, valueField, purposeField);
  const total = yearRangeDataSums.reduce((acc, item) => item + acc, 0);
  const percentages = [];
  for (let i = 0; i < yearRangeDataSums.length; i++) {
    percentages.push(Math.round((yearRangeDataSums[i]/total)*100));
  }

  return percentages;
};
