import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { addCommaToNumber, getTopLoss, getTopGain, getPnl, getPercentagePnl } from '../../assets/utils'
import { Box } from '../'

const Summary = () => {
    const [topLoss, setTopLoss] = useState(0);
    const [topGain, setTopGain] = useState(0);
    const [pnl, setPnl] = useState(0);
    const [percentPnl, setPercentPnl] = useState(0);
    const { portfolio } = useSelector(state => state.local)

    useEffect(() => {
        setTopLoss(getTopLoss(portfolio));
        setTopGain(getTopGain(portfolio));
        setPnl(getPnl(portfolio));
        setPercentPnl(getPercentagePnl(portfolio));
    }, [portfolio])

    return (
        <div className="flex-grow-sm-1">
            <div className="box-content">
                <div className="p-3 p-sm-75 flex flex-col gap-4 white-space-nowrap">
                    <div>
                        <h4 className="text-secondary weight-400">
                            P&L
                        </h4>
                        <div className={`flex justify-between align-center pt-2 px-1 gap-4 ${pnl > 0 ? 'text-success' : pnl < 0 ? 'text-danger' : 'text-secondary' }`}>
                            <h3 className="weight-400">
                            {pnl > 0 ? '+ ' : pnl < 0 ? '- ' : ''}$ {addCommaToNumber(pnl)?.replace('-', '')}
                            </h3>
                            <h5 className="fs-12 weight-400">
                            {percentPnl > 0 ? '+' : percentPnl < 0 ? '-' : ''} {percentPnl?.toString()?.replace('-', '')}%
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
                            {topGain.amount > 0 ? '+ ' : topGain.amount < 0 ? '- ' : ''}{addCommaToNumber(topGain.amount?.toFixed(2))?.replace('-', '')}
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
                            {topLoss.amount > 0 ? '+ ' : topLoss.amount < 0 ? '- ' : ''}{addCommaToNumber(topLoss.amount?.toFixed(2))?.replace('-', '')}
                            </h5>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Summary