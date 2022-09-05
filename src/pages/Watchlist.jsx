import { shareIcon, trashIcon } from '../assets/icons'
import testStock from '../assets/testStock.json'
import { Box, StockListItem, PopularStock } from '../components'

const Watchlist = () => {
  const listMenuItems = [
    {
      title: "Delete",
      icon: trashIcon,
      onClick: () => {
          console.log('Add to portfolio');
      }
    },
  ]
  const watchlistMenuItems = [
    {
      title: "Share",
      icon: shareIcon,
      onClick: () => {
          console.log('Share');
      }
    },
  ]

  return (
    <div className="content-body">
      <div className="flex justify-between gap-5 flex-sm-col">
        <div className="flex-grow-2 order-sm-2">
          <Box title="Watchlist" menuItems={watchlistMenuItems} size="lg">
            <div className="flex flex-col">
              {testStock.map((item, index) => (
                <StockListItem
                  key={index}
                  item={item}
                  menuItems={listMenuItems}
                  index={index}
                  className={
                    index === 0 ? 'border-t-r border-bottom' :
                    index+1 === testStock.length ? 'border-b-r' : 'border-bottom'
                  }
                />
              ))}
            </div>
          </Box>
        </div>
        <div className="flex flex-col flex-grow-1 gap-5 order-sm-1">
          <Box title="Performance" size="lg">
            <div className="flex flex-col flex-sm-row">
              <div className="flex-grow-1">
                <h4 className="weight-500 p-3">
                  Best of the day
                </h4>
                <PopularStock item={testStock.sort((a, b) => +b.priceChange - a.priceChange)[0]} menuItems={listMenuItems} />
              </div>
              <div className="flex-grow-1">
                <h4 className="weight-500 p-3">
                  Worst of the day
                </h4>
                <PopularStock item={testStock.sort((a, b) => +a.priceChange - b.priceChange)[0]} menuItems={listMenuItems} />
              </div>
            </div>
          </Box>
        </div>
      </div>
    </div>
  )
}

export default Watchlist