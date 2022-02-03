import deepMerge from 'deepmerge';
import defaultOptions from '../charts/echarts';
import { COUNTRY_FIELD, DEFAULT_COUNTRY } from '../utils/constants';
import { extractPurposeCodes, filterDataByCountry, filterDataByPurpose, formatNumber } from '../utils/data';
import { addFilter, addFilterWrapper } from '../widgets/filters';
// import d3 from 'd3'; // eslint-disable-line import/no-unresolved

// Your Code Goes Here i.e. functions

// Data Constants
const PURPOSE_CODE_FIELD = 'purpose_name';
const PARENT_FIELD = 'oecd_aggregated_channel';
const CHILD_FIELD = 'oecd_channel_parent_name';
const VALUE_FIELD = 'usd_disbursement_deflated_Sum';

const renderChart = (chartNode, data) => {
  const chart = window.echarts.init(chartNode);
  const option = {
    // legend: { show: false, data: ['testing'] },
    tooltip: { show: true, trigger: 'item' },
    xAxis: { show: false },
    yAxis: { show: false },
    series: {
      // name: 'testing',
      type: 'sunburst',
      emphasis: {
          focus: 'descendant'
      },
      data,
      radius: ['30%', '90%'],
      label: {
        rotate: 'tangential',
        show: false
      },
      levels: [
        {

        }
      ]
    }
  };

  chart.setOption(deepMerge(defaultOptions, option));
};

/**
 * This is a single depth algorithm and isn't flexible enough to handled multiple generations of children
 * To fix, it must call itself when rendering children - sadly, the data is not sophisticated enough to benefit from this
 */
const getChildren = (data, parent, fields) => {
  const config = { name: parent };
  const children = data.filter((item) => {
      return item[fields.parent] === (typeof parent === 'string' ? parent : parent[fields.parent]);
  });
  if (children.length) {
    config.children = children.map((child) => ({ name: child[fields.child], value: child[fields.value] }));
  } else if (typeof parent === 'string') {
    const parentObject = data.find((d) => d[fields.parent] === parent);
    config.value = parentObject[fields.value]
  } else {
    config.value = parent[fields.value];
  }

  return config;
}

const parseIntoSunburstFormat = (data, fields) => { // fields = { parent: string, child: string, value: string }
  const parents = data
    .map((d) => {
      if (d[fields.value]) {
        d[fields.value] = formatNumber(d[fields.value]);
      }

      return d;
    })
    .reduce((parents, current) =>
      parents.includes(current[fields.parent]) ? parents : parents.concat(current[fields.parent]), []);

  return parents.map((parent) => getChildren(data, parent, fields));
};

const renderByCountryAndPurposeCode = (chartNode, data, country, purposeCode) => {
  const countryData = filterDataByPurpose(
    filterDataByCountry(data, country || DEFAULT_COUNTRY, COUNTRY_FIELD),
    purposeCode,
    PURPOSE_CODE_FIELD
  );
  const sunburstData = parseIntoSunburstFormat(countryData, { parent: PARENT_FIELD, child: CHILD_FIELD, value: VALUE_FIELD });

  renderChart(chartNode, sunburstData);
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
            chartNode.parentElement.classList.add('auto-height');
          });
        });
      },
    },
  });
};

export default init;
