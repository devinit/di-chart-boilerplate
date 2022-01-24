import deepMerge from 'deepmerge';
import defaultOptions from '../charts/echarts';
import { COUNTRY_FIELD, PURPOSE_FIELD, PURPOSE_TO_FILTER_BY } from '../utils/constants';
import { filterDataByCountry, filterDataByPurpose } from '../utils/data';
import { toJS } from 'mobx';

let chart;

const groupAndSum = (list) => {
  const existingItems = {};
  list.forEach((item) => {
    if (!existingItems[item.year]) {
      existingItems[item.year] = item;

      return;
    }
    existingItems[item.year] = {
      ...existingItems[item.year],
      value: (parseFloat( item.value ? item.value : 0) + parseFloat(existingItems[item.year].value ? existingItems[item.year].value : 0)).toFixed(3),
    }
  });
  
  return Object.values(existingItems).map((item)=> item.value);
};

const extractChartFamilyPlanningData = (data) => {
  const chartData = toJS(data);
  const groupedFamilyPlanningData = chartData.filter((data) => data.purpose_name === 'Family planning' && data.year >= 2010).map((data) => {
    return {
      'year': data.year,
      'value': data.usd_disbursement_deflated
    };
  });

  return groupAndSum(groupedFamilyPlanningData);
};

const extractChartReproductiveHealthData = (data) => {
  const chartData = toJS(data);
  const groupedReproductiveData = chartData.filter((data) => data.purpose_name === 'Reproductive health care' && data.year >= 2010).map((data) => {
    return {
      'year': data.year,
      'value': data.usd_disbursement_deflated
    };
  });

  return groupAndSum(groupedReproductiveData);
};

const extractChartYears = (data) => {
  const chartData = toJS(data);

  return chartData.filter((data) => data.year >= 2010).map((data) => data.year).filter((value, index, self) => self.indexOf(value) === index).sort();
};

const renderChart = (chartNode, data) => {
  chart = chart ? chart : window.echarts.init(chartNode);
  const option = {
    legend: { show: true },
    xAxis: {
      type: 'category',
      data: extractChartYears(data),
    },
    yAxis: {
      type: 'value',
      name: "USD$ millions (constant 2019 prices)",
      nameLocation: "middle",
      nameGap: 50

    },
    series: [
      {
        name: 'Family planning',
        type: 'bar',
        stack: 'oda',
        data: extractChartFamilyPlanningData(data)
      },
      {
        name: 'Reproductive Health Care',
        type: 'bar',
        stack: 'oda',
        data: extractChartReproductiveHealthData(data)
      },
    ],
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
          // dichart.showLoading();

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
              const { country, dataOne: data } = state;
              if (country && data) {
                const countryData = filterDataByPurpose(
                  filterDataByCountry(data, country || defaultCountry, COUNTRY_FIELD),
                  PURPOSE_TO_FILTER_BY,
                  PURPOSE_FIELD,
                );
                console.log(countryData);
                // chart goes here
                renderChart(chartNode, countryData);
                // extractChartFamilyPlanningData(data);

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
