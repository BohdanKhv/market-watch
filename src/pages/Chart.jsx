import { useParams } from "react-router-dom"
import { ChartView, StockSearch } from '../components'
import stock from '../assets/data/stocks.json'

const Chart = () => {
    const { symbol } = useParams();

    return (
        symbol &&
        <div className="mb-5 pb-5">
            <StockSearch
                item={stock.find(i => i.symbol.toLowerCase() === symbol.toLowerCase())}
                index={1}
            />
            <ChartView symbol={symbol} />
        </div>
    )
}

export default Chart