import './styles/StockListItem.css'

const StockListItem = ({item}) => {
    return (
        <div className="list-item">
            <div className="list-item__logo">
                <img src={item.logo} alt={item.name} />
            </div>
            <div className="list-item__name">
                <div className="list-item__symbol">{item.symbol}</div>
                <div className="list-item__name__title">{item.name}</div>
            </div>
            <div className="list-item__price">
                <div className="list-item__last__price">{item.price}</div>
                <div className={`list-item__change${item.priceChange > 0 ? ' list-item__last__change-positive' : item.priceChange < 0 ? ' list-item__last__change-negative' : ''}`}>{item.priceChange > 0 && '+'}{item.priceChange}</div>
            </div>
        </div>
    )
}

export default StockListItem