import axios from 'axios';

const API_URL = 'https://finnhub.io/api/v1';
const API_KEY = 'ccfh8tiad3i1hjpurg1g';

const getGlobalQuote = async (symbol) => {
    const response = await axios.get(API_URL+'/quote?&symbol='+symbol+'&token='+API_KEY);
    const data = {
        symbol: symbol.toUpperCase(),
        ...response.data
    }
    return data;
}


const stockService = {
    getGlobalQuote
};

export default stockService;