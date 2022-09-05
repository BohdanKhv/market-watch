import { useState } from 'react'
import { Menu } from '../';
import { moreIcon, starEmptyIcon, walletIcon } from '../../assets/icons';
import './styles/PopularStock.css'

const PopularStock = ({item, className}) => {
    const [open, setOpen] = useState(false);

    const menuItems = [
        {
            title: 'Add to watchlist',
            icon: starEmptyIcon,
            onClick: () => {
                console.log('Add to watchlist');
                setOpen(false);
            }
        },
        {
            title: 'Add to portfolio',
            icon: walletIcon,
            onClick: () => {
                console.log('Add to portfolio');
                setOpen(false);
            }
        }
    ]

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
            <div className="popular-stock-pnl">
                5.5% <span className="text-secondary">this week</span>
            </div>
        </div>
    )
}

export default PopularStock