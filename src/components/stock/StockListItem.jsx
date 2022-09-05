import { useState } from 'react'
import { Menu } from '../';
import { moreIcon, starEmptyIcon, walletIcon } from '../../assets/icons';
import './styles/StockListItem.css'

const StockListItem = ({item}) => {
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
        <div className="list-item-wrapper">
            {open &&
                <Menu open={open} setOpen={setOpen} items={menuItems}/>
            }
            <div className="list-item menu-btn"
                onClick={() => setOpen(!open)}
            >
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
        </div>
    )
}

export default StockListItem