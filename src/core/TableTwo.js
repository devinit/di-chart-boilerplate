import { toJS } from 'mobx';
import { createElement } from 'react';
import { render } from 'react-dom';
import { TableTwo } from '../components/TableTwo/TableTwo';
import { filterDataByCountry } from '../utils/data';
import { addFilter, addFilterWrapper } from '../widgets/filters';

const DATA_PURPOSE_COLUMN = 'Sector Code - Calculated';
const getGroupedData = (countryData) => {
  let iteratorData = [...countryData];
  const sortedData = [];
  for (let count = 0; count < 10; count++) {
    if (iteratorData.length >= 1) {
      let maxRow = iteratorData.reduce((prev, current) => {
        if (Number(prev['2021']) < Number(current['2021'])) {
          return current;
        } else {
          return prev;
        }
      });
      sortedData.push(maxRow);
      let maxRowIndex = iteratorData.indexOf(maxRow);
      iteratorData.splice(maxRowIndex, 1);
    }
  }

  return { sortedData, unsortedData: iteratorData };
};

const sortedDataRows = (data) => {
  const fullRows = [];
  for (let i = 0; i < 10; i++) {
    if (data.length >= 1) {
      fullRows.push([
        i + 1,
        data[i].recipient_name,
        Math.round(Number(data[i]['2019'])),
        Math.round(Number(data[i]['2020'])),
        Math.round(Number(data[i]['2021'])),
      ]);
    }
  }

  return fullRows;
};

const unSortedDataRow = (data, years) => {
  let sumArray = [];
  years.forEach((year) => {
    const sum = data
      .map((d) => {
        return Number(d[year]);
      })
      .reduce((prev, current) => prev + current, 0);
    sumArray.push(Math.round(sum));
  });

  return sumArray;
};

const renderTable = (data, country, purpose, tableNode) => {
  const YEARS = [2019, 2021];
  const yearRange = YEARS[1] - YEARS[0] + 1;
  const count = [];
  for (const key of Array(yearRange).keys()) {
    count.push(key);
  }
  const rowHeader = ['Rank', 'Recipient'].concat(count.map((key) => YEARS[0] + key));
  const purposeData = data.filter((item) => purpose === item[DATA_PURPOSE_COLUMN]);
  const countrySpecificData = filterDataByCountry(purposeData, country, 'Reporting Organisation Narrative');
  const { sortedData, unsortedData } = getGroupedData(countrySpecificData);
  const unsortedDataSum = unSortedDataRow(
    unsortedData,
    count.map((key) => (YEARS[0] + key).toString()),
  );
  const rows = [rowHeader]
    .concat(sortedDataRows(sortedData))
    .concat([['All other recipients (sum)'].concat(unsortedDataSum)]);

  render(createElement(TableTwo, { rows }), tableNode);
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
              console.log()
              const { country, dataTwo: olddata, purpose } = state;
              let data = olddata;
              if (country && olddata) {
                if (!purposeField) {
                  const data = olddata.map((d) =>{
                    const hold = toJS(d)
                    if (hold['Sector Code - Calculated'] === "13010"){
                      hold['Sector Code - Calculated'] = "Population policy and administrative management"
                    } else if (hold['Sector Code - Calculated'] === "13020"){
                      hold['Sector Code - Calculated'] = "Reproductive health care"
                    } else if (hold['Sector Code - Calculated'] === "13030"){
                      hold['Sector Code - Calculated'] = "Family planning"
                    } else if (hold['Sector Code - Calculated'] === "13081"){
                      hold['Sector Code - Calculated'] = "Personnel development for population and reproductive health"
                    }
                    
                    return hold
                  })
                  purposeField = addFilter({
                    wrapper: filterWrapper,
                    options: data.reduce((options, prev) => {
                      const value = prev[DATA_PURPOSE_COLUMN];
                      if (!options.includes(value)) {
                        return options.concat(value);
                      }

                      return options;
                    }, []),
                    defaultOption: 'Reproductive health care',
                    className: 'purpose-code-filter',
                    label: 'Select Purpose Code',
                  });
                  if (state) {
                    window.DIState.setState({ purpose: 'Reproductive health care' });
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
