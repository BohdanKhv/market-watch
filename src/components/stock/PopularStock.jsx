import { Avatar } from '../'
import './styles/PopularStock.css'

const PopularStock = ({item, className, menuItems}) => {

    return (
        <div className={`popular-stock-card${className ? ` ${className}` : ''}`}>
            <div className="popular-stock-header align-center gap-3 flex-wrap">
                <div className="popular-stock-logo">
                    <Avatar 
                        image={
                            item.logo ?
                            "https://stocks-logo.s3.us-east-2.amazonaws.com/logos/" +
                            item.logo + 
                            "-sm.svg"
                            :
                            null
                        }
                        size="full"
                        name={item.symbol}
                    />
                </div>
                <div className="flex flex-col align-end gap-2 flex-grow-1 justify-between">
                    <div className="fs-14 flex flex-col align-end text-end">
                        <h3>{item.symbol}</h3>
                        {/* <h5 className="text-secondary">
                            {item.name}
                        </h5> */}
                    </div>
                    <span className="fs-12">
                        {item.price ? item.price?.toString()?.replace('-', '') : '0.00'}
                    </span>
                    <span className={`${+item?.changePercent > 0 ? "text-success" : +item?.changePercent < 0 ? 'text-danger' : 'text-secondary'}`}>
                        {+item?.changePercent > 0 ? "+" : +item?.changePercent < 0 ? '-' : ''}{item?.changePercent ? item?.changePercent?.toFixed(2)?.toString().replace('-', '') : '0'}%
                    </span>
                </div>
            </div>
        </div>
    )
}

export default PopularStock