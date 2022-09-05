import { useState } from 'react'
import { Menu } from '../';
import { addCommaToNumber } from '../../assets/utils';
import { moreIcon, starEmptyIcon, trashIcon, walletIcon } from '../../assets/icons';
import './styles/StockPortfolio.css'

const PopularStock = ({item, className}) => {
    const [open, setOpen] = useState(false);

    const menuItems = [
        {
            title: 'Favorite',
            icon: starEmptyIcon,
            onClick: () => {
                console.log('Add to watchlist');
                setOpen(false);
            }
        },
        {
            title: 'Edit',
            icon: walletIcon,
            onClick: () => {
                console.log('Add to portfolio');
                setOpen(false);
            }
        },
        {
            title: 'Delete',
            icon: trashIcon,
            onClick: () => {
                console.log('Add to portfolio');
                setOpen(false);
            }
        },
    ]

    return (
        <div className="pos-relative">
        {open &&
            <Menu open={open} setOpen={setOpen} items={menuItems}/>
        }
        <div className={`stock-portfolio-card menu-btn${className ? ` ${className}` : ''}`}
            onClick={() => setOpen(!open)}
        >
            <div className="stock-portfolio-info gap-3">
                <div className="stock-portfolio-logo">
                    <img src={item.logo} alt="logo" />
                </div>
                <div className="stock-portfolio-name flex-grow-1">
                    <h3>{item.symbol}</h3>
                    <h5>
                        {item.name}
                    </h5>
                    <div className="fs-12">
                        <span className="weight-500">{item.quantity}</span> <span className="text-secondary">Shares</span>
                    </div>
                </div>
                <div className="flex gap-3">
                    <div className="stock-portfolio-price">
                        <div className="fs-12 text-secondary">
                            Bought at
                        </div>
                        <div className={`${+item.price > +item.perchesPrice ? 'text-success' : +item.price < +item.perchesPrice ? 'text-danger' : 'text-secondary'}`}>
                            {item.perchesPrice}
                        </div>
                        <div className="fs-12">
                            $ {addCommaToNumber(item.perchesPrice * item.quantity)}
                        </div>
                    </div>
                    <div className="stock-portfolio-price">
                        <div className="fs-12 text-secondary">
                            Current
                        </div>
                        <div className={`${+item.price > +item.perchesPrice ? 'text-success' : +item.price < +item.perchesPrice ? 'text-danger' : 'text-secondary'}`}>
                            {item.price}
                        </div>
                        <div className="fs-12">
                            $ {addCommaToNumber(+item.price * +item.quantity)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    )
}

export default PopularStock