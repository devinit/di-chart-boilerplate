import './styles/styles.css';

const init = () => {
    let chartNode = document.querySelector('#chart');
    const dichart = new window.DICharts.Chart(chartNode.parentElement);
    dichart.showLoading();
    // dichart.hideLoading();
};

window.onload = init;
