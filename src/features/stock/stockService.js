import axios from 'axios';

const API_URL = 'https://www.alphavantage.co';
const API_KEY = 'M15W266OMYJPGMX';

const getGlobalQuote = async (symbol) => {
    const response = await axios.get(API_URL+'/query?function=GLOBAL_QUOTE&symbol='+symbol+'&apikey='+API_KEY);
console.log(response.data);
    return response.data.globalQuote;
}


const stockService = {
    getGlobalQuote
};

export default stockService;