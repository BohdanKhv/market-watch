import { useEffect } from 'react';
import "./styles/Menu.css"

const Menu = ({ children, open, setOpen, index, items }) => {

    const openMenuOnClick = (e) => {
        if(open) {
            if (e.target.classList.contains('menu') || e.target.classList.contains('menu-item') || e.target.classList.contains('menu-btn')) {
                if(index) {
                    if(+e.target.dataset.menuIndex !== +index) setOpen(false)
                    else return
                } else return
            } else {
                setOpen(false);
            }
        }
    }


    useEffect(() => {
        window.addEventListener('click', openMenuOnClick);

        return () => {
            window.removeEventListener('click', openMenuOnClick);
        }
    }, [open]);

    return (
        <div className={`menu${open ? ' menu-open' : ' menu-hidden'}`}
            onClick={() => setOpen(false)}
        >
            {items ? items.map((item, i) => (
                <div className="menu-item"
                    key={`menu-item-${i}`}
                    onClick={() => {
                        item.onClick();
                    }}
                >
                    <span className="menu-item-icon">{item.icon}</span>
                    {item.title}
                </div>
                )) : children
            }
        </div>
    )
}

export default Menu