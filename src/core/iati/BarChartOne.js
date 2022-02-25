import deepMerge from 'deepmerge';
import { toJS } from 'mobx';
import defaultOptions from '../../charts/echarts';
import { COUNTRY_FIELD, DEFAULT_DONOR, PURPOSE_FIELD, PURPOSE_TO_FILTER_BY, YEARS } from '../../utils/iati';
import { filterDataByDonor, filterDataByPurpose, formatNumber, getYearsFromRange } from '../../utils/data';

const groupAndSum = (list) => {
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

const extractChartData = (data, dataType) => {
  const chartData = toJS(data);
  const filteredData = chartData
    .filter((data) => data.purpose_name === dataType && data.year >= 2019 && data.year <= 2021)
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
    .filter((data) => data.year >= 2019 && data.year <= 2021)
    .map((data) => data.year)
    .filter((value, index, self) => self.indexOf(value) === index)
    .sort();
};

const getSeries = (data, years) => {
  return PURPOSE_TO_FILTER_BY.map((purpose) => ({
    name: purpose,
    type: 'bar',
    stack: 'oda',
    data: extractChartData(data, purpose, years),
  })).map((serie, index, series) => {
    if (index === series.length - 1) {
      return {
        ...serie,
        label: {
          normal: {
            show: true,
            position: 'top',
            formatter: (params) => {
              const total = series.reduce((total, s) => {
                const datum = s.data[params.dataIndex];

                return total + parseFloat(datum ? datum : 0);
              }, 0);

              return formatNumber(total);
            },
            color: '#000000',
          },
        },
      };
    }

    return serie;
  });
};

const renderChart = (chartNode, data) => {
  const chart = window.echarts.init(chartNode);
  const years = getYearsFromRange(YEARS);
  const option = {
    legend: { show: true, selectedMode: false },
    xAxis: {
      type: 'category',
      data: years,
    },
    yAxis: {
      type: 'value',
      name: 'USD$ millions (constant 2019 prices)',
      nameLocation: 'middle',
      nameGap: 50,
    },
    grid: {
      top: 60,
    },
    series: getSeries(data, years),
  };

  chart.setOption(deepMerge(defaultOptions, option));
};

const init = (className) => {
  window.DICharts.handler.addChart({
    className,
    echarts: {
      onAdd: (chartNodes) => {
        Array.prototype.forEach.call(chartNodes, (chartNode) => {
          const dichart = new window.DICharts.Chart(chartNode.parentElement);

          const defaultCountry = DEFAULT_DONOR;
          dichart.showLoading();
          if (window.DIState) {
            window.DIState.addListener(() => {
              dichart.showLoading();
              const state = window.DIState.getState;
              const { country, dataOne: data } = state;
              if (country && data) {
                const countryData = filterDataByPurpose(
                  filterDataByDonor(data, country || defaultCountry, COUNTRY_FIELD),
                  PURPOSE_TO_FILTER_BY,
                  PURPOSE_FIELD,
                );
                renderChart(chartNode, countryData);

                dichart.hideLoading();
              }
            });
          } else {
            console.log('State is not defined');
            dichart.hideLoading();
          }
        });
      },
    },
  });
};

export default init;
