import 'core-js';
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
  /**
   * TODO: follow the steps below
   * 1. Remove filter by channels
   * 2. If no donor is provided, go to 3
   * 3. To generate sorted data by year, aggregate data for the year & channel
   * 4. If donor is provided, aggregate donor data to return single value for the year & channel
   *  */
  const filteredData = data.filter((d) => d.Donor.trim() === donor && d['Delivery Channel'] === channel);
  const sortedData = years.map((year) => filteredData.find((d) => d.Year === year));

  return sortedData;
};

const renderChart = (chartNode, data, { donors, years, channels }) => {
  const chart = window.echarts.init(chartNode);
  const option = {
    legend: {
      show: true,
      top: 'bottom',
      padding: [5, 10, 15, 10],
    },
    grid: { bottom: '10%' },
    xAxis: {
      type: 'category',
      data: years,
    },
    yAxis: {
      type: 'value',
    },
    // TODO: use channels as the base for series creation instead of donors
    series: channels.map((channel) => ({
      name: channel,
      data: processData(data, years, donors[0], channel).map((d) => Number(d.value)),
      type: 'bar',
      stack: 'channels',
      emphasis: { focus: 'series' },
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
            let activeChannel = '*';
            const chart = renderChart(chartNode, cleanData(data), { donors, years, channels });

            // initialise pill widget for the multi-select option
            // const pillWidget = new PillWidget({
            //   wrapper: filterWrapper,
            //   colours: chart.getOption().color,
            // });
            // if (pillWidget.pills.length) {
            //   chartNode.parentElement.insertBefore(pillWidget.widget, chartNode);
            // }

            // const updateChartForDonorSeries = (updatedData, activeDonors, channel) => {
            //   const cleanedData = cleanData(updatedData);
            //   chart.setOption({
            //     legend: { show: false },
            //     series: activeDonors
            //       .map((donor) => ({
            //         name: donor,
            //         data: processData(
            //           cleanedData,
            //           years,
            //           donor,
            //           channel,
            //         ).map((d) => Number(d.value)),
            //         type: 'bar',
            //         stack: channel,
            //         emphasis: { focus: 'series' },
            //       })),
            //   }, { replaceMerge: ['series'] });
            // };

            // const updateChartForChannelSeries = (updatedData, donor) => {
            //   const cleanedData = cleanData(updatedData);
            //   chart.setOption({
            //     legend: { show: true },
            //     series: channels.map((channel) => ({
            //       name: channel,
            //       data: processData(cleanedData, years, donor, channel).map(
            //         (d) => Number(d.value),
            //       ),
            //       type: 'bar',
            //       stack: donor,
            //       emphasis: { focus: 'series' },
            //     })),
            //   }, { replaceMerge: ['series'] });
            // };

            // const onAdd = (value) => {
            //   // filter data to return only the selected items
            //   if (activeChannel === '*') {
            //     const activeDonor = value !== '*' ? value : donors[0];
            //     const filteredData = data.filter((d) => d.Donor === activeDonor);
            //     updateChartForChannelSeries(filteredData, activeDonor);
            //     if (value === '*') {
            //       countryFilter.value = activeDonor;
            //     }

            //     return;
            //   }
            //   const filteredData = value !== '*' ? data.filter((d) => pillWidget.pillNames.includes(d.Donor)) : data;
            //   const selectedDonors = pillWidget.pillNames.length ? pillWidget.pillNames : donors;
            //   updateChartForDonorSeries(filteredData, selectedDonors, activeChannel);
            // };

            // /**
            //  * Event Listeners/Handlers
            //  * */
            // countryFilter.addEventListener('change', (event) => {
            //   const { value } = event.currentTarget;
            //   if (value !== '*') {
            //     // if it's the first pill, append pill widget
            //     if (!pillWidget.pillNames.length) {
            //       chartNode.parentElement.insertBefore(pillWidget.widget, chartNode);
            //     }
            //     if (activeChannel === '*') {
            //       pillWidget.removeAll();
            //       onAdd(value);

            //       return;
            //     }
            //     pillWidget.add(value);
            //   } else {
            //     if (activeChannel === '*') {
            //       const [firstChannel] = channels;
            //       activeChannel = firstChannel;
            //     }
            //     pillWidget.removeAll();
            //   }
            // });

            // pillWidget.onAdd(onAdd);

            // pillWidget.onRemove(() => {
            //   const hasPills = !!pillWidget.pillNames.length;
            //   const filteredData = hasPills
            //     ? data.filter((d) => pillWidget.pillNames.includes(d.Donor))
            //     : data;
            //   if (activeChannel === '*') {
            //     updateChartForChannelSeries(filteredData, pillWidget.pillNames[0] || donors[0]);

            //     return;
            //   }
            //   const selectedDonors = hasPills ? pillWidget.pillNames : donors;
            //   updateChartForDonorSeries(filteredData, selectedDonors, activeChannel);
            // });

            dichart.hideLoading();
          });
        });
      },
    },
  });
});
