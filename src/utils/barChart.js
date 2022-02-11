import { toJS } from 'mobx';
import { filterDataByPurpose, getYearRangeDataAsSum } from './data';

export const extractChartData = (data, purpose, years, valueField, purposeField) => {
  const chartData = toJS(data);
  const filteredData = filterDataByPurpose(chartData, [purpose], purposeField);

  return getYearRangeDataAsSum(filteredData, years, valueField);
};
