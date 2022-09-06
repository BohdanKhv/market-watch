import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { trashIcon, shareIcon } from '../assets/icons'
import { Box, StockPortfolio, Holdings, Summary, Total, Alert } from '../components'

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
  const { portfolio } = useSelector(state => state.local)

  useEffect(() => {
    document.title = 'STOKIN - Portfolio';
    window.scrollTo(0, 0);
  }, [])

  return (
    <div className="content-body">
    {alert.length > 0 && <Alert msg={alert} type='success' setAlert={setAlert} />}
      {portfolio.length > 0 ? (
      <div className="flex justify-between gap-4 flex-sm-col flex-wrap">
        <div className="flex-grow-2 order-sm-2">
          <Box title="Portfolio" menuItems={listMenuItems} size="lg">
            <div className="flex flex-col justify-between flex-wrap">
              {portfolio.map((item, index) => (
                <StockPortfolio
                  key={index}
                  item={item}
                  index={index}
                  setAlert={setAlert}
                  className={
                    index === 0 && index+1 === portfolio.length ? 'border-t-r border-b-r' :
                    index === 0 ? 'border-t-r border-bottom' :
                    index+1 === portfolio.length ? 'border-b-r' : 'border-bottom'
                  }
                />
              ))}
            </div>
          </Box>
        </div>
        <div className="flex flex-col flex-grow-1 gap-4 flex-sm-row order-sm-1 flex-sm-wrap">
          <Total/>
          <Summary/>
          <div className="flex-grow-1 order-sm-3">
            <Holdings/>
          </div>
        </div>
      </div>
      ) : (
        <div className="flex flex-col justify-center align-center">
          <h1 className="weight-500 text-center mt-5">
            You don't have any stocks in your portfolio.
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