import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { searchIcon } from '../../assets/img/icons';
import stocks from '../../assets/data/stocks.json';
import { Input, StockSearch, Alert } from '../';
import './styles/SearchField.css';


const SearchField = ({setSearchFocused}) => {
    const [alert, setAlert] = useState('')
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const searchListRef = useRef(null);
    const { pathname } = useLocation();

    const handleClickOutside = (event) => {
        if (searchListRef.current && !searchListRef.current.contains(event.target)) {
            setIsOpen(false);
            setSearchFocused(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mouseup', handleClickOutside);

        return () => {
            document.removeEventListener('mouseup', handleClickOutside);
        };
    }, [searchListRef]);

    useEffect(() => {
        if (isOpen) {
            setSearchFocused(false);
            setIsOpen(false);
        }
    }, [pathname]);

    return (
        <div className="search">
            <Input
                type="text"
                placeholder="Search by name or symbol"
                value={searchQuery}
                icon={searchIcon}
                id="search-input"
                onChange={(e) => {
                    setSearchQuery(e.target.value);
                    if(e.target.value.length > 0) {
                        setIsOpen(true);
                        setSearchFocused(true);
                    } else {
                        setIsOpen(false);
                        setSearchFocused(false);
                    }
                }}
            />
            <div className={`search-results${searchQuery && isOpen ? '' : ' d-none'}`}>
                <div className="flex justify-between border-bottom align-center">
                    <h3 className="p-3">Search Results</h3>
                    <div className="mx-4 py-3">
                        <div
                            className="btn"
                            onClick={() => {
                                setSearchQuery('');
                                setIsOpen(false);
                                setSearchFocused(false);
                            }}
                        >
                            Clear
                        </div>
                    </div>
                </div>
                <div 
                    className="search-list"
                    ref={searchListRef}
                >
                    {stocks.filter(i => {
                        if (searchQuery === '') {
                            return i;
                        } else if (i.name?.toLowerCase().includes(searchQuery?.toLowerCase())) {
                            return i;
                        } else if (i.symbol?.toLowerCase().includes(searchQuery?.toLowerCase())) {
                            return i;
                        }
                    })
                    .slice(0, 10)
                    .sort((a, b) => {
                        if (a.name.toLowerCase() < b.name.toLowerCase()) {
                            return -1;
                        }
                        if (a.name.toLowerCase() > b.name.toLowerCase()) {
                            return 1;
                        }
                        return 0;
                    })
                    .map((item, index) => (
                        <StockSearch
                            key={index}
                            item={item}
                            index={index}
                            menuItems={[]}
                            setAlert={setAlert}
                            className={index + 1 !== stocks.length ? 'border-bottom' : ''}
                        />
                    ))}
                </div>
            </div>
        {alert.length > 0 && <Alert msg={alert} type='success' setAlert={setAlert} />}
        </div>
    )
}

export default SearchField