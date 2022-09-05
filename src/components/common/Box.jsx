import { useState } from 'react'
import { Menu } from '../';
import { moreIcon } from '../../assets/icons';
import './styles/Box.css'

const Box = ({children, title, menuItems, size}) => {
    const [open, setOpen] = useState(false);

    return (
        <div className="box">
            {title &&
                <div className={`box-title${size ? ` ${size}`: ''}`}>
                        <h3>{title}</h3>
                    {menuItems &&
                        <div className="box-menu-more">
                            <div className="menu-btn"
                                onClick={(e) => setOpen(!open)}>
                                {moreIcon}
                            </div>
                            {open &&
                                <Menu open={open} setOpen={setOpen} items={menuItems}/>
                            }
                        </div>
                    }
                </div>
            }
            <div className="box-content">
                {children}
            </div>
        </div>
    )
}

export default Box