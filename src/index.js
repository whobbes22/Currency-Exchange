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

function printExchangeElements(apiResponse){
  document.querySelector("#results").innerText = `conversion to: ${apiResponse.conversion_rates.AUD}`;
}

function printError(apiResponse){
  document.querySelector("#results").innerText = `Error... ${apiResponse}`;
}

function handleFormSubmission(event){
  event.preventDefault();
  const countCode = document.querySelector("#amount").value;
  getExchange(countCode);
}

// ui logic

window.addEventListener("load", function(){
  document.querySelector("form").addEventListener("submit",handleFormSubmission);
});