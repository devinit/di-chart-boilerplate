import './styles/styles.css';
import fetchCSVData from './utils/data';
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
          const csv = 'https://raw.githubusercontent.com/devinit/di-website-data/main/2022/RH-and-FP-CRS-Data-2019.csv';
          fetchCSVData(csv).then((data) => {
            console.log(data);
            if (window.DIState) {
              window.DIState.setState({ country: 'United States' });
            }

            dichart.hideLoading();
          });
        });
      },
    },
  });
});
