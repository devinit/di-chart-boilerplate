export const addFilterWrapper = (chartNode) => {
  const filterWrapper = document.createElement('div');
  filterWrapper.classList.add(...['spotlight-banner', 'data-selector--wrapper']);
  chartNode.parentElement.insertBefore(filterWrapper, chartNode);

  return filterWrapper;
};

export const createOption = (selectElement, option) => {
  const optionElement = document.createElement('option');
  optionElement.value = typeof option === 'string' ? option : option.value;
  optionElement.text = typeof option === 'string' ? option : option.label;
  selectElement.appendChild(optionElement);
};

export const addFilter = ({
  wrapper, options, allItemsLabel, className,
}) => {
  const selectElement = document.createElement('select');
  selectElement.classList.add(...['data-selector', 'js-plotly-chart-data-selector', className]);
  createOption(selectElement, { label: allItemsLabel, value: '*' });
  options.forEach((option) => createOption(selectElement, option));
  selectElement.classList.add('data-selector--active');
  wrapper.appendChild(selectElement);

  return selectElement;
};
