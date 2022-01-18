import './styles/styles.css';
import fetchCSVData from './utils/data';
import { addFilter, addFilterWrapper } from './widgets/filters';
// import d3 from 'd3'; // eslint-disable-line import/no-unresolved

// Your Code Goes Here i.e. functions

/**
 * Run your code after the page has loaded
 */
window.addEventListener('load', () => {
  window.DICharts.handler.addChart({
    className: 'dicharts--oda-root',
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
          const csv = 'https://raw.githubusercontent.com/devinit/di-website-data/main/2022/rh-and-fp-dropdowns.csv';
          fetchCSVData(csv).then((data) => {
            const filterWrapper = addFilterWrapper(chartNode);
            const countryFilter = addFilter({
              wrapper: filterWrapper,
              options: data.map((d) => d.Donors),
              defaultOption: 'United States',
              className: 'country-filter',
              label: 'Select Donor',
            });

            // add event listeners
            countryFilter.addEventListener('change', (event) => {
              const { value } = event.currentTarget;
              console.log(value);
              // update state
            });

            // dichart.hideLoading();
          });
        });
      },
    },
  });
});
