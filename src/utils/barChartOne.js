import { toJS } from 'mobx';
import { filterDataByPurpose, getYearRangeData } from './data';
import { PURPOSE_FIELD, CHANNEL_VALUE_FIELD } from './constants';

export const extractChartData = (data, purpose, years) => {
  const chartData = toJS(data);
  const filteredData = filterDataByPurpose(chartData, [purpose], PURPOSE_FIELD);

  return getYearRangeData(filteredData, years, CHANNEL_VALUE_FIELD);
};
