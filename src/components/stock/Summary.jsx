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
        <div className="flex-grow-sm-1 flex-b-75">
            <div className="box-content">
                <div className="p-3 p-sm-75 flex flex-col gap-4 white-space-nowrap">
                    <div>
                        <h4 className="text-secondary weight-400">
                            P&L
                        </h4>
                        <div className={`flex flex-wrap justify-between align-center pt-2 px-1 ${pnl > 0 ? 'text-success' : pnl < 0 ? 'text-danger' : 'text-secondary' }`}>
                            <div className="flex-b-65 w-min-0">
                                <div className="fs-16 text-ellipsis">
                                    {pnl > 0 ? '+ ' : pnl < 0 ? '- ' : ''}$ {addCommaToNumber(pnl)?.replace('-', '')}
                                </div>
                            </div>
                            <div className="flex-b-35 w-min-0 text-end">
                                <div className="fs-12 text-ellipsis">
                                    {percentPnl > 0 ? '+' : percentPnl < 0 ? '-' : ''} {(+percentPnl)?.toFixed(2)?.toString()?.replace('-', '')}%
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h4 className="text-secondary weight-400">
                            Top Gain
                        </h4>
                        <div className="flex justify-between align-center pt-2 px-1">
                            <div className="flex-b-50 w-min-0">
                                <div className="fs-16">
                                    {topGain?.item?.symbol}
                                </div>
                            </div>
                            <div className="flex-b-50 w-min-0 text-end">
                                <div className="fs-12 text-ellipsis text-success">
                                    {topGain.amount > 0 ? '+ ' : topGain.amount < 0 ? '- ' : ''}{addCommaToNumber(topGain.amount?.toFixed(0))?.replace('-', '')}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h4 className="text-secondary weight-400">
                            Top Loss
                        </h4>
                        <div className="flex justify-between align-center pt-2 px-1">
                            <div className="flex-b-50 w-min-0">
                                <div className="fs-16">
                                {topLoss?.item?.symbol}
                                </div>
                            </div>
                            <div className="flex-b-50 w-min-0 text-end">
                                <div className="fs-12 text-ellipsis text-danger">
                                    {topLoss.amount > 0 ? '+ ' : topLoss.amount < 0 ? '- ' : ''}{addCommaToNumber(topLoss.amount?.toFixed(0))?.replace('-', '')}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Summary