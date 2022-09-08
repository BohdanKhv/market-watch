import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { trashIcon, shareIcon } from '../assets/icons'
import { Box, StockPortfolio, Holdings, Summary, Total, Alert } from '../components'
import testStock from '../assets/testStock.json'

const listMenuItems = [
  {
    title: "Delete",
    icon: trashIcon
  },
  {
    title: "Share",
    icon: shareIcon
  }
]

const Portfolio = () => {
  const [alert, setAlert] = useState('')
  const [searchParams, setSearchParams] = useSearchParams();
  const [shared, setShared] = useState(false);
  const { portfolio } = useSelector(state => state.local)
  const [items, setItems] = useState(portfolio || []);

  useEffect(() => {
    const query = searchParams.get('q');
    const arr = [];
    if(query && query.length > 5) {
      query.split(',').forEach(item => {
        let stockInfo = item.split(':');

        if(stockInfo) {
          let stock = testStock.find(i => i.symbol.toUpperCase() === stockInfo[0].toUpperCase());
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

      setShared(true);
      setItems(arr);
    }
  }, [searchParams])

  useEffect(() => {
    document.title = 'STOKIN - Portfolio';
    window.scrollTo(0, 0);
  }, [])

  return (
    <div className="content-body">
    {alert.length > 0 && <Alert msg={alert} type='success' setAlert={setAlert} />}
      {items.length > 0 ? (
      <div className="flex justify-between gap-4 flex-sm-col flex-wrap">
        <div className="flex-grow-2 order-sm-2">
          <Box title="Portfolio" secondary={shared ? "Shared" : ''} menuItems={listMenuItems} size="lg">
            <div className="flex flex-col justify-between flex-wrap">
              {items.map((item, index) => (
                <StockPortfolio
                  key={index}
                  item={item}
                  index={index}
                  setAlert={setAlert}
                  className={
                    index === 0 && index+1 === items.length ? 'border-t-r border-b-r' :
                    index === 0 ? 'border-t-r border-bottom' :
                    index+1 === items.length ? 'border-b-r' : 'border-bottom'
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
              <Total sharedPortfolio={items}/>
              <Summary sharedPortfolio={items}/>
            </div>
          </div>
          <div className="flex-grow-1 order-sm-3">
            <Holdings sharedPortfolio={items}/>
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

export default Portfolio