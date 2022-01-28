// import { createElement } from 'react';
// import { render } from 'react-dom';
// import { filterDataByCountry, filterDataByPurpose } from '../utils/data';
import { PURPOSE_FIELD } from '../utils/constants';
import { addFilter, addFilterWrapper } from '../widgets/filters';

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
          // const defaultCountry = 'United States';
          const filterWrapper = addFilterWrapper(tableNode);
          let purposeField;
          if (window.DIState) {
            window.DIState.addListener(() => {
              dichart.showLoading();
              const state = window.DIState.getState;
              const { country, dataFour: data, purpose } = state;
              if (country && data) {
                if (!purposeField) {
                  purposeField = addFilter({
                    wrapper: filterWrapper,
                    options: data.reduce((options, prev) => {
                      const value = prev[PURPOSE_FIELD];
                      if (!options.includes(value)) {
                        return options.concat(value);
                      }

                      return options;
                    }, []),
                    defaultOption: 'Reproductive health care and family planning',
                    className: 'purpose-code-filter',
                    label: 'Select Purpose Code',
                  });
                purposeField.addEventListener('change', (event) => {
                  window.DIState.setState({ purpose: event.target.value });
                });
                console.log(purpose)
                dichart.hideLoading();
                tableNode.parentElement.classList.add('auto-height');
              }
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
