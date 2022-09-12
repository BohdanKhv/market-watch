import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, UpdatePortfolio, AddToPortfolio, Avatar } from '../';
import { removeFromFavorite, addToFavorite } from '../../features/local/localSlice';
import { starEmptyIcon, starFillIcon, walletFillIcon, walletIcon, chartIcon } from '../../assets/img/icons';
import './styles/StockListItem.css'

const StockListItem = ({item, index, className, setAlert}) => {
    const [openAddToPortfolio, setOpenAddToPortfolio] = useState(false);
    const [openUpdateToPortfolio, setOpenUpdateToPortfolio] = useState(false);
    const [open, setOpen] = useState(false);
    const exist = useSelector(state => state.local.portfolio).filter(i => i.symbol === item.symbol)[0];
    const favorite = useSelector(state => state.local.favorite).filter(i => i.symbol === item.symbol)[0];
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <div
            className={`list-item menu-btn gap-3${open ? ' bg-secondary' : ''}${className ? ` ${className}` : ''}`}
            onClick={() => setOpen(!open)}
            data-menu-index={index+1}
        >
            {exist && 
                <UpdatePortfolio
                    item={exist} 
                    setAlert={setAlert}
                    open={openUpdateToPortfolio}
                    setOpen={setOpenUpdateToPortfolio}
                />
            }
            <AddToPortfolio
                item={item} 
                setAlert={setAlert}
                open={openAddToPortfolio}
                setOpen={setOpenAddToPortfolio}
            />
            {open &&
                <Menu
                    open={open}
                    setOpen={setOpen}
                    index={index+1}
                >
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
                    {exist ? (
                        <div className="menu-item"
                            onClick={() => {
                                setOpenUpdateToPortfolio(true);
                            }}
                        >
                            <span className="menu-item-icon">{walletFillIcon}</span>
                            Update Portfolio
                        </div>
                    ) : (
                        <div className="menu-item"
                            onClick={() => {
                                setOpenAddToPortfolio(true);
                            }}
                        >
                            <span className="menu-item-icon">{walletIcon}</span>
                            Add to Portfolio
                        </div>
                    )}
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
                </Menu>
            }
            {exist && (
                <div className="list-item-exist"/>
            )}
            <div className="list-item-logo">
                <Avatar
                    image={
                        "https://stocks-logo.s3.us-east-2.amazonaws.com/logos/" +
                        item.symbol.replace('^', '-').replace('/', '').replace('\\', '') + 
                        "-sm.svg"
                    }
                    name={item.symbol}
                    size="full"
                />
            </div>
            <div className="list-item-name">
                <div className="list-item-symbol">{item.symbol}</div>
                <div className="list-item-name-title">{item.name}</div>
            </div>
            <div className="list-item-price">
                <div className="list-item-last-price">{item.price}</div>
                {/* <div className={`list-item-change${item.priceChange > 0 ? ' list-item-last-change-positive' : item.priceChange < 0 ? ' list-item-last-change-negative' : ''}`}>{item.priceChange > 0 && '+'}{item.priceChange}</div> */}
            </div>
        </div>
    )
}

export default StockListItem