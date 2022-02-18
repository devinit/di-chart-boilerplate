import { filterDataByPurpose, getYearRangeDataAsSum } from './data';

export const extractChartData = (data, purpose, years, valueField, purposeField) => {
  const filteredData = filterDataByPurpose(data, [purpose], purposeField);

  return getYearRangeDataAsSum(filteredData, years, valueField);
};
