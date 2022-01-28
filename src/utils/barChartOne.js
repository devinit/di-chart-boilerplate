import { toJS } from 'mobx';
import { filterDataByPurpose, getYearRangeDataAsSum } from './data';
import { PURPOSE_FIELD, VALUE_FIELD } from './constants';

export const extractChartData = (data, purpose, years) => {
  const chartData = toJS(data);
  const filteredData = filterDataByPurpose(chartData, [purpose], PURPOSE_FIELD);

  return getYearRangeDataAsSum(filteredData, years, VALUE_FIELD);
};
