import { useParams } from "react-router-dom"
import { ChartView, StockListItem } from '../components'
import testStock from '../assets/testStock.json'

const Chart = () => {
    const { symbol } = useParams();

    return (
        symbol &&
        <>
            <StockListItem item={testStock.find(i=>i.symbol.toLowerCase() === symbol.toLowerCase())} />
            <ChartView symbol={symbol} />
        </>
    )
}

export default Chart