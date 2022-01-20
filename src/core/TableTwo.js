import { filterDataByPurpose, filterDataByCountry } from '../utils/data';
import { addFilter, addFilterWrapper } from '../widgets/filters';

const renderTable = (data, country, purpose) => {
  const YEARS = [2016, 2019];
  const yearRange = YEARS[1] - YEARS[0] + 1;
  const count = []
  for (const key of Array(yearRange).keys()) {
    count.push(key);
  }
  const rowHeader = ['Rank', 'Recipient'].concat(count.map((key) => YEARS[0] + key));
  console.log(rowHeader)
  const purposeData = filterDataByPurpose(data, purpose, 'Code type');
  const countrySpecificData = filterDataByCountry(purposeData, country, 'donor_name');
  console.log(countrySpecificData)
}

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
              const { country, dataTwo: data, purpose } = state;
              if (country && data) {
                if (!purposeField) {
                  purposeField = addFilter({
                    wrapper: filterWrapper,
                    options: data.reduce((options, prev) => {
                      const value = prev['Code type']; // TODO: use a constant or named variable
                      if (!options.includes(value)) {
                        return options.concat(value);
                      }

                      return options;
                    }, []),
                    defaultOption: 'Reproductive health care and family planning',
                    className: 'purpose-code-filter',
                    label: 'Select Purpose Code',
                  });
                  if (state) {
                    window.DIState.setState({ purpose: 'Reproductive health care and family planning' });
                  }

                  purposeField.addEventListener('change', (event) => {
                    window.DIState.setState({purpose: event.target.value})
                  });
                }
                renderTable(data, country, purpose);

                // FIXME: table goes here

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
