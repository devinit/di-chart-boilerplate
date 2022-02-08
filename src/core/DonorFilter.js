import { addFilter, addFilterWrapper } from '../widgets/filters';
import { COUNTRY_FIELD, DEFAULT_DONOR } from '../utils/constants';
// import d3 from 'd3'; // eslint-disable-line import/no-unresolved

// Your Code Goes Here i.e. functions

/**
 * Run your code after the page has loaded
 */
const init = (className) => {
  window.DICharts.handler.addChart({
    className,
    d3: {
      onAdd: (chartNodes) => {
        Array.prototype.forEach.call(chartNodes, (chartNode) => {
          const dichart = new window.DICharts.Chart(chartNode.parentElement);
          dichart.showLoading();

          /**
           * ECharts - prefix all browsers global with window
           * i.e window.echarts - echarts won't work without it
           *
           * const chart = window.echarts.init(chartNode);
           */
          let donors = [];
          const filterWrapper = addFilterWrapper(chartNode);
          if (window.DIState) {
            window.DIState.addListener(() => {
              dichart.showLoading();
              const state = window.DIState.getState;
              const { dataOne: data } = state;

              if (data.length && !donors.length) {
                donors = data.reduce((countries, current) => {
                  const country = current[COUNTRY_FIELD];
                  if (countries.includes(country)) {
                    return countries;
                  }

                  return countries.concat(country);
                }, []);

                const countryFilter = addFilter({
                  wrapper: filterWrapper,
                  options: donors,
                  defaultOption: DEFAULT_DONOR,
                  className: 'country-filter',
                  label: 'Select Donor',
                });

                if (window.DIState) {
                  window.DIState.setState({ country: 'U.S. Agency for International Development' });
                }

                // add event listeners
                countryFilter.addEventListener('change', (event) => {
                  const { value } = event.currentTarget;
                  if (window.DIState) {
                    window.DIState.setState({ country: value });
                  }
                });
              }

              dichart.hideLoading();
              chartNode.parentElement.classList.add('auto-height');
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
