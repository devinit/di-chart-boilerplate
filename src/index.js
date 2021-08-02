import 'core-js';
import deepMerge from 'deepmerge';
import defaultOptions from './charts/echarts';
import './styles/styles.css';
import fetchCSVData from './utils/data';
import { addFilter, addFilterWrapper } from './widgets/filters';
import PillWidget from './widgets/pills';
// import d3 from 'd3'; // eslint-disable-line import/no-unresolved

// Your Code Goes Here i.e. functions

const cleanValue = (value) => (value.trim() ? Number(value.replace(',', '').replace(' ', '').replace('%', '').trim()) : null);

const cleanData = (data) => data.map((d) => {
  const clean = { ...d };
  clean.value = cleanValue(d.Value);

  return clean;
});

const processData = (data, years, donor, channel, valueType = 'Proportional') => {
  const filteredData = data.filter((d) => d.Donor.trim() === donor && d['IHA type'] === channel && d['Value type'] === valueType);
  const sortedData = years.map((year) => filteredData.find((d) => d.Year === year));

  return sortedData;
};

const renderDefaultChart = (chart, data, { years, channels }) => {
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
      max: 100,
      axisLabel: { formatter: '{value}%' },
    },
    series: channels.map((channel) => ({
      name: channel,
      data: processData(data, years, 'All donors', channel).map((d) => Number(d.value)),
      type: 'bar',
      stack: 'channels',
      tooltip: {
        trigger: 'item',
        formatter: (params) => {
          const item = data.find((d) => d['IHA type'] === channel && d.Donor === 'All donors' && `${d.Year}` === params.name && d['Value type'] === 'Absolute');

          return `${params.name} <br /> ${channel} <br /> <strong>${params.value}% (US$ ${item.Value} million)</strong>`;
        },
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
          const csv = 'https://raw.githubusercontent.com/devinit/di-chart-boilerplate/gha/2021/donors/public/assets/data/GHA/2021/interactivity-donors.csv';
          fetchCSVData(csv).then((data) => {
            const filterWrapper = addFilterWrapper(chartNode);
            // extract unique values
            const donors = [...new Set(data.map((d) => d.Donor))];
            const years = [...new Set(data.map((d) => d.Year))];
            const channels = [...new Set(data.map((d) => d['IHA type']))];
            // create UI elements
            const countryFilter = addFilter({
              wrapper: filterWrapper,
              options: donors.sort(),
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
                .map((donor) => channels.map((channel, index) => ({
                  name: channel,
                  data: processData(cleanedData, years, donor, channel).map(
                    (d) => Number(d.value),
                  ),
                  type: 'bar',
                  stack: donor,
                  tooltip: {
                    trigger: 'item',
                    formatter: (params) => {
                      const item = cleanedData.find((d) => d['IHA type'] === channel && d.Donor === donor && `${d.Year}` === params.name && d['Value type'] === 'Absolute');
                      const value = item
                        ? `${params.value}% (US$ ${toDollars(cleanValue(item.Value), 'decimal', 'never')} million)`
                        : `${params.value}%`;

                      return `${params.name} - ${donor} <br />${channel} <strong style="padding-left:10px;">${value}</strong>`;
                    },
                  },
                  label: {
                    // only show single label that overlaps the stack
                    show: index === 0 && activeDonors.length > 1,
                    position: 'insideBottom',
                    distance: 15,
                    align: 'left',
                    verticalAlign: 'middle',
                    rotate: 90,
                    formatter: () => `${donor}`,
                    fontSize: 16,
                  },
                })))
                .reduce((final, cur) => final.concat(cur), []);
              chart.setOption({ series }, { replaceMerge: ['series'] });
            };

            const onAdd = (value) => {
              // filter data to return only the selected items
              const filteredData = value !== 'All donors' ? data.filter((d) => pillWidget.pillNames.includes(d.Donor)) : data;
              const selectedDonors = pillWidget.pillNames.length ? pillWidget.pillNames : donors;
              updateChartForDonorSeries(filteredData, selectedDonors);
            };

            /**
              * Event Listeners/Handlers
              * */
            countryFilter.addEventListener('change', (event) => {
              const { value } = event.currentTarget;
              if (value !== 'All donors') {
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
                countryFilter.value = 'All donors'; // reset country filter selected value
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
