import { createElement } from 'react';
import { render } from 'react-dom';
import { TableThree } from '../../components/TableThree/TableThree';
import { MUSKOKA_PURPOSE_TO_FILTER_BY, COUNTRY_FIELD2, yearField2, MUSKOKA_TITLES } from '../../utils/constants';
import { filterDataByPurpose, filterDataByCountry, filterDataByYear, formatNumber,getPropData } from '../../utils/data';
// import d3 from 'd3'; // eslint-disable-line import/no-unresolved

// Your Code Goes Here i.e. functions

const renderTable = (tableNode, data, country) => {

  var rmnch_attr;
  var health_attr;
  var total_attr;
  if (data[0] === undefined){
    rmnch_attr = 'NA'
    health_attr = 'NA'
    total_attr = 'NA'
  } else{
      if (typeof data[0]['RMNCH (total)'] !== undefined){
        rmnch_attr = String(Number(data[0]['RMNCH (total)']).toFixed(1));
      } else {
        rmnch_attr = "NA";
      }
      if (typeof data[0]['health'] !== undefined){
        health_attr = String(Number(data[0]['health']).toFixed(1));
      } else {
        health_attr = "NA";
      }
      if (typeof data[0]['total'] !== undefined){
        total_attr = String(Number(data[0]['total']).toFixed(1));
      } else {
        total_attr = "NA";
      }
  }


  const headerRow = ['Purpose','% of RMNCH'.concat(' (',rmnch_attr,')'),'% of Health ODA'.concat(' (',health_attr,')'),'% of total ODA'.concat(' (',total_attr,')')];
  
  const dataRows = MUSKOKA_PURPOSE_TO_FILTER_BY.map((purpose) => {
    const purpose_data = filterDataByPurpose(data, purpose, "x_variable")

    return [purpose].concat(getPropData(purpose_data, MUSKOKA_TITLES, 'percentage_value','absolute_value' ));
  });

  // formatting is done after calculating the total to eliminate rounding errors
  const formattedDataRow = dataRows.map((row) => row.map((cell) => typeof cell === 'number' ? formatNumber(cell) : cell));

  const rows = [headerRow].concat(formattedDataRow);

  render(createElement(TableThree, { country, rows }), tableNode);
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

          const defaultCountry = 'United States';
          const defaultYear = '2020';
          if (window.DIState) {
            window.DIState.addListener(() => {
              dichart.showLoading();
              const state = window.DIState.getState;
              const { year, country, dataThree: data } = state;
              if (country && data) {
                const countryData = filterDataByYear(
                  filterDataByCountry(data, country || defaultCountry, COUNTRY_FIELD2),
                  year || defaultYear, // This is variable but needs to be sorted to be that.
                  yearField2
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
