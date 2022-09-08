import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { shareIcon, trashIcon } from '../assets/icons'
import { Box, StockListItem, PopularStock, Alert } from '../components'
import testStock from '../assets/testStock.json'


const Watchlist = () => {
  const [alert, setAlert] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const [shared, setShared] = useState(false);
  const { favorite } = useSelector(state => state.local);
  const [items, setItems] = useState(favorite || []);

  const watchlistMenuItems = [
    {
      title: "Share",
      icon: shareIcon,
      onClick: () => {
        const str = '?q=' + items.map(item => item.symbol).join(',');
        const domain = window.location.origin;
        const url = domain + "/" + str;
        navigator.clipboard.writeText(url);
        setAlert('Copied to clipboard');
        // Share
        navigator.share({
          title: 'Stocks',
          text: 'Check out my watchlist',
          url: url,
        });
      }
    },
  ]

  useEffect(() => {
    const query = searchParams.get('q');
    const items = [];
    if(query && query.length > 0) {
      query.split(',').forEach(item => {
        if(item) {
          let stock = testStock.find(i => i.symbol.toUpperCase() === item.toUpperCase());
          if(stock) {
            items.push({
              ...stock
            });
          }
        } else {
          return
        }
      })

      setShared(true);
      setItems(items);
    }
  }, [searchParams])

  useEffect(() => {
    if(!shared) {
      setItems(favorite);
    }
  }, [favorite, shared])

  useEffect(() => {
    document.title = 'STOKIN - Watchlist';
    window.scrollTo(0, 0);
  }, [])

  return (
    <div className="content-body">
      {alert.length > 0 && <Alert msg={alert} type='success' setAlert={setAlert} />}
      {items.length > 0 ? (
      <div className="flex justify-between gap-4 flex-sm-col">
        <div className="flex-grow-2 order-sm-1">
          <Box title="Watchlist" secondary={shared ? "Shared" : ''} menuItems={watchlistMenuItems} size="lg">
            <div className="flex flex-col">
              {items.map((item, index) => (
                <StockListItem
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
        {items.length > 4 && (
          <div className="flex flex-col flex-grow-1 gap-4 order-sm-2">
            <Box title="Performance" size="lg">
              <div className="flex flex-col flex-sm-row">
                <div className="flex-grow-1">
                  <h4 className="weight-500 p-3 border-bottom mb-1">
                    Best of the day
                  </h4>
                  <PopularStock item={[...items].sort((a, b) => +b.priceChange - +a.priceChange)[0]} />
                </div>
                <div className="flex-grow-1">
                  <h4 className="weight-500 p-3 border-bottom mb-1">
                    Worst of the day
                  </h4>
                  <PopularStock item={[...items].sort((a, b) => +a.priceChange - +b.priceChange)[0]} />
                </div>
              </div>
            </Box>
          </div>
        )}
      </div>
      ) : (
        <div className="flex flex-col justify-center align-center">
          <h1 className="weight-500 text-center mt-5">
            You don't have any favorite stocks yet.
          </h1>
          <h4 className="weight-500 text-center my-5">
            Add stocks to your watchlist to see them here.
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

export default Watchlist