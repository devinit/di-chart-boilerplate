import { createElement } from 'react';
import { render } from 'react-dom';
import { TableOne } from '../components/TableOne/TableOne';
import { COUNTRY_FIELD, PURPOSE_FIELD, PURPOSE_TO_FILTER_BY, VALUE_FIELD, YEARS } from '../utils/constants';
import fetchCSVData, { filterDataByCountry, filterDataByPurpose } from '../utils/data';
// import d3 from 'd3'; // eslint-disable-line import/no-unresolved

// Your Code Goes Here i.e. functions

const renderTable = (tableNode, data, country) => {
  const yearRange = YEARS[1] - YEARS[0] + 1;
  const headerRow = ['Purpose code'].concat([...Array(yearRange).keys()].map((key) => YEARS[0] + key));

  const rows = [headerRow].concat(
    PURPOSE_TO_FILTER_BY.map((purpose) => {
      const purposeData = filterDataByPurpose(data, [purpose], PURPOSE_FIELD);

      return headerRow.reduce((row, column, index) => {
        if (index === 0) {
          return row.concat(purpose);
        }
        const yearData = purposeData.filter((d) => d.year === `${column}`);
        const sum = yearData.reduce((_sum, prev) => _sum + Number(prev[VALUE_FIELD]), 0);

        return row.concat(Math.round(sum));
      }, []);
    }),
  );

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
          const csv = 'https://raw.githubusercontent.com/devinit/di-website-data/main/2022/RH-and-FP-CRS-Data-2019.csv';
          fetchCSVData(csv).then((data) => {
            const defaultCountry = 'United States';
            if (window.DIState) {
              window.DIState.addListener(() => {
                const state = window.DIState.getState;
                const { country } = state;
                const countryData = filterDataByPurpose(
                  filterDataByCountry(data, country || defaultCountry, COUNTRY_FIELD),
                  PURPOSE_TO_FILTER_BY,
                  PURPOSE_FIELD,
                );
                renderTable(tableNode, countryData, country || defaultCountry);
              });
            } else {
              const countryData = filterDataByPurpose(
                filterDataByCountry(data, defaultCountry, COUNTRY_FIELD),
                PURPOSE_TO_FILTER_BY,
                PURPOSE_FIELD,
              );
              renderTable(tableNode, countryData, defaultCountry);
            }

            dichart.hideLoading();
          });
        });
      },
    },
  });
};

export default init;
