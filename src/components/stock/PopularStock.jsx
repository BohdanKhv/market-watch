import { useState } from 'react'
import { Menu } from '../';
import { moreIcon, starEmptyIcon, walletIcon } from '../../assets/icons';
import './styles/PopularStock.css'

const PopularStock = ({item, className, menuItems}) => {
    const [open, setOpen] = useState(false);

    return (
        <div className={`popular-stock-card${className ? ` ${className}` : ''}`}>
            <div className="popular-stock-header">
                <div className="popular-stock-logo">
                    <img src={item.logo} alt="logo" />
                </div>
                <div className="box-menu-more">
                    <div className="menu-btn"
                        onClick={(e) => setOpen(!open)}>
                        {moreIcon}
                    </div>
                    {open &&
                        <Menu open={open} setOpen={setOpen} items={menuItems}/>
                    }
                </div>
            </div>
            <div className="popular-stock-name">
                <h3>{item.symbol}</h3>
                <h5>
                    {item.name}
                </h5>
            </div>
            <div className="popular-stock-pnl flex justify-between">
                <span className={`${item.priceChange > 0 ? "text-success" : item.priceChange < 0 ? 'text-danger' : ''}`}>$ {item.priceChange}</span>
                {/* <span className="text-secondary">today</span> */}
            </div>
        </div>
    )
}

export default PopularStock