import { trashIcon, shareIcon } from '../assets/icons'
import testStock from '../assets/testStock.json'
import { Box, StockListItem } from '../components'

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
  return (
    <div className="content-body">
      <div className="flex justify-between gap-5">
        <div className="flex-grow-2">
          <Box title="Watchlist" menuItems={listMenuItems} size="lg">
            <div className="flex flex-col">
              {testStock.map((item, index) => (
                <StockListItem key={index} item={item} />
              ))}
            </div>
          </Box>
        </div>
        <div className="flex flex-col flex-grow-1 gap-5">
          <Box title="Portfolio">
            <div className="p-3">
              <h2>$ 800.55</h2>
            </div>
          </Box>
          <Box title="Summary">
            <div className="p-3 flex flex-col gap-3">
                <div>
                  <h4 className="text-secondary weight-400">
                    P/L
                  </h4>
                  <h3 className="pt-1 weight-400">
                    $ 100.55
                  </h3>
                </div>
                <div>
                  <h4 className="text-secondary weight-400">
                    Top Gain
                  </h4>
                  <div className="flex justify-between align-center">
                    <h3 className="text-success pt-1 weight-400">
                      $ 25.50
                    </h3>
                    <h5 className="text-success pt-1 weight-400">
                      +5.55%
                    </h5>
                  </div>
                </div>
                <div>
                  <h4 className="text-secondary weight-400">
                    Top Loss
                  </h4>
                  <div className="flex justify-between align-center">
                    <h3 className="text-danger pt-1 weight-400">
                      $ -10.55
                    </h3>
                    <h5 className="text-danger pt-1 weight-400">
                      -1.55%
                    </h5>
                  </div>
                </div>
              </div>
          </Box>
        </div>
      </div>
    </div>
  )
}

export default Portfolio