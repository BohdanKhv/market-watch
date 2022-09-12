import axios from 'axios';

const API_URL = 'https://www.alphavantage.co';
const API_KEY = 'M15W266OMYJPGMX';

const search = async (query) => {
    const response = await axios.get(API_URL+'/query?function=SYMBOL_SEARCH&keywords='+query+'&apikey='+API_KEY);
console.log(response.data);
    return response.data;
};

const searchService = {
    search,
};

export default searchService;