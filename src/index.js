import './styles/styles.css';
// import d3 from 'd3'; // eslint-disable-line import/no-unresolved

// Your Code Goes Here i.e. functions

/**
 * Run your code after the page has loaded
 */
window.addEventListener('load', () => {
  window.DICharts.handler.addChart({
    className: 'dicharts--boilerplate-chart',
    d3: {
      onAdd: (chartNodes) => {
        Array.prototype.forEach.call(chartNodes, (chartNode) => {
          const dichart = new window.DICharts.Chart(chartNode.parentElement);
          dichart.showLoading();
          // dichart.hideLoading();

          /**
           * d3 - prefix all browsers global with window i.e window.d3 - d3 won't work without it
           *
           * const chart = window.d3.select(chartNode);
           */
        });
      },
    },
  });
});
