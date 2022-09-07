import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { getTotalPortfolioValue, addCommaToNumber } from '../../assets/utils'
import { Box } from '../'

const Total = () => {
    const [totalPortfolioValue, setTotalPortfolioValue] = useState(0);
    const { portfolio } = useSelector(state => state.local)

    useEffect(() => {
        setTotalPortfolioValue(getTotalPortfolioValue(portfolio));
    }, [portfolio])

    return (
        <div className="flex-grow-sm-1 flex-b-50">
            <div className="box-content">
                <div className="p-3 p-sm-75 flex flex-col gap-4 white-space-nowrap">
                    <div>
                        <h4 className="text-secondary weight-400">
                            Market Value
                        </h4>
                        <div className="pt-2 px-1 grid">
                            <div className="w-min-0">
                                <div className="fs-16 text-ellipsis">
                                    $ {addCommaToNumber(totalPortfolioValue)}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                    <h4 className="text-secondary weight-400">
                        Companies
                    </h4>
                    <div className="flex justify-between align-center pt-2 px-1">
                        <h3 className="weight-400">
                        {addCommaToNumber(portfolio.length)}
                        </h3>
                    </div>
                    </div>
                    <div>
                    <h4 className="text-secondary weight-400">
                        Shares
                    </h4>
                    <div className="flex justify-between align-center pt-2 px-1">
                        <h3 className="weight-400">
                        {addCommaToNumber(portfolio.reduce((acc, item) => acc + +item.quantity, 0))}
                        </h3>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Total