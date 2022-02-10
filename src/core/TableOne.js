import { createElement } from 'react';
import { render } from 'react-dom';
import { TableOne } from '../components/TableOne/TableOne';
import { COUNTRY_FIELD, PURPOSE_FIELD, PURPOSE_TO_FILTER_BY, CHANNEL_VALUE_FIELD, YEARS } from '../utils/constants';
import { filterDataByCountry, filterDataByPurpose, formatNumber,getYearRangeData, getYearsFromRange } from '../utils/data';
// import d3 from 'd3'; // eslint-disable-line import/no-unresolved

// Your Code Goes Here i.e. functions

const renderTable = (tableNode, data, country) => {
  const years = getYearsFromRange(YEARS);
  const headerRow = ['Purpose code'].concat(years);
  const dataRows = PURPOSE_TO_FILTER_BY.map((purpose) => {
    const purposeData = filterDataByPurpose(data, [purpose], PURPOSE_FIELD);

    return [purpose].concat(getYearRangeData(purposeData, years, CHANNEL_VALUE_FIELD));
  });
  const totalsRowCaption = 'Total';
  const totalsRow = headerRow.map((cell, index) => {
    if (index === 0) {
      return totalsRowCaption;
    }

    return formatNumber(dataRows.reduce((total, current) => total + current[index], 0));
  });

  const rows = [headerRow].concat(dataRows, [totalsRow]);

  render(createElement(TableOne, { country, rows }), tableNode);
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
          const defaultCountry = 'United States';
          if (window.DIState) {
            window.DIState.addListener(() => {
              dichart.showLoading();
              const state = window.DIState.getState;
              const { country, dataOne: data } = state;
              if (country && data) {
                const countryData = filterDataByPurpose(
                  filterDataByCountry(data, country || defaultCountry, COUNTRY_FIELD),
                  PURPOSE_TO_FILTER_BY,
                  PURPOSE_FIELD,
                );
                renderTable(tableNode, countryData, country || defaultCountry);
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
