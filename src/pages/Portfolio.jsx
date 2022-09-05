import { useState, useEffect } from 'react'
import { trashIcon, shareIcon } from '../assets/icons'
import testPortfolio from '../assets/testPortfolio.json'
import { Box, StockPortfolio, Holdings, Summary, Total } from '../components'

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
  useEffect(() => {
    document.title = 'STOKIN - Portfolio';
    window.scrollTo(0, 0);
  }, [])

  return (
    <div className="content-body">
      <div className="flex justify-between gap-5 flex-sm-col flex-wrap">
        <div className="flex-grow-2 order-sm-2">
          <Box title="Portfolio" menuItems={listMenuItems} size="lg">
            <div className="flex flex-col justify-between flex-wrap">
              {testPortfolio.map((item, index) => (
                <StockPortfolio
                  key={index}
                  item={item}
                  index={index}
                  className={
                    index === 0 ? 'border-t-r border-bottom' :
                    index+1 === testPortfolio.length ? 'border-b-r' : 'border-bottom'
                  }
                />
              ))}
            </div>
          </Box>
        </div>
        <div className="flex flex-col flex-grow-1 gap-5 flex-sm-row order-sm-1 flex-sm-wrap">
          <Total/>
          <Summary/>
        </div>
        <div className="flex-grow-1 order-sm-3">
        <Holdings/>
        </div>
      </div>
    </div>
  )
}

export default Portfolio