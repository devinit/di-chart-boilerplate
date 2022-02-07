import deepMerge from 'deepmerge';
import defaultOptions from '../charts/echarts';
import { AIDTYPE_PURPOSE_FIELD, AIDTYPE_VALUE_FIELD, COUNTRY_FIELD } from '../utils/constants';
import { filterDataByCountry, getYearsFromRange } from '../utils/data';
import { getChartPercentages } from '../utils/barChart';

const getSeries = (data, years) => {

  return data.reduce((acc, item)=> {
      if(!acc.includes(item.aid_type_di_name)) {
        acc.push(item.aid_type_di_name);
      }

      return acc;
    },[]).map((barChartCategory) => ({
    name: barChartCategory,
    type: 'bar',
    stack: 'oda',
    data: getChartPercentages(data, barChartCategory, years, AIDTYPE_VALUE_FIELD, AIDTYPE_PURPOSE_FIELD),
  }));
};

const renderChart = (chartNode, data) => {
  const chart = window.echarts.init(chartNode);
  const years = getYearsFromRange([2015, 2019]);
  const option = {
    legend: { show: true, selectedMode: false },
    xAxis: {
      type: 'category',
      data: years,
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: "{value} %"
      }
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

          /**
           * ECharts - prefix all browsers global with window
           * i.e window.echarts - echarts won't work without it
           *
           * const chart = window.echarts.init(chartNode);
           */

          const defaultCountry = 'United States';
          dichart.showLoading();
          if (window.DIState) {
            window.DIState.addListener(() => {
              dichart.showLoading();
              const state = window.DIState.getState;
              const { country, odaAidType: data } = state;
              if (country && data) {
                const countryData = filterDataByCountry(data, country || defaultCountry, COUNTRY_FIELD);
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
