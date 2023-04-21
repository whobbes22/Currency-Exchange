import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import Exchange from './exchange.js';

// buisness logic

async function getExchange(amount,countryCode1,countryCode2){
  const response = await Exchange.getExchange(countryCode1);
  if(response.result === "success"){
    printExchangeElements(amount,response,countryCode2);
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
  const amount = document.querySelector("amount").value
  const countCode1 = document.querySelector("#code1").value;
  const countCode2 = document.querySelector("#code2").value;
  getExchange(amount,countCode1,countCode2);
}

// ui logic

window.addEventListener("load", function(){
  document.querySelector("form").addEventListener("submit",handleFormSubmission);
});