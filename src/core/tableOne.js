import fetchCSVData, { filterDataByCountry, filterDataByPurpose } from '../utils/data';
import {
  COUNTRY_FIELD,
  PURPOSE_TO_FILTER_BY,
  PURPOSE_FIELD,
  VALUE_FIELD,
} from '../utils/constants';
// import d3 from 'd3'; // eslint-disable-line import/no-unresolved

// Your Code Goes Here i.e. functions

const renderTable = (tableNode, data, country) => {
  console.log(country, data);
  PURPOSE_TO_FILTER_BY.forEach((purpose) => {
    const purposeData = filterDataByPurpose(data, [purpose], PURPOSE_FIELD).filter((d) => d.year === '2018');
    const sum = purposeData.reduce((_sum, prev) => _sum + Number(prev[VALUE_FIELD]), 0);

    console.log(sum);
  });
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
                if (!country) {
                  const countryData = filterDataByPurpose(
                    filterDataByCountry(data, defaultCountry, COUNTRY_FIELD),
                    PURPOSE_TO_FILTER_BY,
                    PURPOSE_FIELD,
                  );
                  renderTable(tableNode, countryData, defaultCountry);
                }
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
