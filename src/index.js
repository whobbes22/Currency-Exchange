import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import CurrencyExchange from './exchange';

// buisness logic



// ui logic

window.addEventListener("load", function(){
  document.querySelector("form").addEventListener("submit",handleFormSubmission);
});