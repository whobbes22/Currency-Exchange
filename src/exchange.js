export default class Exchange {
  static async getExchange(countryCode){
    try {
      const response = await fetch(`https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/latest/${countryCode}`);
      const jsoinifiedResponse = await response.json();
      if(!response.ok){
        //error message
        throw new Error(`${response.status}`);
      }
      return jsoinifiedResponse;
    } catch(error) {
      return error;
    }
  }

}