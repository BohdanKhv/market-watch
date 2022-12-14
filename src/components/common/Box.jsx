import { useState } from 'react'
import { Menu } from '../';
import { moreIcon } from '../../assets/img/icons';
import './styles/Box.css'

const Box = ({children, title, menuItems, size, secondary}) => {
    const [open, setOpen] = useState(false);

    return (
        <div className="box">
            {title &&
                <div className={`box-title${size ? ` ${size}`: ''}`}>
                        <h3>{title}
                        <span className="text-secondary fs-12 weight-400 ms-1">
                            {secondary}
                        </span>
                        </h3>
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