import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { getPercentHoldings } from '../../assets/utils'
import { Box } from '../'

const Holdings = ({sharedPortfolio}) => {
    const [percentHoldings, setPercentHoldings] = useState([]);
    const { portfolio } = useSelector(state => state.local)
    const [items, setItems] = useState(sharedPortfolio || portfolio || []);

    useEffect(() => {
        setPercentHoldings(getPercentHoldings(items));
    }, [])

    return (
        <Box title="Holdings" size="sm">
            <div className="py-3 flex flex-col py-sm-2">
                <div className="flex p-3 p-sm-75 justify-between align-center flex-grow-1 gap-5 border-bottom">
                    <h4 className="text-secondary weight-400">
                        Symbol
                    </h4>
                    <div className="flex justify-between align-center">
                        <h4 className="text-secondary weight-400">
                            %
                        </h4>
                    </div>
                </div>
                {percentHoldings.map((item, index) => (
                    <div key={index} className={`flex justify-between align-center p-3 flex-grow-1 hover${index+1 === percentHoldings.length ? "" : " border-bottom"}`}>
                        <h4 className="weight-400">
                        {item.item.symbol}
                        </h4>
                        <div className="flex justify-between align-center">
                            <h3 className="weight-400">
                                {item.percentage.toFixed(2)}%
                            </h3>
                        </div>
                    </div>
                ))}
            </div>
        </Box>
    )
}

export default Holdings