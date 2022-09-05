import { useState } from 'react'
import { Menu } from '../';
import { walletIcon } from '../../assets/icons';
import { AddToPortfolio } from '../'
import './styles/StockListItem.css'

const StockListItem = ({item, menuItems, index, className}) => {
    const [addToPortfolioOpen, setAddToPortfolioOpen] = useState(false)
    const [open, setOpen] = useState(false);

    const newMenuItems = [
        {
            title: "Add to Portfolio",
            icon: walletIcon,
            onClick: (item) => {
                setAddToPortfolioOpen(true);
            }
            },
        ...menuItems
    ]

    return (
        <div className={`list-item-wrapper${className ? ` ${className}` : ''}`}>
            <AddToPortfolio modalIsOpen={addToPortfolioOpen} setModalIsOpen={setAddToPortfolioOpen} item={item} />
            {open &&
                <Menu open={open} setOpen={setOpen} items={newMenuItems} index={index+1}/>
            }
            <div className={`list-item menu-btn gap-3${open ? ' bg-secondary' : ''}`}
                onClick={() => setOpen(!open)}
                data-menu-index={index+1}
            >
                <div className="list-item-logo">
                    <img src={item.logo} alt={item.name} />
                </div>
                <div className="list-item-name">
                    <div className="list-item-symbol">{item.symbol}</div>
                    <div className="list-item-name-title">{item.name}</div>
                </div>
                <div className="list-item-price">
                    <div className="list-item-last-price">{item.price}</div>
                    <div className={`list-item-change${item.priceChange > 0 ? ' list-item-last-change-positive' : item.priceChange < 0 ? ' list-item-last-change-negative' : ''}`}>{item.priceChange > 0 && '+'}{item.priceChange}</div>
                </div>
            </div>
        </div>
    )
}

export default StockListItem