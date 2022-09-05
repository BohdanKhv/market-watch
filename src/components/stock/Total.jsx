import { useState, useEffect } from 'react'
import testPortfolio from '../../assets/testPortfolio.json'
import { getTotalPortfolioValue, addCommaToNumber } from '../../assets/utils'
import { Box } from '../'

const Total = () => {
    const [totalPortfolioValue, setTotalPortfolioValue] = useState(0);

    useEffect(() => {
        setTotalPortfolioValue(getTotalPortfolioValue(testPortfolio));
    }, [])

    return (
        <div className="flex-grow-sm-1">
            <Box title="Total" size="lg">
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
    )
}

export default Total