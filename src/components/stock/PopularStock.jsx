import './styles/PopularStock.css'

const PopularStock = ({item, className}) => {
    return (
        <div className={`popular-stock-card${className ? ` ${className}` : ''}`}>
            <div className="popular-stock-logo">
                <img src={item.logo} alt="logo" />
            </div>
            <div className="popular-stock-name">
                <h3>{item.symbol}</h3>
                <h5>
                    {item.name}
                </h5>
            </div>
            <div className="popular-stock-pnl">
                5.5% <span className="text-secondary">this week</span>
            </div>
        </div>
    )
}

export default PopularStock