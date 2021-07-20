import deepMerge from 'deepmerge';
import './styles/styles.css';
import fetchCSVData from './utils/data';
import { addFilterWrapper, addFilter } from './widgets/filters';
import defaultOptions from './charts/echarts';
// import d3 from 'd3'; // eslint-disable-line import/no-unresolved

// Your Code Goes Here i.e. functions

const renderChart = (chartNode, data) => {
  // append the svg object to the body of the page

  // get the data
  const chart = window.echarts.init(chartNode);
  const option = {
    yAxis: {
      type: 'category',
      data: data.map((d) => d.Country),
    },
    xAxis: {
      type: 'value',
    },
    series: [{
      name: 'Countries',
      data: data.map((d) => Number(d.Value)),
      type: 'bar',
      showBackground: true,
      backgroundStyle: {
        color: 'rgba(180, 180, 180, 0.2)',
      },
    }],
  };
  chart.setOption(deepMerge(defaultOptions, option));

  return chart;
};
/**
 * Run your code after the page has loaded
 */
window.addEventListener('load', () => {
  window.DICharts.handler.addChart({
    className: 'dicharts--boilerplate-chart',
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
          const csv = 'https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/7_OneCatOneNum_header.csv';
          fetchCSVData(csv).then((data) => {
            const filterWrapper = addFilterWrapper(chartNode);
            const countryFilter = addFilter({
              wrapper: filterWrapper,
              options: data.map((d) => d.Country),
              allItemsLabel: 'All Countries',
              className: 'country-filter',
              label: 'Select Country',
            });
            const chart = renderChart(chartNode, data);

            countryFilter.addEventListener('change', (event) => {
              const { value } = event.currentTarget;
              chart.setOption({
                yAxis: {
                  data:
                    value !== '*'
                      ? data
                        .filter((d) => d.Country === value)
                        .map((d) => d.Country)
                      : data.map((d) => d.Country),
                },
                series: [
                  {
                    // find series by name
                    name: 'Countries',
                    data:
                      value !== '*'
                        ? data
                          .filter((d) => d.Country === value)
                          .map((d) => d.Value)
                        : data.map((d) => d.Value),
                  },
                ],
              });
            });
            dichart.hideLoading();
          });
        });
      },
    },
  });
});
