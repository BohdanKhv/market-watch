import { useState, useEffect } from 'react'
import { trashIcon, shareIcon } from '../assets/icons'
import testPortfolio from '../assets/testPortfolio.json'
import { getTotalPortfolioValue, addCommaToNumber, getTopLoss, getTopGain, getPnl, getPercentagePnl } from '../assets/utils'
import { Box, StockPortfolio } from '../components'

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
  const [totalPortfolioValue, setTotalPortfolioValue] = useState(0);
  const [topLoss, setTopLoss] = useState(0);
  const [topGain, setTopGain] = useState(0);
  const [pnl, setPnl] = useState(0);
  const [percentPnl, setPercentPnl] = useState(0);

  useEffect(() => {
    setTotalPortfolioValue(getTotalPortfolioValue(testPortfolio));
    setTopLoss(getTopLoss(testPortfolio));
    setTopGain(getTopGain(testPortfolio));
    setPnl(getPnl(testPortfolio));
    setPercentPnl(getPercentagePnl(testPortfolio));
  }, [])

  return (
    <div className="content-body">
      <div className="flex justify-between gap-5 flex-sm-col">
        <div className="flex-grow-2 order-sm-2">
          <Box title="Portfolio" menuItems={listMenuItems} size="lg">
            <div className="flex flex-col justify-between flex-wrap">
              {testPortfolio.slice(4,8).map((item, index) => (
                <StockPortfolio key={index} item={item} />
              ))}
            </div>
          </Box>
        </div>
        <div className="flex flex-col flex-grow-1 gap-5 flex-sm-row order-sm-1">
          <div className="flex-grow-1">
            <Box title="Net Value" size="lg">
              <div className="p-3 flex flex-col gap-4">
              <div>
                <h4 className="text-secondary weight-400">
                  Market Value
                </h4>
                <h2 className="pt-1 weight-400 px-1">$ {addCommaToNumber(totalPortfolioValue)}</h2>
              </div>
              <div>
                <h4 className="text-secondary weight-400">
                  Companies
                </h4>
                <div className="flex justify-between align-center pt-2 px-1">
                  <h3 className="weight-400">
                    {addCommaToNumber(testPortfolio.length)}
                  </h3>
                </div>
              </div>
              <div>
                <h4 className="text-secondary weight-400">
                  Shares
                </h4>
                <div className="flex justify-between align-center pt-2 px-1">
                  <h3 className="weight-400">
                    {addCommaToNumber(testPortfolio.reduce((acc, item) => acc + +item.quantity, 0))}
                  </h3>
                </div>
              </div>
              </div>
            </Box>
          </div>
          <div className="flex-grow-1">
            <Box title="Summary" size="lg">
              <div className="p-3 flex flex-col gap-4">
                  <div>
                    <h4 className="text-secondary weight-400">
                      P&L
                    </h4>
                    <div className={`flex justify-between align-center pt-2 px-1 ${pnl > 0 ? 'text-success' : pnl < 0 ? 'text-danger' : 'text-secondary' }`}>
                      <h3 className="weight-400">
                        $ {addCommaToNumber(pnl)}
                      </h3>
                      <h5 className="fs-12 weight-400">
                        {percentPnl > 0 ? '+' : percentPnl < 0 ? '-' : ''} {percentPnl}%
                      </h5>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-secondary weight-400">
                      Top Gain
                    </h4>
                    <div className="flex justify-between align-center pt-2 px-1">
                      <h3 className="weight-400">
                        {topGain?.item?.symbol}
                      </h3>
                      <h5 className="text-success pt-1 weight-400">
                        $ {addCommaToNumber(topGain.amount)}
                      </h5>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-secondary weight-400">
                      Top Loss
                    </h4>
                    <div className="flex justify-between align-center pt-2 px-1">
                      <h3 className="weight-400">
                        {topLoss?.item?.symbol}
                      </h3>
                      <h5 className="text-danger pt-1 weight-400">
                        $ {addCommaToNumber(topLoss.amount)}
                      </h5>
                    </div>
                  </div>
                </div>
            </Box>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Portfolio