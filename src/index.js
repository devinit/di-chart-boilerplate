import './styles/styles.css';

const init = () => {
  const chartNode = window.document.querySelector('#chart'); // TODO: perhaps use a CSS class instead
  const dichart = new window.DICharts.Chart(chartNode.parentElement);
  dichart.showLoading();
  // dichart.hideLoading();
};

window.onload = init;
