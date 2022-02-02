import deepMerge from 'deepmerge';
import defaultOptions from '../charts/echarts';
import { COUNTRY_FIELD, DEFAULT_COUNTRY } from '../utils/constants';
import { filterDataByCountry } from '../utils/data';
// import d3 from 'd3'; // eslint-disable-line import/no-unresolved

// Your Code Goes Here i.e. functions

const renderChart = (chartNode) => {
  // TODO: change code goes here
  const chart = window.echarts.init(chartNode);
  const data = [
    {
      name: 'Grandpa',
      children: [
        {
          name: 'Uncle Leo',
          value: 15,
          children: [
            {
              name: 'Cousin Jack',
              value: 2
            },
            {
              name: 'Cousin Mary',
              value: 5,
              children: [
                {
                  name: 'Jackson',
                  value: 2
                }
              ]
            },
            {
              name: 'Cousin Ben',
              value: 4
            }
          ]
        },
        {
          name: 'Father',
          value: 10,
          children: [
            {
              name: 'Me',
              value: 5
            },
            {
              name: 'Brother Peter',
              value: 1
            }
          ]
        }
      ]
    },
    {
      name: 'Nancy',
      children: [
        {
          name: 'Uncle Nike',
          children: [
            {
              name: 'Cousin Betty',
              value: 1
            },
            {
              name: 'Cousin Jenny',
              value: 2
            }
          ]
        }
      ]
    }
  ];
  const option = {
    xAxis: { show: false },
    yAxis: { show: false },
    series: {
      type: 'sunburst',
      // emphasis: {
      //     focus: 'ancestor'
      // },
      data,
      radius: [0, '90%'],
      label: {
        rotate: 'radial'
      }
    }
  };

  chart.setOption(deepMerge(defaultOptions, option));
};

/**
 * Run your code after the page has loaded
 */
const init = (className) => {
  window.DICharts.handler.addChart({
    className,
    d3: {
      onAdd: (chartNodes) => {
        Array.prototype.forEach.call(chartNodes, (chartNode) => {
          const dichart = new window.DICharts.Chart(chartNode.parentElement);
          dichart.showLoading();

          /**
           * ECharts - prefix all browsers global with window
           * i.e window.echarts - echarts won't work without it
           *
           * const chart = window.echarts.init(chartNode);
           */
          if (window.DIState) {
            window.DIState.addListener(() => {
              dichart.showLoading();
              const state = window.DIState.getState;
              const { country, odaChannels: data } = state;
              if (country && data) {
                // TODO: extract purpose names from the data and use them to create a dropdown - set a default

                const countryData = filterDataByCountry(data, country || DEFAULT_COUNTRY, COUNTRY_FIELD); // TODO: filter by purpose code
                renderChart(chartNode, countryData, country || DEFAULT_COUNTRY);
                dichart.hideLoading();
                // tableNode.parentElement.classList.add('auto-height');
              }
            });
          } else {
            console.log('State is not defined');
          }
        });
      },
    },
  });
};

export default init;
