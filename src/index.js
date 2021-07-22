import deepMerge from 'deepmerge';
import defaultOptions from './charts/echarts';
import './styles/styles.css';
import fetchCSVData from './utils/data';
import { addFilter, addFilterWrapper } from './widgets/filters';
import PillWidget from './widgets/pills';
// import d3 from 'd3'; // eslint-disable-line import/no-unresolved

// Your Code Goes Here i.e. functions

const cleanData = (data) => data.map((d) => {
  const clean = { ...d };
  clean.value = d['USD deflated'].trim() ? Number(d['USD deflated'].replace(',', '').replace(' ', '').trim()) : null;

  return clean;
});

const processData = (data, years, donor, channel) => {
  const filteredData = data.filter((d) => d.Donor.trim() === donor && d['Delivery Channel'] === channel);
  const sortedData = years.map((year) => filteredData.find((d) => d.Year === year));

  return sortedData;
};

const renderChart = (chartNode, data, { donors, years, channels }) => {
  const chart = window.echarts.init(chartNode);
  const option = {
    legend: { show: false },
    xAxis: {
      type: 'category',
      data: years,
    },
    yAxis: {
      type: 'value',
    },
    series: donors.filter((donor) => donor !== 'EU Institutions').map((donor) => ({
      name: donor,
      data: processData(data, years, donor, channels[0]).map((d) => Number(d.value)),
      type: 'bar',
      stack: channels[0],
      emphasis: {
        focus: 'series',
      },
    })),
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
          fetchCSVData(csv).then((data) => {
            const filterWrapper = addFilterWrapper(chartNode);
            // extract unique values
            const donors = [...new Set(data.map((d) => d.Donor))];
            const years = [...new Set(data.map((d) => d.Year))];
            const channels = [...new Set(data.map((d) => d['Delivery Channel']))];
            // create UI elements
            const countryFilter = addFilter({
              wrapper: filterWrapper,
              options: donors,
              allItemsLabel: 'All Donors',
              className: 'country-filter',
              label: 'Select Donor',
            });
            const channelFilter = addFilter({
              wrapper: filterWrapper,
              options: channels,
              className: 'channel-filter',
              label: 'Channel',
            });
            const chart = renderChart(chartNode, cleanData(data), { donors, years, channels });
            let activeChannel = channels[0];

            // initialise pill widget for the multi-select option
            const pillWidget = new PillWidget({
              wrapper: filterWrapper,
              colours: chart.getOption().color,
            });
            if (pillWidget.pills.length) {
              chartNode.parentElement.insertBefore(pillWidget.widget, chartNode);
            }

            const updateChart = (updatedData, activeDonors, channel) => {
              const cleanedData = cleanData(updatedData);
              chart.setOption({
                series: activeDonors
                  .map((donor) => ({
                    name: donor,
                    data: processData(
                      cleanedData,
                      years,
                      donor,
                      channel,
                    ).map((d) => Number(d.value)),
                    type: 'bar',
                    stack: channel,
                    emphasis: { focus: 'series' },
                  })),
              }, { replaceMerge: ['series'] });
            };

            // add event listeners
            countryFilter.addEventListener('change', (event) => {
              const { value } = event.currentTarget;
              if (value !== '*') {
                // if it's the first pill, append pill widget
                if (!pillWidget.pillNames.length) {
                  chartNode.parentElement.insertBefore(pillWidget.widget, chartNode);
                }
                pillWidget.add(value);
              } else {
                pillWidget.removeAll();
              }
              // filter data to return only the selected items
              const filteredData = value !== '*' ? data.filter((d) => pillWidget.pillNames.includes(d.Donor)) : data;
              // update chart
              updateChart(filteredData, pillWidget.pillNames, activeChannel);
            });

            pillWidget.onRemove(() => {
              updateChart(
                pillWidget.pillNames.length
                  ? data.filter((d) => pillWidget.pillNames.includes(d.Donor))
                  : data,
                pillWidget.pillNames.length ? pillWidget.pillNames : donors,
                activeChannel,
              );
            });

            channelFilter.addEventListener('change', (event) => {
              const { value: channel } = event.currentTarget;
              activeChannel = channel;
              updateChart(
                data,
                pillWidget.pillNames.length ? pillWidget.pillNames : donors,
                activeChannel,
              );
            });

            dichart.hideLoading();
          });
        });
      },
    },
  });
});
