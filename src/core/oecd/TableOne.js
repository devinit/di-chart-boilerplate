import React from 'react';
import { createRoot } from 'react-dom/client';
import { TableOne } from '../../components/TableOne/TableOne';
import { COUNTRY_FIELD, PURPOSE_FIELD, PURPOSE_TO_FILTER_BY, YEARS, nonbilats } from '../../utils/constants';
import { filterDataByCountry, filterDataByPurpose, formatNumber,getYearRangeData, getYearsFromRange } from '../../utils/data';
// import d3 from 'd3'; // eslint-disable-line import/no-unresolved

// Your Code Goes Here i.e. functions
const VALUE_FIELD = 'value';

const renderTable = (tableNode, data, country) => {
  const years = getYearsFromRange(YEARS);
  const headerRow = ['RMNCH category'].concat(years);
  var PURPOSE_TO_FILTER_BY_ADAPTED = Object.create(PURPOSE_TO_FILTER_BY)
  if (nonbilats.includes(country)){
    for( var i = 0; i < PURPOSE_TO_FILTER_BY_ADAPTED.length; i++){

      if ( PURPOSE_TO_FILTER_BY_ADAPTED[i] === "Core contributions to multilaterals benefiting RMNCH") {

          PURPOSE_TO_FILTER_BY_ADAPTED.splice(i, 1);
      }
    }
  }
  const dataRows = PURPOSE_TO_FILTER_BY_ADAPTED.map((purpose) => {
    const purposeData = filterDataByPurpose(data, [purpose], PURPOSE_FIELD);

    return [purpose].concat(getYearRangeData(purposeData, years, VALUE_FIELD));
  });
  const totalsRowCaption = 'RMNCH (total)';
  const totalsRow = headerRow.map((cell, index) => {
    if (index === 0) {
      return totalsRowCaption;
    }

    return formatNumber(
      dataRows.reduce((total, current) => (typeof current[index] === 'number' ? total + current[index] : total), 0),
    );
  });

  // formatting is done after calculating the total to eliminate rounding errors
  const formattedDataRow = dataRows.map((row) => row.map((cell) => typeof cell === 'number' && cell!== '' ? formatNumber(cell) : cell === '' ? 0 : cell));

  const rows = [headerRow].concat(formattedDataRow, [totalsRow]);

  tableNode.render(<TableOne country={country} rows={rows}/>);


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
          const root = createRoot(tableNode)
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
                renderTable(root, countryData, country || defaultCountry);
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
