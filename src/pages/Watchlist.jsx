import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { shareIcon } from '../assets/img/icons'
import { updateFavoritePrice } from '../features/local/localSlice'
import { Box, StockListItem, PopularStock, Alert } from '../components'
import socket from '../socket'


const ShareWatchlist = () => {
  const [alert, setAlert] = useState('');
  const { favorite } = useSelector(state => state.local);
  const dispatch = useDispatch();

  const watchlistMenuItems = [
    {
      title: "Share",
      icon: shareIcon,
      onClick: () => {
        const str = '?q=' + favorite.map(item => item.symbol).join(',');
        const domain = window.location.origin;
        const url = domain + "/watchlist/share" + str;
        // navigator.clipboard.writeText(url);
        // setAlert('Copied to clipboard');
        // Share
        navigator.share({
          title: 'Stocks',
          // text: 'Check out my watchlist',
          url: url,
        });
      }
    },
  ]

  useEffect(() => {
    document.title = 'STOKIN - Watchlist';
    window.scrollTo(0, 0);
  }, [])

  useEffect(() => {
    // Open connection
    socket.addEventListener('open', function (event) {
      favorite.forEach(stock => {
        socket.readyState === 1 && socket.send(JSON.stringify({'type':'subscribe', 'symbol': stock.symbol}))
      })
    });

    // Listen for messages
    socket.addEventListener('message', function (event) {
      if(event.data) {
        dispatch(updateFavoritePrice(JSON.parse(event.data)))
      }
    });

    // Unsubscribe
    var unsubscribe = function(symbol) {
      socket.readyState === 1 && socket.send(JSON.stringify({'type':'unsubscribe','symbol': symbol}))
    }

    return () => {
      socket.readyState === 1 && unsubscribe && favorite.forEach(stock => {
        unsubscribe(stock.symbol)
      })
    }
  }, [favorite])

  return (
    <div className="content-body">
      {alert.length > 0 && <Alert msg={alert} type='success' setAlert={setAlert} />}
      {favorite.length > 0 ? (
      <div className="flex justify-between gap-4 flex-sm-col">
        <div className="flex-grow-2 order-sm-2">
          <Box title="Watchlist" menuItems={watchlistMenuItems} size="lg">
            <div className="flex flex-col">
              {favorite.map((item, index) => (
                <StockListItem
                  key={index}
                  item={item}
                  index={index}
                  setAlert={setAlert}
                  className={
                    index === 0 && index+1 === favorite.length ? 'border-t-r border-b-r' :
                    index === 0 ? 'border-t-r border-bottom' :
                    index+1 === favorite.length ? 'border-b-r' : 'border-bottom'
                  }
                />
              ))}
            </div>
          </Box>
        </div>
        {favorite.length > 4 && (
          <div className="flex flex-col flex-grow-1 gap-4 order-sm-1">
            <Box title="Performance" size="lg">
              <div className="flex flex-col flex-sm-row">
                <div className="flex-grow-1">
                  <h4 className="weight-500 p-3 border-bottom mb-1">
                    Best of the day
                  </h4>
                  <PopularStock item={[...favorite].sort((a, b) => (+b.changePercent || 0) - (+a.changePercent || 0))[0]} />
                </div>
                <div className="flex-grow-1">
                  <h4 className="weight-500 p-3 border-bottom mb-1">
                    Worst of the day
                  </h4>
                  <PopularStock item={[...favorite].sort((a, b) => (+a.changePercent || 0) - (+b.changePercent || 0))[0]} />
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

export default ShareWatchlist