import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { searchIcon } from '../../assets/icons';
import testStock from '../../assets/testStock.json';
import { search, resetSearch } from '../../features/search/searchSlice';
import { Input, StockSearch } from '../';
import './styles/SearchField.css';


const SearchField = ({setSearchFocused}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const { searchResults, loading } = useSelector(state => state.search);
    const { pathname } = useLocation();
    const searchListRef = useRef(null);
    const dispatch = useDispatch();

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
            promise = dispatch(search(searchQuery));
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
                    {searchResults.map((item, index) => (
                        <StockSearch
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