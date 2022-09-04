import { useState } from 'react'
import { Menu } from '../';
import { moreIcon } from '../../assets/icons';
import './styles/Box.css'

const Box = ({children, title, menuItems}) => {
    const [open, setOpen] = useState(false);

    return (
        <div className="box">
            <div className="box-title">
                <h3>{title}</h3>
                {menuItems &&
                    <div className="box-menu-more">
                        <div className="menu-btn"
                            onClick={(e) => setOpen(!open)}>
                            {moreIcon}
                        </div>
                        <Menu open={open} setOpen={setOpen} items={menuItems}/>
                    </div>
                }
            </div>
            <div className="box-content">
                {children}
            </div>
        </div>
    )
}

export default Box