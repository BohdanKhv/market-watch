import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setSharedStocks, resetSharedStocks } from '../features/stock/stockSlice'
import { shareIcon } from '../assets/img/icons'
import { getTotalPortfolioValue } from '../assets/utils'
import { Box, StockPortfolio, Summary, Total, Alert } from '../components'
import stocks from '../assets/data/stocks.json'


const SharePortfolio = () => {
  const [alert, setAlert] = useState('')
  const [searchParams, setSearchParams] = useSearchParams();
  const { sharedStocks } = useSelector(state => state.stock);
  const dispatch = useDispatch();
  const [totalPortfolioValue, setTotalPortfolioValue] = useState(0);

  useEffect(() => {
    if(sharedStocks.length > 0) {
      setTotalPortfolioValue(getTotalPortfolioValue(sharedStocks));
    }
  }, [sharedStocks])

  const listMenuItems = [
    {
      title: "Share",
      icon: shareIcon,
      onClick: () => {
        const str = '?q=' + sharedStocks
        .map(item =>
          item.symbol.toUpperCase() + ":"
        + item.quantity + ":"
        + item.averagePrice
        )
        .join(',');
        const domain = window.location.origin;
        const url = domain + "/portfolio/share" + str;
        // navigator.clipboard.writeText(url);
        // setAlert('Copied to clipboard');
        // Share
        navigator.share({
          title: 'Stocks',
          // text: 'Check out my portfolio',
          url: url,
        });
      }
    }
  ]

  useEffect(() => {
    const query = searchParams.get('q');
    const arr = [];
    if(query && query.length > 5) {
      query.split(',').forEach(item => {
        let stockInfo = item.split(':');

        if(stockInfo) {
          let stock = stocks.find(i => i.symbol.toUpperCase() === stockInfo[0].toUpperCase());
          if(stock) {
            arr.push({
              ...stock,
              quantity: stockInfo[1] || '',
              averagePrice: stockInfo[2] || '',
            });
          }
        } else {
          return
        }

      })

      dispatch(setSharedStocks(arr));
    }

    return () => {
      dispatch(resetSharedStocks());
    }
  }, [searchParams])

  useEffect(() => {
    document.title = 'STOKIN - Shared Portfolio';
    window.scrollTo(0, 0);
  }, [])

  return (
    <div className="content-body">
    {alert.length > 0 && <Alert msg={alert} type='success' setAlert={setAlert} />}
      {sharedStocks.length > 0 ? (
      <div className="flex justify-between gap-4 flex-sm-col flex-wrap">
        <div className="flex-grow-2 order-sm-2">
            <Box title="Portfolio" menuItems={listMenuItems} size="lg">
              <div className="flex flex-col justify-between flex-wrap">
                <div className="flex gap-4 p-3 px-sm-2 border-bottom">
                  <div className="text-secondary fs-14 weight-400 flex-grow-1">
                    Company
                  </div>
                  <div className="text-secondary fs-14 mw-50-px text-end weight-400">
                    Qty
                  </div>
                  <div className="text-secondary fs-14 mw-50-px text-end weight-400">
                    Avg
                  </div>
                  <div className="text-secondary fs-14 mw-50-px text-end weight-400">
                    Curr
                  </div>
                </div>
                {sharedStocks.map((item, index) => (
                  <StockPortfolio
                    key={index}
                    item={item}
                    index={index}
                    portfolioValue={totalPortfolioValue}
                    setAlert={setAlert}
                    className={
                      index+1 === sharedStocks.length ? 'border-b-r' : 'border-bottom'
                    }
                  />
                ))}
              </div>
            </Box>
        </div>
        <div className="flex flex-col flex-grow-1 gap-4 order-sm-1 flex-sm-wrap">
          <div className="flex-grow-1">
            <h2 className="title-1 px-2 pb-4">
              Summary
            </h2>
            <div className="flex flex-col gap-3 flex-sm-row">
                <Total portfolio={sharedStocks}/>
                <Summary portfolio={sharedStocks}/>
            </div>
          </div>
        </div>
      </div>
      ) : (
        <div className="flex flex-col justify-center align-center">
          <h1 className="weight-500 text-center mt-5">
            You don't have any stocks in your items.
          </h1>
          <h4 className="weight-500 text-center my-5">
            Add stocks to your portfolio to see them here.
          </h4>
          <div className="flex justify-center align-center mt-4"
            onClick={() => {
              document.querySelector('#search-input').focus();
            }}
          >
            <div className="btn btn-secondary">
              Add Stocks
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SharePortfolio