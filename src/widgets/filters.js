// eslint-disable-next-line import/prefer-default-export
export const addFilterWrapper = (chartNode) => {
  const filterWrapper = document.createElement('div');
  filterWrapper.classList.add("data-selector--wrapper");
  chartNode.parentElement.insertBefore(filterWrapper, chartNode);

  return filterWrapper;
};
