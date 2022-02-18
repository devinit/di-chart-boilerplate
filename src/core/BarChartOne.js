import deepMerge from 'deepmerge';
import defaultOptions from '../charts/echarts';
import { extractChartData } from '../utils/chart';
import { COUNTRY_FIELD, PURPOSE_FIELD, PURPOSE_TO_FILTER_BY, YEARS } from '../utils/constants';
import { filterDataByCountry, filterDataByPurpose, formatNumber, getYearsFromRange } from '../utils/data';

const VALUE_FIELD = 'usd_disbursement_deflated_Sum';
const getSeries = (data, years) => {
  return PURPOSE_TO_FILTER_BY.map((purpose) => ({
    name: purpose,
    type: 'bar',
    stack: 'oda',
    tooltip: { valueFormatter: (value) => `US$${formatNumber(value)} million` },
    data: extractChartData(data, purpose, years, VALUE_FIELD, PURPOSE_FIELD),
  })).map((serie, index, series) => {
    if (index === series.length - 1) {
      return {
        ...serie,
        label: {
          normal: {
            show: true,
            position: 'top',
            fontFamily: 'Geomanist Regular,sans-serif',
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
      name: 'US$ millions (constant 2019 prices)',
      nameLocation: 'middle',
      nameGap: 50,
    },
    grid: { top: 60 },
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

          const defaultCountry = 'United States';
          dichart.showLoading();
          if (window.DIState) {
            window.DIState.addListener(() => {
              dichart.showLoading();
              const state = window.DIState.getState;
              const { country, dataOne: data } = state;
              if (country && data) {
                const countryData = filterDataByPurpose(
                  filterDataByCountry(data, country || defaultCountry, COUNTRY_FIELD),
                  PURPOSE_TO_FILTER_BY,
                  PURPOSE_FIELD,
                );
                // chart goes here
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
