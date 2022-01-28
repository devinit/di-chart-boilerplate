import { toJS } from 'mobx';

export const groupAndSum = (list) => {
  const existingItems = {};
  list.forEach((item) => {
    if (!existingItems[item.year]) {
      existingItems[item.year] = item;

      return;
    }
    existingItems[item.year] = {
      ...existingItems[item.year],
      value: (
        parseFloat(item.value ? item.value : 0) +
        parseFloat(existingItems[item.year].value ? existingItems[item.year].value : 0)
      ).toFixed(3),
    };
  });

  return Object.values(existingItems).map((item) => item.value);
};

export const extractChartData = (data, dataType) => {
  const chartData = toJS(data);
  const filteredData = chartData
    .filter((data) => data.purpose_name === dataType && data.year >= 2019 && data.year >= 2021)
    .map((data) => {
      return {
        year: data.year,
        value: data.x_transaction_value_usd_m_Sum,
      };
    });

  return groupAndSum(filteredData);
};

export const extractChartYears = (data) => {
  const chartData = toJS(data);

  return chartData
    .filter((data) => data.year >= 2019 && data.year >= 2021)
    .map((data) => data.year)
    .filter((value, index, self) => self.indexOf(value) === index)
    .sort();
};
