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
      <div className="flex justify-between gap-4 flex-sm-col">
        <div className="flex-grow-2">
          <Box title="Watchlist" menuItems={watchlistMenuItems} size="lg">
            <div className="flex flex-col">
              {testStock.map((item, index) => (
                <StockListItem key={index} item={item} menuItems={listMenuItems} index={index}/>
              ))}
            </div>
          </Box>
        </div>
        <div className="flex flex-col flex-grow-1 gap-5">
          <Box title="Performance" size="lg">
            <div className="border-bottom">
              <h4 className="weight-400 p-3">
                Best stock today
              </h4>
              <PopularStock item={testStock.sort((a, b) => +b.priceChange - a.priceChange)[0]} menuItems={listMenuItems} />
            </div>
            <div>
              <h4 className="weight-400 p-3">
                Worst stock today
              </h4>
              <PopularStock item={testStock.sort((a, b) => +a.priceChange - b.priceChange)[0]} menuItems={listMenuItems} />
            </div>
          </Box>
        </div>
      </div>
    </div>
  )
}

export default Watchlist