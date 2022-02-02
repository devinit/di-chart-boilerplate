import deepMerge from 'deepmerge';
import { toJS } from 'mobx';
import defaultOptions from '../charts/echarts';
import { COUNTRY_FIELD, DEFAULT_COUNTRY } from '../utils/constants';
import { extractPurposeCodes, filterDataByCountry, filterDataByPurpose } from '../utils/data';
import { addFilter, addFilterWrapper } from '../widgets/filters';
// import d3 from 'd3'; // eslint-disable-line import/no-unresolved

// Your Code Goes Here i.e. functions

// Data Constants
const PURPOSE_CODE_FIELD = 'purpose_name';

const renderChart = (chartNode, _data) => {
  console.log(_data.map((item) => toJS(item)));
  // TODO: change code goes here
  const chart = window.echarts.init(chartNode);
  const data = [
    {
      name: 'Grandpa',
      children: [
        {
          name: 'Uncle Leo',
          value: 15,
          children: [
            {
              name: 'Cousin Jack',
              value: 2
            },
            {
              name: 'Cousin Mary',
              value: 5,
              children: [
                {
                  name: 'Jackson',
                  value: 2
                }
              ]
            },
            {
              name: 'Cousin Ben',
              value: 4
            }
          ]
        },
        {
          name: 'Father',
          value: 10,
          children: [
            {
              name: 'Me',
              value: 5
            },
            {
              name: 'Brother Peter',
              value: 1
            }
          ]
        }
      ]
    },
    {
      name: 'Nancy',
      children: [
        {
          name: 'Uncle Nike',
          children: [
            {
              name: 'Cousin Betty',
              value: 1
            },
            {
              name: 'Cousin Jenny',
              value: 2
            }
          ]
        }
      ]
    }
  ];
  const option = {
    xAxis: { show: false },
    yAxis: { show: false },
    series: {
      type: 'sunburst',
      // emphasis: {
      //     focus: 'ancestor'
      // },
      data,
      radius: [0, '90%'],
      label: {
        rotate: 'radial'
      }
    }
  };

  chart.setOption(deepMerge(defaultOptions, option));
};

const renderByCountryAndPurposeCode = (chartNode, data, country, purposeCode) => {
  const countryData = filterDataByPurpose(
    filterDataByCountry(data, country || DEFAULT_COUNTRY, COUNTRY_FIELD),
    purposeCode,
    PURPOSE_CODE_FIELD
  );
  renderChart(chartNode, countryData);
}

/**
 * Run your code after the page has loaded
 */
const init = (className) => {
  window.DICharts.handler.addChart({
    className,
    d3: {
      onAdd: (chartNodes) => {
        Array.prototype.forEach.call(chartNodes, (chartNode) => {
          const dichart = new window.DICharts.Chart(chartNode.parentElement);
          // init filter dependencies
          dichart.showLoading();
          const filterWrapper = addFilterWrapper(chartNode);
          let purposeCodeFilter;
          let activePurpose;
          if (!window.DIState) {
            console.log('State is not defined');

            return;
          }

          window.DIState.addListener(() => {
            const state = window.DIState.getState;
            const { country, odaChannels: data } = state;
            if (!country || !data) { // required country and data
              dichart.hideLoading();

              return;
            }

            // check for and create purpose filter
            if (!purposeCodeFilter) {
              const purposeCodes = extractPurposeCodes(data, PURPOSE_CODE_FIELD);
              activePurpose = purposeCodes[0];
              purposeCodeFilter = addFilter({
                wrapper: filterWrapper,
                options: purposeCodes,
                defaultOption: activePurpose,
                className: 'purpose-code-filter',
                label: 'Select Purpose Code',
              });

              purposeCodeFilter.addEventListener('change', (event) => {
                activePurpose = event.target.value;
                renderByCountryAndPurposeCode(chartNode, data, country, activePurpose);
              });
            }

            renderByCountryAndPurposeCode(chartNode, data, country, activePurpose);
            dichart.hideLoading();
            // tableNode.parentElement.classList.add('auto-height');
          });
        });
      },
    },
  });
};

export default init;
