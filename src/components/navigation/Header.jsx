import { useState } from 'react'
import { Input } from '../'
import { searchIcon } from '../../assets/icons';
import './styles/Header.css'

const Header = () => {
    const [search, setSearch] = useState('');

    return (
        <div className="header-wrapper">
            <div className="header">
                <div className="header-left">
                    <Input
                        type="text"
                        placeholder="Search for stocks"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        icon={searchIcon}
                    />
                </div>
                <div className="header-right">
                    <div className="date">
                        {new Date().toLocaleString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header