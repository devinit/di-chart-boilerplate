import { createElement } from 'react';
import { render } from 'react-dom';
import OdaChannelsTable from '../../components/OdaChannelsTable';
import { COUNTRY_FIELD, DEFAULT_COUNTRY, PURPOSE_FIELD } from '../../utils/constants';
import { filterDataByCountry, filterDataByPurpose, formatNumber } from '../../utils/data';
import { addFilter, addFilterWrapper } from '../../widgets/filters';

const CHANNEL_FIELD = 'oecd_aggregated_channel';
const VALUE_FIELD = 'usd_disbursement_deflated_Sum';
const YEARS = [2019]

const getPurposes = (data) =>
  data.reduce((acc, item) => item[PURPOSE_FIELD] && !acc.includes(item[PURPOSE_FIELD]) ? acc.concat(item[PURPOSE_FIELD]) : acc, []);

const sumChannelData = (countryData) => {
  return countryData.reduce((acc, data) => {
    return {...acc, [data[CHANNEL_FIELD]]: parseFloat(acc[data[CHANNEL_FIELD]] || 0) + parseFloat(data[VALUE_FIELD] || 0) }
  }, {});
};

const getRows = (channelData) => {
  const sum = Object.keys(channelData).reduce((_sum, key) => _sum + Number(channelData[key] || 0), 0);

  return Object.keys(channelData).map((dataKey) =>
    [dataKey, formatNumber(channelData[dataKey]), `${(formatNumber(((channelData[dataKey]/sum)*100) || 0) || 0)}%`])
      .concat([['Total', formatNumber(sum), sum ? '100%' : '0%']]);
};

const renderTable = (tableNode, countryData, country) => {
  const rowHeader = ['Channel'].concat(YEARS, '% Total');
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

          const filterWrapper = addFilterWrapper(tableNode);
          let purposeField;
          let activeCountry = DEFAULT_COUNTRY;
          if (window.DIState) {
            window.DIState.addListener(() => {
              dichart.showLoading();
              const state = window.DIState.getState;
              const { country, odaChannels: data, purpose } = state;
              activeCountry = country;
              if (activeCountry && data) {
                const options = getPurposes(data);
                const countryData = filterDataByPurpose(
                  filterDataByCountry(data, activeCountry || DEFAULT_COUNTRY, COUNTRY_FIELD),
                  purpose || options[0],
                  PURPOSE_FIELD,
                );
                if (!purposeField) {
                  purposeField = addFilter({
                    wrapper: filterWrapper,
                    options,
                    defaultOption: options[0],
                    className: 'purpose-code-filter',
                    label: 'Select purpose code',
                  });
                  if (state) {
                    window.DIState.setState({ purpose: options[0] });
                  }

                  purposeField.addEventListener('change', (event) => {
                    window.DIState.setState({ purpose: event.target.value });
                  });
                }
                renderTable(tableNode, countryData, activeCountry || DEFAULT_COUNTRY);
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
