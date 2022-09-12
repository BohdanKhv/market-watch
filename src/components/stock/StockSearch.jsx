import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { removeFromFavorite, addToFavorite } from '../../features/local/localSlice';
import { starEmptyIcon, starFillIcon, walletFillIcon, walletIcon, chartIcon } from '../../assets/img/icons';
import { Menu, UpdatePortfolio, AddToPortfolio, Avatar } from '../';
import './styles/StockListItem.css'

const StockSearch = ({item, index, className, setAlert}) => {
    const [openAddToPortfolio, setOpenAddToPortfolio] = useState(false);
    const [openUpdateToPortfolio, setOpenUpdateToPortfolio] = useState(false);
    const [open, setOpen] = useState(false);
    const inPortfolio = useSelector(state => state.local.portfolio).filter(i => i.symbol === item.symbol)[0];
    const isFavorite = useSelector(state => state.local.favorite).filter(i => i.symbol === item.symbol)[0];
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <div
            className={`list-item menu-btn gap-3${open ? ' bg-secondary' : ''}${className ? ` ${className}` : ''}`}
            onClick={() => setOpen(!open)}
            data-menu-index={index+1}
        >
            {inPortfolio && 
                <UpdatePortfolio
                    item={inPortfolio} 
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
                    {inPortfolio ? (
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
                    {isFavorite ? (
                        <div className="menu-item"
                            onClick={() => {
                                dispatch(removeFromFavorite(isFavorite));
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
            {inPortfolio && (
                <div className="list-item-exist"/>
            )}
            <div className="list-item-logo">
                <Avatar
                    image={
                        item.logo ?
                        "https://stocks-logo.s3.us-east-2.amazonaws.com/logos/" +
                        item.logo + 
                        "-sm.svg"
                        :
                        null
                    }
                    name={item.symbol}
                    size="full"
                />
            </div>
            <div className="list-item-name">
                <div className="list-item-symbol">{item.symbol}</div>
                <div className="text-secondary fs-12 mt-1">{item.name}</div>
            </div>
            <div className="list-item-price text-end">
                <div className="fs-14">{item.exchange || ""}</div>
                <div className="fs-12 mt-1 text-secondary">{item.type}</div>
            </div>
        </div>
    )
}

export default StockSearch