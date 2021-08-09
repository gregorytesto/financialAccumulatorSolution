const bitcoinTrades = require('./data/bitcoinTrades.json');
const etheriumTrades = require('./data/etheriumTrades.json');
const currencies = require('./data/currencies.json');

// Use the bitcoinTrades and etheriumTrades variables above to solve these
// Round to two decimal places

// Issue: ToFixed returns a string, so we have to convert it back to a number
// This is a helper function that rounds and converts
function roundNum(num){
    return Number(num.toFixed(2));
}

// Find the totalPrice
function findTotalPrice(trades){
    let totalPrice=0;
    for(let trade of trades){
        totalPrice+=Number(trade.price);
    }
    return roundNum(totalPrice);
}
// Find the highestPrice
function findHighestPrice(trades){
    let highestPrice = trades[0];
    for(let trade of trades){
        if(trade.price > highestPrice.price){
            highestPrice = trade;
        }
    }
    return roundNum(Number(highestPrice.price));
}
// Find the averagePrice
function findAveragePrice(trades){
    return roundNum(findTotalPrice(trades)/trades.length);
}
// Find the lowestPrice
function findLowestPrice(trades){
    let lowestPrice = trades[0];
    for(let trade of trades){
        if(trade.price < lowestPrice.price){
            lowestPrice = trade;
        }
    }
    return roundNum(Number(lowestPrice.price))
}

// Find the totalSize
function findTotalSize(trades){
    let totalSize=0;
    for(let trade of trades){
        totalSize+=Number(trade.size);
    }
    return roundNum(totalSize);
}
// Find the highestSize
function findHighestSize(trades){
    let highestSize = trades[0];
    for(let trade of trades){
        if(trade.size > highestSize.size){
            highestSize = trade;
        }
    }
    return roundNum(Number(highestSize.size))
}
// Find the averageSize
function findAverageSize(trades){
    return roundNum(findTotalSize(trades)/trades.length);
}
// Find the lowestSize
function findLowestSize(trades){
    let lowestSize = trades[0];
    for(let trade of trades){
        if(trade.size < lowestSize.size){
            lowestSize = trade;
        }
    }
    return roundNum(Number(lowestSize.size))
}

function findPriceDetails(trades, tradeType){

    // Filter out the trades by trade type i.e. buy/sell, if tradeType is not provided do not filter, if tradeType is an invalid input return an empty array
    let filteredTrades = [];
    for(let trade of trades){
        if(trade.side === tradeType || !tradeType){
            filteredTrades.push(trade);
        }
    }
    if(filteredTrades.length < 1){
        return [];
    }
    return {
        totalPrice: findTotalPrice(filteredTrades),
        totalSize: findTotalSize(filteredTrades),
        averagePrice: findAveragePrice(filteredTrades),
        averageSize: findAverageSize(filteredTrades),
        highestPrice: findHighestPrice(filteredTrades),
        lowestPrice: findLowestPrice(filteredTrades),
        highestSize: findHighestSize(filteredTrades),
        lowestSize: findLowestSize(filteredTrades)
    }
}
console.log(findPriceDetails(bitcoinTrades));

// >> {
//     totalPrice: xxx.19,
//     totalSize: xxx.58,
//     averagePrice: xxx.18,
//     averageSize: xxx.11,
//     highestPrice: xxx.03,
//     lowestPrice: xxx.9,
//     highestSize: xxx.34,
//     lowestSize: xxx
// }

// ---- Find the same data for Etherium ----
console.log(findPriceDetails(etheriumTrades));

// Use the currencies data variable above to solve these

// Return an object that contains the currency type as the key and an array of names/types strings as the value. See return type below for formatting
function findCurrencyTypeCounts(currencies){
    let countObj = {};
    for(let currency of currencies){
        let type = currency.details.type;
        if(!countObj[type]){
            countObj[type] = [];
        } else {
            countObj[type].push(currency.name + "(" + currency.id + ")");
        }
    }
    return countObj;
}
console.log(findCurrencyTypeCounts(currencies));
// {
//     crypto: [
//       'Dash(DASH)',
//       'Orchid(OXT)',
//       'Cosmos(ATOM)',
//     ...
//     ],
//     fiat: [ 'British Pound(GBP)', 'United States Dollar(USD)' ]
// }