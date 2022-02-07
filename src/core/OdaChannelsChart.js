import Colour from 'color';
import { createElement } from 'react';
import { render } from 'react-dom';
import deepMerge from 'deepmerge';
import defaultOptions, { colorways } from '../charts/echarts';
import Legend from '../components/Legend';
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

const SEPARATOR_LABEL = 'Breakdown';

const createLegend = (node, items, position =  'right') => {
  render(createElement(Legend, { data: items, position }), node);
};

const createActiveTreeLegend = (legendNode, activeItem, parent, activeLegend, color) => {
  activeLegend.push({ caption: SEPARATOR_LABEL, label: true });
  activeLegend = activeLegend.concat(getLegendItemsFromChartData(activeItem, parent, color));
  createLegend(legendNode, activeLegend);
};

const getLegendItemsFromChartData = (data, parent, parentColour) =>
  data.children.sort((a, b) => a.value - b.value).reverse().map((child) => {
    if (child.value) {
      const percent = formatNumber((child.value / parent.value) * 100);
      const colour = Colour(parentColour).lighten(0.2)

      return { caption: `${child.name} | ${child.value} - ${percent}%`, colour: colour.hex() };
    }

    return { caption: child.name, colour: '#333' };
  });

const renderChart = (chartNode, data, legendNode) => {
  const chart = window.echarts.init(chartNode);
  const colours = colorways.rainbow;
  const legendItems = data.map((item, index) => ({ caption: item.name, colour: colours[index] }));

  const resetLegend = () => createLegend(legendNode, legendItems);

  // let activeItem = '';
  const option = {
    tooltip: {
      show: true,
      trigger: 'item',
      formatter: (params) => {
        if (!params.name) return 'Go Back';

        if(params.treePathInfo.length > 1) {
          const parent = params.treePathInfo[params.treePathInfo.length - 2];
          const percentage = formatNumber((params.value / parent.value) * 100);

          return `${params.name} | ${formatNumber(params.value)} - ${percentage}%`;
        }

        return `${params.name} | ${formatNumber(params.value)}`;
      }
    },
    xAxis: { show: false },
    yAxis: { show: false },
    series: {
      type: 'sunburst',
      // center: ['45%', '50%'],
      emphasis: {
        focus: 'descendant'
      },
      sort: undefined,
      data: data.map((item, index) => {
        item.itemStyle = { color: colours[index] };

        return item;
      }),
      radius: ['20%', '100%'],
      label: { show: false },
      levels: [
        { itemStyle: { color: '#333', opacity: 0.7 }, r: 120 },
        { r: 145 },
        { radius: [150, 170] }
      ]
    },
    toolbox: {
      showTitle: false,
      feature: {
        saveAsImage: {
          show: false,
        },
      },
    }
  };

  chart.setOption({ ... deepMerge(defaultOptions, option), color: colours });
  resetLegend();
  let activeLevel = 0;

  chart.on('click', function (params) {
    if (!params.name) { // reset legend on returning to original view
      activeLevel = activeLevel - 1;
      if(activeLevel === 0) resetLegend();

      return;
    }
    let legend = legendItems.filter((item) => params.treePathInfo.find((d) => d.name === item.caption));
    const activeItemData = data.find((item) => item.name === params.name);
    if (activeItemData && activeItemData.children) {
      activeLevel = 1;
      createActiveTreeLegend(legendNode, activeItemData, params, legend, params.color)

      return;
    }

    activeLevel = 2;
    const parent = params.treePathInfo[params.treePathInfo.length - 2];
    const parentData = data.find((item) => item.name === parent.name);
    if (parentData && parentData.children) {
      createActiveTreeLegend(legendNode, parentData, parent, legend, legend[0].colour)
    } else {
      createLegend(legendNode, legend);
    }
  });

  chart.on('mouseover', function (params) {
    if (!params.name) return;

    let legend = legendItems.filter((item) => params.treePathInfo.find((d) => d.name === item.caption));
    if(params.treePathInfo.length > 1) {
      const activeItemData = data.find((item) => item.name === params.name);
      if (activeItemData && activeItemData.children) {
        createActiveTreeLegend(legendNode, activeItemData, params, legend, params.color)

        return;
      }

      const parent = params.treePathInfo[params.treePathInfo.length - 2];
      const parentData = data.find((item) => item.name === parent.name);
      if (parentData && parentData.children) {
        createActiveTreeLegend(legendNode, parentData, parent, legend, legend[0].colour)
      } else {
        createLegend(legendNode, legend);
      }
    }
  });

  chart.on('mouseout', function () {
    if (activeLevel === 0) resetLegend();
  });
};

/**
 * This is a single depth algorithm and isn't flexible enough to handled multiple generations of children
 * To fix, it must call itself when rendering children - sadly, the data is not sophisticated enough to benefit from this
 */
const getChildren = (data, parent, fields, color) => {
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

  if (color) config.itemStyle = { color };

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

const renderByCountryAndPurposeCode = (chartNode, data, country, purposeCode, legendNode) => {
  const countryData = filterDataByPurpose(
    filterDataByCountry(data, country || DEFAULT_COUNTRY, COUNTRY_FIELD),
    purposeCode,
    PURPOSE_CODE_FIELD
  );
  const sunburstData = parseIntoSunburstFormat(countryData, { parent: PARENT_FIELD, child: CHILD_FIELD, value: VALUE_FIELD });

  renderChart(chartNode, sunburstData, legendNode);
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
          const legendNode = addFilterWrapper(chartNode);

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
                renderByCountryAndPurposeCode(chartNode, data, country, activePurpose, legendNode);
              });
            }

            renderByCountryAndPurposeCode(chartNode, data, country, activePurpose, legendNode);
            dichart.hideLoading();
            chartNode.parentElement.classList.add('auto-height');
          });
        });
      },
    },
  });
};

export default init;
