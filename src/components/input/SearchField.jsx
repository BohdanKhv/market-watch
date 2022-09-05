import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { searchIcon } from '../../assets/icons';
import testStock from '../../assets/testStock.json';
import { Input, StockListItem } from '../';
import './styles/SearchField.css';


const SearchField = ({setSearchFocused}) => {
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
        let promise = null;
        if (searchQuery.length > 0) {
            // console.log('searchQuery', searchQuery);
        }

        return () => {
            promise && promise.abort();
        }
    }, [searchQuery]);

    useEffect(() => {
        if (isOpen) {
            setSearchFocused(false);
            setIsOpen(false);
        }
    }, [pathname]);

    useEffect(() => {
        if(isOpen) {
            document.querySelector('.content')?.classList.add('brightness-25');
        } else {
            document.querySelector('.content')?.classList.remove('brightness-25');
        }
    }, [isOpen]);

    return (
        <div className="search">
            <Input
                type="text"
                placeholder="Search by name or symbol"
                value={searchQuery}
                icon={searchIcon}
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
                    {testStock.filter(i => {
                        if (searchQuery === '') {
                            return i;
                        } else if (i.name.toLowerCase().includes(searchQuery.toLowerCase())) {
                            return i;
                        } else if (i.symbol.toLowerCase().includes(searchQuery.toLowerCase())) {
                            return i;
                        }
                    }
                    ).map((item, index) => (
                        <StockListItem
                            key={index}
                            item={item}
                            index={index}
                            menuItems={[]}
                            className={index + 1 !== testStock.length ? 'border-bottom' : ''}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default SearchField