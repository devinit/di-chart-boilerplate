// import deepMerge from 'deepmerge';
// import defaultOptions from '../charts/echarts';

// const renderChart = (chartNode, data) => {
//   // append the svg object to the body of the page

//   // get the data
//   const chart = window.echarts.init(chartNode);
//   const option = {
//     legend: { show: false },
//     yAxis: {
//       type: 'category',
//       data: data.map((d) => d.Country),
//     },
//     xAxis: {
//       type: 'value',
//     },
//     series: [
//       {
//         name: 'Countries',
//         data: data.map((d) => Number(d.Value)),
//         type: 'bar',
//         showBackground: true,
//         backgroundStyle: {
//           color: 'rgba(180, 180, 180, 0.2)',
//         },
//       },
//     ],
//   };
//   chart.setOption(deepMerge(defaultOptions, option));

//   return chart;
// };

const init = (className) => {
  window.DICharts.handler.addChart({
    className,
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

          dichart.showLoading();
          if (window.DIState) {
            window.DIState.addListener(() => {
              dichart.showLoading();
              const state = window.DIState.getState;
              const { country, dataOne: data } = state;
              if (country && data) {
                console.log(country, data);
                // chart goes here
                // const chart = renderChart(chartNode, data);

                dichart.hideLoading();
              }
            });
          } else {
            console.log('State is not defined');
            dichart.hideLoading();
          }
        });
      },
    },
  });
};

export default init;
