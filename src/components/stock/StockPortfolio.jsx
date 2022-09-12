import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { addCommaToNumber, numberFormatter, getOneSymbolPercentHoldings } from '../../assets/utils';
import { chartIcon, starEmptyIcon, starFillIcon, trashIcon, walletFillIcon } from '../../assets/img/icons';
import { removeFromPortfolio, removeFromFavorite, addToFavorite } from '../../features/local/localSlice';
import { Menu, UpdatePortfolio, Avatar } from '../';
import './styles/StockPortfolio.css'

const PopularStock = ({item, portfolioValue, className, index, setAlert}) => {
    const [open, setOpen] = useState(false);
    const [openUpdateToPortfolio, setOpenUpdateToPortfolio] = useState(false);
    const numberFormat = useSelector(state => state.local.numberFormat);
    const favorite = useSelector(state => state.local.favorite).filter(i => i.symbol === item.symbol)[0];
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const format = (n) => {
        if(numberFormat === 'full') {
            return addCommaToNumber(n);
        } else {
            return addCommaToNumber(numberFormatter(n));
        }
    }

    return (
        item &&
        <div className="pos-relative">
        <UpdatePortfolio
            item={item} 
            setAlert={setAlert}
            open={openUpdateToPortfolio}
            setOpen={setOpenUpdateToPortfolio}
        />
        {open &&
            <Menu open={open} setOpen={setOpen} index={index+1}>
                {!location.pathname.split('/').includes('chart') && (
                    <div className="menu-item"
                        onClick={() => {
                            setOpen(false);
                            navigate(`/chart/${item.symbol}`);
                        }}
                    >
                        <span className="menu-item-icon">{chartIcon}</span>
                        Chart
                    </div>
                )}
                <div className="menu-item"
                    onClick={() => {
                        setOpenUpdateToPortfolio(true);
                    }}
                >
                    <span className="menu-item-icon">{walletFillIcon}</span>
                    Update
                </div>
                {favorite ? (
                    <div className="menu-item"
                        onClick={() => {
                            dispatch(removeFromFavorite(favorite));
                            setAlert(`Removed ${item.symbol} from favorite`);
                        }}
                    >
                        <span className="menu-item-icon">{starFillIcon}</span>
                        Unfavorite
                    </div>
                ) : (
                    <div className="menu-item"
                        onClick={() => {
                            dispatch(addToFavorite(item));
                            setAlert(`Added ${item.symbol} to favorite`);
                        }}
                    >
                        <span className="menu-item-icon">{starEmptyIcon}</span>
                        Favorite
                    </div>
                )}
                <div className="menu-item"
                    onClick={() => {
                        dispatch(removeFromPortfolio(item));
                        setAlert(`Removed ${item.symbol} from portfolio`);
                    }}
                >
                    <span className="menu-item-icon">{trashIcon}</span>
                    Remove
                </div>
            </Menu>
        }
            <div
                className={`stock-portfolio-card menu-btn${className ? ` ${className}` : ''}${open ? ' bg-secondary' : ''}`}
                data-menu-index={index+1}
                onClick={() => setOpen(!open)}>
                <div className="stock-portfolio-info gap-1">
                    <div className="flex flex-grow-1 gap-2">
                        <div className="stock-portfolio-logo">
                            <Avatar
                                image={
                                    "https://stocks-logo.s3.us-east-2.amazonaws.com/logos/" +
                                    item.symbol?.replace('^', '-').replace('/', '').replace('\\', '') + 
                                    "-sm.svg"
                                }
                                name={item.symbol}
                                size="full"
                            />
                        </div>
                        <div className="stock-portfolio-name">
                            <span className="fs-16">{item.symbol}</span>
                            <span className="fs-10 text-secondary">
                                {item.name}
                            </span>
                        </div>
                    </div>
                    <div className="flex gap-4 justify-end">
                        <div className="stock-portfolio-detail mw-50-px">
                            <span>
                                {format(item.quantity)}
                            </span>
                            <div className="fs-10 text-ellipsis text-end">
                                <span className="text-secondary">{item.price ? (+getOneSymbolPercentHoldings(portfolioValue, item.quantity, item.price))?.toFixed(1) : '0.00'}%</span>
                            </div>
                        </div>
                        <div className="stock-portfolio-detail mw-50-px">
                            <div className={`${+item.price > +item.averagePrice ? 'text-success' : +item.price < +item.averagePrice ? 'text-danger' : 'text-secondary'}`}>
                                {addCommaToNumber((+item.averagePrice)?.toFixed(1))}
                            </div>
                            <div className="fs-10 text-ellipsis text-end text-secondary">
                                ${format((+item.averagePrice * item.quantity).toFixed(1))}
                            </div>
                        </div>
                        <div className="stock-portfolio-detail mw-50-px">
                            <span className={`${+item.price > +item.averagePrice ? 'text-success' : +item.price < +item.averagePrice ? 'text-danger' : 'text-secondary'}`}>
                                {item.price ? (+item.price)?.toFixed(1) : '0.00'}
                            </span>
                            <div className="fs-10 text-ellipsis text-end text-secondary">
                                ${item.price ? format((+item.price * +item.quantity)?.toFixed(1)) : '0.00'}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PopularStock