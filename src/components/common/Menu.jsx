import { useEffect } from 'react';
import "./styles/Menu.css"

const Menu = ({ items, open, setOpen, index }) => {

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
        <div className={`menu${open ? ' menu-open' : ' menu-hidden'}`}>
                {items.map((item, index) => (
                    <div className="menu-item"
                        key={`menu-item-${index}`}
                        onClick={() => {
                            item.onClick();
                            setOpen(false);
                        }}
                    >
                        {item.icon &&
                            <span className="menu-item-icon">{item.icon}</span>
                        }
                        {item.title}
                        </div>
                ))}
        </div>
    )
}

export default Menu