import { useState, useEffect } from 'react'
import { SearchField } from '../'
import './styles/Header.css'
import logo from '../../assets/img/logo.png'

const Header = () => {
    const [searchFocused, setSearchFocused] = useState(false);
    const [marketStatus, setMarketStatus] = useState('Open');


    useEffect(() => {
        const date = new Date();
        const day = date.getDay();
        const hour = date.getHours();
        const minute = date.getMinutes();
        const time = hour + minute/100;

        if (day === 0 || day === 6) {
            setMarketStatus('Closed');
        } else if (time >= 9.30 && time < 16) {
            setMarketStatus('Open');
        } else if (time > 4 && time < 9.30) {
            setMarketStatus('Pre-Market');
        } else if (time >= 16 && time < 20) {
            setMarketStatus('After Hours');
        } else {
            setMarketStatus('Closed');
        }
    }, []);

    return (
        <div className={`header-wrapper${searchFocused ? ' header-search-focus' : ''}`}>
            <div className="header">
                <div className="header-left">
                    <div className="header-logo-wrapper">
                        <span className="header-logo">
                            <img src={logo} alt="logo" />
                        </span>
                        {/* <h3>
                            STOKIN
                        </h3> */}
                    </div>
                    <SearchField setSearchFocused={setSearchFocused}/>
                </div>
                <div className="header-right">
                    <div className="date">
                        <span className="fs-14 text-secondary">
                            {marketStatus}
                        </span>
                        <span className="fs-14 text-secondary">
                            {new Date().toLocaleString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header