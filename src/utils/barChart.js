import { toJS } from 'mobx';
import { filterDataByPurpose, getYearRangeDataAsSum } from './data';

export const extractChartData = (data, purpose, years, valueField, purposeField) => {
  const chartData = toJS(data);
  const filteredData = filterDataByPurpose(chartData, [purpose], purposeField);

  return getYearRangeDataAsSum(filteredData, years, valueField);
};

export const groupAidTypeSums = (chartData) => {
  let chartTotals = {};
  for (let i = 0; i < chartData.length; i++) {
    const chartDataItem = chartData[i];
    for (let k = 0; k < chartData.length; k++) {
      chartTotals[k] = chartTotals[k] ? chartTotals[k] : [];
      chartTotals[k].push(chartDataItem[k]);
    }
  }

  return chartTotals;
};

export const getPercentages = (chartData, groupedSums) => {
  const percentages = Object.keys(groupedSums).map((item) => {
    return { 
      [item]: groupedSums[item].reduce((acc, item) => acc + item, 0)
    };
  });

  return chartData.map((item) => {
    return item.map((arr, index) => {
       return (((percentages[index] ? parseFloat(arr) : 0)/parseFloat(percentages[index] ? percentages[index][index] : 1)))*100; 
    }).filter((percentage) => percentage !== 0);
  });
}
