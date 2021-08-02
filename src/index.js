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
  clean.value = d.Proportion.trim() ? Number(d.Proportion.replace(',', '').replace(' ', '').replace('%', '').trim()) : null;

  return clean;
});

const processData = (data, years, donor, channel) => {
  const filteredData = data.filter((d) => d.Donor.trim() === donor && d['Delivery Channel'] === channel);
  const sortedData = years.map((year) => filteredData.find((d) => d.Year === year));

  return sortedData;
};

const processChannelData = (data, years, channel) => {
  const channelData = data.filter((d) => d['Delivery Channel'] === channel && d.Donor !== 'EU Institutions');
  const chartData = years.reduce((values, year) => {
    const yearData = channelData.filter((d) => d.Year === year);
    const value = yearData.reduce((sum, item) => sum + Number(item.value || 0), 0);

    return values.concat(value);
  }, []);

  return chartData;
};

const calculatePercentage = (data, channelData, index) => {
  const sum = channelData.reduce((_sum, seriesData) => _sum + seriesData[index], 0);

  return ((data / sum) * 100).toFixed(2);
};

const renderDefaultChart = (chart, data, { years, channels }) => {
  const channelData = channels.map((channel) => processChannelData(data, years, channel));
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
      name: 'US$ millions',
      nameLocation: 'middle',
      nameGap: 40,
      nameTextStyle: { fontSize: 14 },
      max: 100,
      axisLabel: { formatter: '{value}%' },
    },
    series: channels.map((channel, index) => ({
      name: channel,
      data: channelData[index].map((d, idx) => calculatePercentage(d, channelData, idx)),
      type: 'bar',
      stack: 'channels',
      emphasis: { focus: 'series' },
      tooltip: {
        trigger: 'item',
        formatter: (params) => `${params.name} <br /> ${channel} <br /> <strong>${params.value}%</strong>`,
      },
    })),
  };
  chart.setOption(deepMerge(defaultOptions, option), { replaceMerge: ['series'] });

  return chart;
};

const toDollars = (value, style = 'currency', signDisplay = 'auto') => {
  const formatter = new Intl.NumberFormat('en-US', { style, currency: 'USD', signDisplay });

  return formatter.format(value);
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
            const chart = window.echarts.init(chartNode);
            renderDefaultChart(chart, cleanData(data), { years, channels });

            // initialise pill widget for the multi-select option
            const pillWidget = new PillWidget({ wrapper: filterWrapper });
            if (pillWidget.pills.length) {
              chartNode.parentElement.insertBefore(pillWidget.widget, chartNode);
            }

            const updateChartForDonorSeries = (updatedData, activeDonors) => {
              const cleanedData = cleanData(updatedData);
              const series = activeDonors
                .map((donor) => channels.map((channel) => ({
                  name: channel,
                  data: processData(cleanedData, years, donor, channel).map(
                    (d) => Number(d.value),
                  ),
                  type: 'bar',
                  stack: donor,
                  emphasis: { focus: 'series' },
                  tooltip: {
                    trigger: 'item',
                    formatter: (params) => {
                      const item = cleanedData.find((d) => d['Delivery Channel'] === channel && d.Donor === donor && `${d.Year}` === params.name);
                      const value = item
                        ? `${item.value}% (${toDollars(item['USD deflated'], 'decimal', 'never')})`
                        : `${item.value}%`;

                      return `${params.name} - ${donor} <br />${channel} <strong style="padding-left:10px;">${value}</strong>`;
                    },
                  },
                })))
                .reduce((final, cur) => final.concat(cur), []);
              chart.setOption({ series }, { replaceMerge: ['series'] });
            };

            const onAdd = (value) => {
              // filter data to return only the selected items
              const filteredData = value !== '*' ? data.filter((d) => pillWidget.pillNames.includes(d.Donor)) : data;
              const selectedDonors = pillWidget.pillNames.length ? pillWidget.pillNames : donors;
              updateChartForDonorSeries(filteredData, selectedDonors);
            };

            /**
              * Event Listeners/Handlers
              * */
            countryFilter.addEventListener('change', (event) => {
              const { value } = event.currentTarget;
              if (value !== '*') {
                // if it's the first pill, append pill widget
                if (!pillWidget.pillNames.length) {
                  chartNode.parentElement.insertBefore(pillWidget.widget, chartNode);
                } else {
                  countryFilter.disabled = true; // ensure that only 2 countries can be selected
                }
                pillWidget.add(value);
              } else {
                pillWidget.removeAll();
              }
            });

            pillWidget.onAdd(onAdd);

            pillWidget.onRemove(() => {
              const hasPills = !!pillWidget.pillNames.length;
              if (hasPills) {
                const filteredData = data.filter((d) => pillWidget.pillNames.includes(d.Donor));
                updateChartForDonorSeries(filteredData, pillWidget.pillNames);
                countryFilter.disabled = false; // enable to select more donors
              } else {
                countryFilter.value = '*'; // reset country filter selected value
                renderDefaultChart(chart, cleanData(data), { years, channels });
              }
            });

            dichart.hideLoading();
          });
        });
      },
    },
  });
});
