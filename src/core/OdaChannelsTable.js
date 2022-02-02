import { createElement } from 'react';
import { render } from 'react-dom';
import OdaChannelsTable from '../components/OdaChannelsTable';
import { CHANNEL_FIELD, CHANNEL_VALUE_FIELD, COUNTRY_FIELD, DEFAULT_COUNTRY, PURPOSE_FIELD } from '../utils/constants';
import { filterDataByCountry, filterDataByPurpose, formatNumber } from '../utils/data';
import { addFilter, addFilterWrapper } from '../widgets/filters';
// import d3 from 'd3'; // eslint-disable-line import/no-unresolved

const getPurposes = (data) => {
  return data.reduce((acc, item) => {
    if (!acc.includes(item[PURPOSE_FIELD])) {
      acc.push(item[PURPOSE_FIELD]);
    }

    return acc;
  }, []);
}

const sumChannelData = (countryData) => {
  return countryData.reduce((acc, data) => {
    return {...acc, [data[CHANNEL_FIELD]]: (parseFloat(acc[data[CHANNEL_FIELD]] || 0) + parseFloat(data[CHANNEL_VALUE_FIELD] || 0)).toFixed(1) }
  }, {});
};

const getRows = (channelData) => {
  const sum = Object.keys(channelData).reduce((_sum, key) => formatNumber(_sum + formatNumber(Number(channelData[key]) || 0)), 0);

  return Object.keys(channelData).map((dataKey) => {
    return [dataKey, channelData[dataKey], ((((channelData[dataKey]/sum)*100) || 0).toFixed(1) || 0)];
  }).concat([['All channels', sum, '100%']]);
};

const renderTable = (tableNode, countryData, country) => {
  const rowHeader = ['Channel', '2019', '% Total'];
  const tableData = getRows(sumChannelData(countryData));
  const rows = [rowHeader].concat(tableData);

  render(createElement(OdaChannelsTable, { country, rows }), tableNode);
};

/**
 * Run your code after the page has loaded
 */
const init = (className) => {
  window.DICharts.handler.addChart({
    className,
    d3: {
      onAdd: (tableNodes) => {
        Array.prototype.forEach.call(tableNodes, (tableNode) => {
          const dichart = new window.DICharts.Chart(tableNode.parentElement);
          dichart.showLoading();

          /**
           * ECharts - prefix all browsers global with window
           * i.e window.echarts - echarts won't work without it
           *
           * const chart = window.echarts.init(chartNode);
           */
          const filterWrapper = addFilterWrapper(tableNode);
          let purposeField;
          if (window.DIState) {
            window.DIState.addListener(() => {
              dichart.showLoading();
              const state = window.DIState.getState;
              const { country, odaChannels: data, purpose } = state;
              if (country && data) {
                const countryData = filterDataByPurpose(
                  filterDataByCountry(data, country || DEFAULT_COUNTRY, COUNTRY_FIELD),
                  purpose || 'Reproductive health care',
                  PURPOSE_FIELD,
                );
                const options = getPurposes(data);
                if (!purposeField) {
                  purposeField = addFilter({
                    wrapper: filterWrapper,
                    options,
                    defaultOption: options[0],
                    className: 'purpose-code-filter',
                    label: 'Select Purpose Code',
                  });
                  if (state) {
                    window.DIState.setState({ purpose: options[0] });
                  }

                  purposeField.addEventListener('change', (event) => {
                    window.DIState.setState({ purpose: event.target.value });
                  });
                }
                renderTable(tableNode, countryData, country || DEFAULT_COUNTRY);
                dichart.hideLoading();
                tableNode.parentElement.classList.add('auto-height');
              }
            });
          } else {
            console.log('State is not defined');
          }
        });
      },
    },
  });
};

export default init;
