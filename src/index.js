import './styles/styles.css';
import './state';
import initTableOne from './core/tableOne';
import initDonorFilter from './core/donorFilter';

// Your Code Goes Here i.e. functions

/**
 * Run your code after the page has loaded
 */
window.addEventListener('load', () => {
  initDonorFilter('dicharts--oda-root');
  initTableOne('dicharts--table-one-root');
});
