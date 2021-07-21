import deepMerge from 'deepmerge';
import defaultOptions from './charts/echarts';
import './styles/styles.css';
import fetchCSVData from './utils/data';
import { addFilter, addFilterWrapper } from './widgets/filters';
import PillWidget from './widgets/pills';
// import d3 from 'd3'; // eslint-disable-line import/no-unresolved

// Your Code Goes Here i.e. functions

const processData = (data) => data;

const renderChart = (chartNode, data) => {
  // append the svg object to the body of the page

  // get the data
  const chart = window.echarts.init(chartNode);
  const option = {
    legend: { show: false },
    yAxis: {
      type: 'category',
      data: processData(data).map((d) => d.Country),
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
    },
    {
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
          const csv = 'https://raw.githubusercontent.com/devinit/di-chart-boilerplate/gha/2021/funding-channels/public/assets/data/GHA/2021/funding-channels-interactive-data.csv';
          // const csv = 'https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/7_OneCatOneNum_header.csv';
          fetchCSVData(csv).then((data) => {
            // const data = [
            //   { Country: 'United States', Value: 12394, Continent: 'North America' },
            //   { Country: 'Russia', Value: 6148, Continent: 'Europe' },
            //   { Country: 'Germany (FRG)', Value: 1653, Continent: 'Europe' },
            //   { Country: 'France', Value: 2162, Continent: 'Europe' },
            //   { Country: 'United Kingdom', Value: 1214, Continent: 'Europe' },
            //   { Country: 'China', Value: 1131, Continent: 'Asia' },
            //   { Country: 'Spain', Value: 814, Continent: 'Europe' },
            //   { Country: 'Netherlands', Value: 1167, Continent: 'Europe' },
            //   { Country: 'Italy', Value: 660, Continent: 'Europe' },
            //   { Country: 'Israel', Value: 1263, Continent: 'Europe' },
            // ];
            const filterWrapper = addFilterWrapper(chartNode);
            const donors = [...new Set(data.map((d) => d.Donor))];
            const countryFilter = addFilter({
              wrapper: filterWrapper,
              options: donors,
              allItemsLabel: 'All Donors',
              className: 'country-filter',
              label: 'Select Donor',
            });
            // const chart = renderChart(chartNode, data);

            // initialise pill widget for the multi-select option
            // const pillWidget = new PillWidget({ wrapper: filterWrapper });
            // if (pillWidget.pills.length) {
            //   chartNode.parentElement.insertBefore(pillWidget.widget, chartNode);
            // }

            // const updateChart = (updatedData) => {
            //   chart.setOption({
            //     yAxis: {
            //       data: updatedData.map((d) => d.Country),
            //     },
            //     series: [
            //       {
            //         // find series by name
            //         name: 'Donor',
            //         data: updatedData.map((d) => d.Value),
            //       },
            //     ],
            //   });
            // };

            // add event listeners
            // countryFilter.addEventListener('change', (event) => {
            //   const { value } = event.currentTarget;
            //   if (value !== '*') {
            //     // if it's the first pill, append pill widget
            //     if (!pillWidget.pillNames.length) {
            //       chartNode.parentElement.insertBefore(pillWidget.widget, chartNode);
            //     }
            //     pillWidget.add(value);
            //   } else {
            //     pillWidget.removeAll();
            //   }
            //   // filter data to return only the selected items
            //   const filteredData = value !== '*' ? data.filter((d) => pillWidget.pillNames.includes(d.Country)) : data;
            //   // update chart
            //   updateChart(filteredData);
            // });

            // pillWidget.onRemove(() => {
            //   updateChart(data.filter((d) => pillWidget.pillNames.includes(d.Country)));
            // });

            // dichart.hideLoading();
          });
        });
      },
    },
  });
});
