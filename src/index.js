import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import Exchange from './exchange.js';

// buisness logic

async function getExchange(amount,countryCode1,countryCode2){  
  const response = await Exchange.getExchange(countryCode1);
  if(response.result === "success"){
    const exchangedAmount = findAmount(amount,response,countryCode2);
    console.log(exchangedAmount,amount)
    printExchangeElements(amount,exchangedAmount,response,countryCode2);
  } else {

    printErrorAPI(response);
  }
}

function findAmount(amount,response,countryCode2){
  const apiKeys = Object.keys(response.conversion_rates);
  const apiValues = Object.values(response.conversion_rates);
  return amount * apiValues[apiKeys.indexOf(countryCode2)];
}

function checkCode(code){
  const acceptedCodes = ["USD","AED","AFN","ALL","AMD","ANG","AOA","ARS","AUD","AWG","AZN","BAM","BBD","BDT","BGN","BHD","BIF","BMD","BND","BOB","BRL","BSD","BTN","BWP","BYN","BZD","CAD","CDF","CHF","CLP","CNY","COP","CRC","CUP","CVE","CZK","DJF","DKK","DOP","DZD","EGP","ERN","ETB","EUR","FJD","FKP","FOK","GBP","GEL","GGP","GHS","GIP","GMD","GNF","GTQ","GYD","HKD","HNL","HRK","HTG","HUF","IDR", "ILS","IMP","INR","IQD","IRR", "ISK","JEP","JMD","JOD","JPY","KES","KGS","KHR","KID","KMF","KRW","KWD","KYD","KZT","LAK", "LBP", "LKR","LRD","LSL","LYD","MAD","MDL","MGA","MKD","MMK","MNT","MOP","MRU","MUR","MVR","MWK","MXN","MYR","MZN","NAD","NGN","NIO","NOK","NPR","NZD","OMR","PAB","PEN","PGK","PHP","PKR","PLN","PYG","QAR","RON","RSD","RUB","RWF","SAR","SBD","SCR","SDG","SEK","SGD","SHP","SLE","SLL", "SOS","SRD","SSP","STN","SYP","SZL","THB","TJS","TMT","TND","TOP","TRY","TTD","TVD","TWD","TZS","UAH","UGX","UYU","UZS", "VES","VND", "VUV","WST","XAF","XCD","XDR","XOF","XPF","YER","ZAR","ZMW","ZWL"];

  return acceptedCodes.includes(code.toUpperCase());
}
// ui logic

// 3 usd converted to new currency -> 4 aud
function printExchangeElements(amount,exchangedAmount,apiResponse,countryCode2){
  document.querySelector("#results").innerText = `${amount} ${apiResponse["base_code"]} to new currency -> ${exchangedAmount} ${countryCode2}`;
}

function printErrorAPI(apiResponse){
  document.querySelector("#results").innerText = `There was an error in the response: ${apiResponse}`;
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
  document.querySelector("#results").innerText =`Your first input "${countCode1}" is ${valid1}a valid Country Code. Your second input "${countCode2}" is ${valid2}a valid Country Code. Please refer to the Wikipedia page and give the correct 3 character Country Code. `;
}

function handleFormSubmission(event){
  event.preventDefault();
  let amount = parseInt(document.querySelector("#amount").value);
  let countCode1 = (document.querySelector("#code1").value).toUpperCase();
  let countCode2 = (document.querySelector("#code2").value).toUpperCase();
  if(isNaN(amount)){
    amount = 5;
  }
  if(!countCode1){
    countCode1 = "USD";
  }
  if(!countCode2){
    countCode2 = "AUD";
  }
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

