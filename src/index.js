import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import Exchange from './exchange.js';

// buisness logic

async function getExchange(countryCode){
  const response = await Exchange.getExchange(countryCode);
  if(response.result === "success"){
    printExchangeElements(response);
  } else {
    printError(response);
  }
}

function handleFormSubmission(event){

}

// ui logic

window.addEventListener("load", function(){
  document.querySelector("form").addEventListener("submit",handleFormSubmission);
});