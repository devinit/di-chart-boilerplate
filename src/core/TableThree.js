import { createElement } from 'react';
import { render } from 'react-dom';
import { TableOne } from '../components/TableOne/TableOne';
import { filterDataByCountry, filterDataByPurpose } from '../utils/data';
import { addFilter, addFilterWrapper } from '../widgets/filters';
import { toJS } from 'mobx';
import { ALTERNATIVE_PURPOSE_TO_FILTER_BY, CHANNEL_FIELD, COUNTRY_FIELD, PURPOSE_FIELD, VALUE_FIELD } from '../utils/constants';

const getTableData = (countryData) => {
  const parsedData = toJS(countryData);
  console.log(parsedData);
  const dta = parsedData.filter((item) => item['year'] === '2019').reduce((acc, data) => {
      return {...acc, [data[CHANNEL_FIELD]]: (parseFloat(acc[data[CHANNEL_FIELD]] || 0) + parseFloat(data[VALUE_FIELD] || 0)).toFixed(1) }
  }, {});

  return dta;
};

const renderTable = (data, country, purpose, tableNode) => {
  const rowHeader = ['Channel', '2019', '% Total'];
  const countryData = filterDataByPurpose(
    filterDataByCountry(data, country, COUNTRY_FIELD),
    ALTERNATIVE_PURPOSE_TO_FILTER_BY,
    PURPOSE_FIELD,
  );
  const tableData = getTableData(countryData);
  console.log(tableData);
  const rows = [rowHeader]
    .concat([['Public sector', 18.9, '5.9%']])
    .concat([['All channels', 322.0, '100%']]);

  render(createElement(TableOne, { rows }), tableNode);
};

const init = (className) => {
  window.DICharts.handler.addChart({
    className,
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

          dichart.showLoading();
          const filterWrapper = addFilterWrapper(chartNode);
          let purposeField;
          if (window.DIState) {
            window.DIState.addListener(() => {
              dichart.showLoading();
              const state = window.DIState.getState;
              const { country, dataOne: data, purpose } = state;
              if (country && data) {
                if (!purposeField) {
                  purposeField = addFilter({
                    wrapper: filterWrapper,
                    options: ALTERNATIVE_PURPOSE_TO_FILTER_BY,
                    defaultOption: 'Reproductive health care and family planning',
                    className: 'purpose-code-filter',
                    label: 'Select Purpose Code',
                  });
                  if (state) {
                    window.DIState.setState({ purpose: 'Reproductive health care and family planning' });
                  }

                  purposeField.addEventListener('change', (event) => {
                    window.DIState.setState({ purpose: event.target.value });
                  });
                }
                renderTable(data, country, purpose, chartNode);

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
