import { useState } from 'react'
import { SearchField } from '../'
import './styles/Header.css'
import logo from '../../assets/logo.png'

const Header = () => {
    const [searchFocused, setSearchFocused] = useState(false);

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
                        {new Date().toLocaleString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header