const addCommaToNumber = (_number) => {
    return _number?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const numberFormatter = (_number) => {
    // format 1000 to 1k or 1000000 to 1m etc
    const number = Math.abs(_number);
    const formatter = new Intl.NumberFormat('en-US', { notation: 'compact' });
    return formatter.format(number);
}

const getTotalPortfolioValue = (portfolio) => {
    const result = portfolio.reduce((acc, curr) => {
        return acc + (+curr.price || 0) * (+curr.quantity || 0);
    }, 0);
    return result.toFixed(0);
}

const getTotalInvestment = (portfolio) => {
    const result = portfolio.reduce((acc, curr) => {
        return acc + curr.averagePrice * curr.quantity;
    }, 0);
    return result.toFixed(0);
}

const getTopLoss = (portfolio) => {
    const result = portfolio.map(i => {
        const data = {
            amount: +i.price * +i.quantity - +i.averagePrice * +i.quantity,
            item: i
        }
        return data
    }).sort((a, b) => a.amount - b.amount)[0];
    return result;
}

const getTopGain = (portfolio) => {
    const result = portfolio.map(i => {
        const data = {
            amount: +i.price * +i.quantity - +i.averagePrice * +i.quantity,
            item: i
        }
        return data
    }).sort((a, b) => b.amount - a.amount)[0];
    return result;
}

const getPnl = (portfolio) => {
    const result = portfolio.reduce((acc, curr) => {
        return acc + ((+curr.price || 0)* (+curr.quantity || 0) - (+curr.averagePrice || 0) * (+curr.quantity || 0));
    }, 0);
    return result.toFixed(0);
}

const getPercentagePnl = (portfolio) => {
    const totalInvestment = getTotalInvestment(portfolio);
    const portfolioValue = getTotalPortfolioValue(portfolio);
    const result = (portfolioValue - totalInvestment) / totalInvestment * 100;
    return result.toFixed(2);
}

const getPercentHoldings = (portfolio) => {
    const portfolioValue = getTotalPortfolioValue(portfolio);
    const result = portfolio.map(i => {
        const data = {
            percentage: (+i.price * +i.quantity) / portfolioValue * 100,
            item: i
        }
        return data
    }).sort((a, b) => b.percentage - a.percentage);
    return result;
}

const getOneSymbolPercentHoldings = (portfolioValue, quantity, price) => {
    const result = (+price * +quantity) / portfolioValue * 100;
    return result.toFixed(2);
}


export {
    addCommaToNumber,
    getTotalInvestment,
    numberFormatter,
    getTotalPortfolioValue,
    getTopLoss,
    getTopGain,
    getPnl,
    getPercentagePnl,
    getPercentHoldings,
    getOneSymbolPercentHoldings
};