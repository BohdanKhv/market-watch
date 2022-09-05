const addCommaToNumber = (_number) => {
    return _number?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const numberFormatter = (_number) => {
    // format 1000 to 1k or 1000000 to 1m etc
    const number = +_number;
    const suffixes = ['', 'K', 'M', 'B', 'T'];
    const suffixIndex = Math.floor(Math.log10(number) / 3);
    return `${Math.round(number / Math.pow(10, suffixIndex * 3))}${suffixes[suffixIndex]}`;
}

const getTotalPortfolioValue = (portfolio) => {
    const result = portfolio.reduce((acc, curr) => {
        return acc + curr.price * curr.quantity;
    }, 0);
    return result;
}

const getTopLoss = (portfolio) => {
    const result = portfolio.map(i => {
        const data = {
            amount: +i.price * +i.quantity - +i.perchesPrice * +i.quantity,
            item: i
        }
        return data
    }).sort((a, b) => a.amount - b.amount)[0];
    return result;
}

const getTopGain = (portfolio) => {
    const result = portfolio.map(i => {
        const data = {
            amount: +i.price * +i.quantity - +i.perchesPrice * +i.quantity,
            item: i
        }
        return data
    }).sort((a, b) => b.amount - a.amount)[0];
    return result;
}

const getPnl = (portfolio) => {
    const result = portfolio.reduce((acc, curr) => {
        return acc + (+curr.price * +curr.quantity - +curr.perchesPrice * +curr.quantity);
    }, 0);
    return result;
}

const getPercentagePnl = (portfolio) => {
    const result = portfolio.reduce((acc, curr) => {
        return acc + (+curr.price * +curr.quantity - +curr.perchesPrice * +curr.quantity) / (+curr.perchesPrice * +curr.quantity);
    }, 0);
    return result.toFixed(2);
}

export {
    addCommaToNumber,
    numberFormatter,
    getTotalPortfolioValue,
    getTopLoss,
    getTopGain,
    getPnl,
    getPercentagePnl,
};