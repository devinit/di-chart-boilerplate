import deepMerge from 'deepmerge';
import defaultOptions from '../charts/echarts';
import { toJS } from 'mobx';

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

  const groupedFamilyPlanningData = chartData.filter((data) => data.purpose_name === 'Family planning').map((data) => {
    return {
      'year': data.year,
      'value': data.usd_disbursement_deflated
    };
  });

  return groupAndSum(groupedFamilyPlanningData);
};

const extractChartReproductiveHealthData = (data) => {
  const chartData = toJS(data);

  const groupedReproductiveData = chartData.filter((data) => data.purpose_name === 'Reproductive health care').map((data) => {
    return {
      'year': data.year,
      'value': data.usd_disbursement_deflated
    };
  });

  return groupAndSum(groupedReproductiveData);
};

const extractChartYears = (data) => {
  const chartData = toJS(data);

  return chartData.map((data) => data.year).filter((value, index, self) => self.indexOf(value) === index).sort();
};

const renderChart = (chartNode, data) => {
  const chart = window.echarts.init(chartNode);
  const option = {
    legend: { show: true },
    xAxis: {
      type: 'category',
      data: extractChartYears(data),
    },
    yAxis: {
      type: 'value',
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

          dichart.showLoading();
          if (window.DIState) {
            window.DIState.addListener(() => {
              dichart.showLoading();
              const state = window.DIState.getState;
              const { country, dataOne: data } = state;
              if (country && data) {
                console.log(country, data);
                // chart goes here
                renderChart(chartNode, data);

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
