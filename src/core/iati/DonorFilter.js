import { addFilter, addFilterWrapper } from '../../widgets/filters';
import { COUNTRY_FIELD, DEFAULT_DONOR } from '../../utils/iati';

// Your Code Goes Here i.e. functions

const init = (className) => {
  window.DICharts.handler.addChart({
    className,
    d3: {
      onAdd: (chartNodes) => {
        Array.prototype.forEach.call(chartNodes, (chartNode) => {
          const dichart = new window.DICharts.Chart(chartNode.parentElement);
          dichart.showLoading();

          let donors = [];
          const filterWrapper = addFilterWrapper(chartNode);
          if (window.DIState) {
            window.DIState.addListener(() => {
              dichart.showLoading();
              const state = window.DIState.getState;
              const { dataOne: data } = state;

              if (data && data.length && !donors.length) {
                donors = data.reduce((countries, current) => {
                  const country = current[COUNTRY_FIELD];
                  if (countries.includes(country)) {
                    return countries;
                  }

                  return countries.concat(country);
                }, []).filter((country) => !!country).map((country) => ({ label: country, value: country }));

                const countryFilter = addFilter({
                  wrapper: filterWrapper,
                  options: donors,
                  defaultOption: DEFAULT_DONOR,
                  className: 'country-filter',
                  label: 'Select Donor',
                });

                if (window.DIState) {
                  window.DIState.setState({ country: DEFAULT_DONOR });
                }

                // add event listeners
                countryFilter.addEventListener('change', (event) => {
                  const { value } = event.currentTarget;
                  window.DIState.setState({ country: value });
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
