import deepMerge from 'deepmerge';
import defaultOptions from '../charts/echarts';
import { extractChartData } from '../utils/chart';
import { COUNTRY_FIELD2, DEFAULT_DONOR, PURPOSE_FIELD2} from '../utils/constants';
import { filterDataByCountry, filterDataByPurpose, formatNumber, getYearRangeDataAsSum, getYearsFromRange } from '../utils/data';
import { addFilter, addFilterWrapper } from '../widgets/filters';


const AIDTYPE_PURPOSE_FIELD = 'Aid Type Di Name';
const VALUE_FIELD = 'Usd Disbursement Deflated Sum';

const getYearSum = (data, purpose, years) => {
  const filteredData = filterDataByPurpose(data, [purpose], AIDTYPE_PURPOSE_FIELD);

  return getYearRangeDataAsSum(filteredData, years, VALUE_FIELD);
};

const groupAidTypeColumns = (chartData) => {
  let chartColumnGroups = {};
  for (let i = 0; i < chartData.length; i++) {
    const chartDataItem = chartData[i];
    for (let k = 0; k < chartDataItem.length; k++) {
      chartColumnGroups[k] = chartColumnGroups[k] ? chartColumnGroups[k] : [];
      chartColumnGroups[k].push(chartDataItem[k]);
    }
  }

  return chartColumnGroups;
};

const getPercentages = (chartData, groupedColumnData) => {
  const dataSums = Object.keys(groupedColumnData).map((item) => {
    return {
      [item]: groupedColumnData[item].reduce((acc, item) => acc + item, 0)
    };
  });

  return chartData.map((item) => {
    return item.map((arr, index) => {
      const numerator = parseFloat(arr);
      const denominator = parseFloat(dataSums[index] ? dataSums[index][index] : 1);
      if (isNaN(numerator) || isNaN(denominator) || numerator === 0 || numerator === 0) {
        return 0;
      } else {
        return ((numerator/denominator))*100;
      }
    });
  });
}

const getSeries = (data, years) => {
  const aidTypes = data.reduce((types, item)=> {
    if(!types.includes(item[AIDTYPE_PURPOSE_FIELD])) {
      types.push(item[AIDTYPE_PURPOSE_FIELD]);
    }

    return types;
  },[]);

  const chartData = aidTypes.map((aidType) => extractChartData(data, aidType, years, VALUE_FIELD, AIDTYPE_PURPOSE_FIELD));
  const groupedColumnData = groupAidTypeColumns(chartData);
  const percents = getPercentages(chartData, groupedColumnData);

  return aidTypes.map((barChartCategory, index) => ({
    name: barChartCategory,
    type: 'bar',
    stack: 'oda',
    data: percents[index],
  }));
};

const getTooltipItem = (data, params) => {
  const actualValue = formatNumber(getYearSum(data, params.seriesName, [params.name]));

  return `
    <div style="margin-bottom:8px;">
      ${params.marker}${params.seriesName}:
      <span style="font-weight: bold;">
        ${formatNumber(Number(params.value, 10))}% - US$${actualValue} million
      </span>
    </div>`;
}

const renderChart = (chartNode, data) => {
  const chart = window.echarts.init(chartNode);
  const years = getYearsFromRange([2017, 2021]);
  const option = {
    legend: { show: true, selectedMode: false },
    tooltip: {
      trigger: 'axis',
      formatter: (params) => params.map((param) => getTooltipItem(data, param)).join(''),
    },
    xAxis: {
      type: 'category',
      data: years,
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: "{value} %"
      },
      max: 100,
    },
    grid: {
      top: 60,
    },
    series: getSeries(data, years),
  };
  console.log(option)
  chart.setOption(deepMerge(defaultOptions, option), { replaceMerge: ['series'] });
};

const init = (className) => {
  window.DICharts.handler.addChart({
    className,
    echarts: {
      onAdd: (chartNodes) => {
        Array.prototype.forEach.call(chartNodes, (chartNode) => {
          const dichart = new window.DICharts.Chart(chartNode.parentElement);

          const defaultCountry = DEFAULT_DONOR;
          dichart.showLoading();
          const filterWrapper = addFilterWrapper(chartNode);
          let purposeField;
          let activePurpose = 'Reproductive health care';
          if (window.DIState) {
            window.DIState.addListener(() => {
              dichart.showLoading();
              const state = window.DIState.getState;
              const { country, dataFour: data } = state;
              if (country && data) {
                const countryData = filterDataByPurpose(
                  filterDataByCountry(data, country || defaultCountry, COUNTRY_FIELD2),
                  [activePurpose],
                  PURPOSE_FIELD2,
                );
                if (!purposeField) {
                  purposeField = addFilter({
                    wrapper: filterWrapper,
                    options: data.reduce((options, prev) => {
                      const value = prev[PURPOSE_FIELD2];
                      if (value && !options.includes(value)) {
                        return options.concat(value);
                      }

                      return options;
                    }, []),
                    defaultOption: activePurpose,
                    className: 'purpose-code-filter',
                    label: 'Select purpose code',
                  });
                  purposeField.addEventListener('change', (event) => {
                    activePurpose = event.target.value;
                    const { country } = window.DIState.getState;
                    const countryData = filterDataByPurpose(
                      filterDataByCountry(data, country || defaultCountry, COUNTRY_FIELD2),
                      [activePurpose],
                      PURPOSE_FIELD2,
                    );
                    renderChart(chartNode, countryData);
                  });
                }
                renderChart(chartNode, countryData);

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
