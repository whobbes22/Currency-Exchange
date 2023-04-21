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
    printErrorAPI(response);
  }
}


function checkCode(code){
  const acceptedCodes = ["USD","AED","AFN","ALL","AMD","ANG","AOA","ARS","AUD","AWG","AZN","BAM","BBD","BDT","BGN","BHD","BIF","BMD","BND","BOB","BRL","BSD","BTN","BWP","BYN","BZD","CAD","CDF","CHF","CLP","CNY","COP","CRC","CUP","CVE","CZK","DJF","DKK","DOP","DZD","EGP","ERN","ETB","EUR","FJD","FKP","FOK","GBP","GEL","GGP","GHS","GIP","GMD","GNF","GTQ","GYD","HKD","HNL","HRK","HTG","HUF","IDR", "ILS","IMP","INR","IQD","IRR", "ISK","JEP","JMD","JOD","JPY","KES","KGS","KHR","KID","KMF","KRW","KWD","KYD","KZT","LAK", "LBP", "LKR","LRD","LSL","LYD","MAD","MDL","MGA","MKD","MMK","MNT","MOP","MRU","MUR","MVR","MWK","MXN","MYR","MZN","NAD","NGN","NIO","NOK","NPR","NZD","OMR","PAB","PEN","PGK","PHP","PKR","PLN","PYG","QAR","RON","RSD","RUB","RWF","SAR","SBD","SCR","SDG","SEK","SGD","SHP","SLE","SLL", "SOS","SRD","SSP","STN","SYP","SZL","THB","TJS","TMT","TND","TOP","TRY","TTD","TVD","TWD","TZS","UAH","UGX","UYU","UZS", "VES","VND", "VUV","WST","XAF","XCD","XDR","XOF","XPF","YER","ZAR","ZMW","ZWL"];

  return acceptedCodes.includes(code.toUpperCase());
}

// ui logic


function printExchangeElements(amount,apiResponse,countryCode2){
  document.querySelector("#results").innerText = `conversion to: ${apiResponse.conversion_rates.AUD}`;
  console.log(amount,countryCode2);
  console.log(apiResponse["conversion_rates"].USD);
}

function printErrorAPI(apiResponse){
  document.querySelector("#results").innerText = `Error... ${apiResponse["error-type"]}`;
}

function printErrorInvalidCode(countCode1,check1,countCode2,check2){
  let valid1 = "";
  let valid2 = "";
  if(!check1){
    valid1 = "NOT ";
  }
  if(!check2){
    valid2 = "NOT ";
  }
  document.querySelector("#results").innerText =`Your first input "${countCode1}" is ${valid1}a valid response. Your second input "${countCode2}" is ${valid2}a valid response. Please refer to the Wikipedia page and give the correct 3 character country code. `;
}

function handleFormSubmission(event){
  event.preventDefault();
  const amount = document.querySelector("#amount").value;
  const countCode1 = document.querySelector("#code1").value;
  const countCode2 = document.querySelector("#code2").value;
  const check1 = checkCode(countCode1);
  const check2 = checkCode(countCode2);
  if(check1 && check2){
    getExchange(amount,countCode1,countCode2);
  } else {
    printErrorInvalidCode(countCode1,check1,countCode2,check2);
  }
}


window.addEventListener("load", function(){
  document.querySelector("form").addEventListener("submit",handleFormSubmission);
});

