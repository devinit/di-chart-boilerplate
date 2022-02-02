import { createElement } from 'react';
import { render } from 'react-dom';
import { OdaAidTable } from '../components/OdaAidTable';
import { COUNTRY_FIELD, DEFAULT_COUNTRY } from '../utils/constants';
import { filterDataByCountry } from '../utils/data';
import { addFilter, addFilterWrapper } from '../widgets/filters';
// import d3 from 'd3'; // eslint-disable-line import/no-unresolved

// Your Code Goes Here i.e. functions
const YEAR = 2019;
const getPurposeNames = (data) => {
  const purposeNames = []
  data.forEach((record) => {
    if(!purposeNames.includes(record.purpose_name)){
      purposeNames.push(record.purpose_name)
    }
  })

  return purposeNames
}
const filterDataByPurpose = (data, purpose) => (data.filter((item) => item.purpose_name === purpose));
const filterDataByYear = (data) => data.filter(item => item.year === YEAR)
const getRows = (data) => {
  const rowLabels = data.map(item => item.aid_type_di_name);
  const rows = rowLabels.map(label => {
    const row = [label].concat(data.find(item=> item.aid_type_di_name === label).usd_disbursement_deflated_Sum)

    return row
  })
  console.log(rows)
}

const renderTable = (tableNode, data, country, purpose) => {
  const countryData = filterDataByCountry(data, country || DEFAULT_COUNTRY, COUNTRY_FIELD);
  const purposeFilteredData = filterDataByPurpose(countryData, purpose);
  getRows(filterDataByYear(purposeFilteredData))
  render(createElement(OdaAidTable, { country }), tableNode);
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
          let purposeField;
          if (window.DIState) {
            window.DIState.addListener(() => {
              dichart.showLoading();
              const filterWrapper = addFilterWrapper(tableNode);
              const state = window.DIState.getState;
              const { country, odaAidType: data } = state;
              if (country && data) {
                const purposeNames = getPurposeNames(data);
                let activePurpose = purposeNames[0];
                if(!purposeField){
                  purposeField = addFilter({
                    wrapper: filterWrapper,
                    options: purposeNames,
                    defaultOption: activePurpose,
                    className: 'purpose-code-filter',
                    label: 'Select Purpose Code',
                  });

                  purposeField.addEventListener('change', (event) => {
                    activePurpose = event.target.value;
                    renderTable(tableNode,data, country || DEFAULT_COUNTRY, activePurpose);
                  });
                }

                renderTable(tableNode, data, country || DEFAULT_COUNTRY, activePurpose);
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
