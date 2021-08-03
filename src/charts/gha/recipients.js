import deepMerge from 'deepmerge';
import defaultOptions from '../echarts';
import fetchCSVData from '../../utils/data';
import { addFilter, addFilterWrapper } from '../../widgets/filters';
// import d3 from 'd3'; // eslint-disable-line import/no-unresolved

// Your Code Goes Here i.e. functions

const cleanValue = (value) => (value.trim() ? Number(value.replace(',', '').replace(' ', '').replace('%', '').trim()) : null);

const cleanData = (data, field = 'Value') => data.map((d) => {
  const clean = { ...d };
  clean.value = cleanValue(d[field]);

  return clean;
});

const processData = (data, years, recipient, donor) => {
  const filteredData = data.filter((d) => d['Destination country'].trim() === recipient && d['Donor organisation'] === donor);
  const sortedData = years.map((year) => filteredData.find((d) => d.Year === year) || null);

  return sortedData;
};

const getRecipientDonors = (data, recipient) => {
  const preApprovedDonors = ['All other donors'];
  const recipientData = data.filter((d) => d['Destination country'].trim() === recipient);
  const donors = [...new Set(recipientData.map((d) => d['Donor organisation']))].filter((d) => !preApprovedDonors.includes(d)).slice(0, 5);

  return donors.concat(preApprovedDonors);
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
    },
    series: channels.map((channel) => ({
      name: channel,
      data: processData(data, years, 'All Recipient Countries', channel).map((d) => d && Number(d.value)),
      type: 'bar',
      stack: 'channels',
      tooltip: {
        // TODO: remove this if not needed
        trigger: 'axis',
        formatter: (params) => {
          const item = data.find((d) => d['Donor organisation'] === channel && d['Destination country'] === 'All Recipient Countries' && `${d.Year}` === params.name);

          return `${params.name} <br /> ${channel} <br /> <strong>${params.value}% (US$ ${item['USD deflated millions']} million)</strong>`;
        },
      },
    })),
  };
  chart.setOption(deepMerge(defaultOptions, option), { replaceMerge: ['series'] });

  return chart;
};

/**
 * Run your code after the page has loaded
 */
const renderRecipientChart = () => {
  window.DICharts.handler.addChart({
    className: 'dicharts--gha-recipients',
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
          const csv = 'https://raw.githubusercontent.com/devinit/di-chart-boilerplate/gha/2021/charts/public/assets/data/GHA/2021/recipients-by-donor.csv';
          fetchCSVData(csv).then((data) => {
            const filterWrapper = addFilterWrapper(chartNode);
            // extract unique values
            const recipients = [...new Set(data.map((d) => d['Destination country']))];
            const years = [...new Set(data.map((d) => d.Year))];
            const initialDonors = getRecipientDonors(data, 'All Recipient Countries');
            // create UI elements
            const countryFilter = addFilter({
              wrapper: filterWrapper,
              options: recipients.sort(),
              className: 'country-filter',
              label: 'Select Recipient',
            });
            const chart = window.echarts.init(chartNode);
            renderDefaultChart(chart, cleanData(data, 'USD deflated millions'), { years, channels: initialDonors });

            const updateChart = (updatedData, recipient) => {
              const cleanedData = cleanData(updatedData, 'USD deflated millions');
              const donors = getRecipientDonors(updatedData, recipient);
              const series = donors
                .map((donor) => ({
                  name: donor,
                  data: processData(cleanedData, years, recipient, donor).map(
                    (d) => d && Number(d.value),
                  ),
                  type: 'bar',
                  stack: recipient,
                }))
                .reduce((final, cur) => final.concat(cur), []);
              chart.setOption({ series }, { replaceMerge: ['series'] });
            };

            /**
              * Event Listeners/Handlers
              * */
            countryFilter.addEventListener('change', (event) => {
              const { value } = event.currentTarget;
              if (value !== 'All Recipient Countries') {
                const filteredData = value !== 'All Recipient Countries' ? data.filter((d) => d['Destination country'] === value) : data;
                updateChart(filteredData, value);
              } else {
                countryFilter.value = 'All Recipient Countries'; // reset country filter selected value
                renderDefaultChart(chart, cleanData(data, 'USD deflated millions'), { years, channels: initialDonors });
              }
            });

            dichart.hideLoading();
          });
        });
      },
    },
  });
};

export default renderRecipientChart;
