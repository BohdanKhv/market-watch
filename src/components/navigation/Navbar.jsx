import { useRef, useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { sideNav } from '../../assets/nav'
import "./styles/Navbar.css"
import logo from '../../assets/logo.png'


const Navbar = () => {
  const location = useLocation()
  const activeRef = useRef(null);
  const indicatorRef = useRef(null);
  const [indicatorOffset, setIndicatorOffset] = useState(0);

  useEffect(() => {
      const activeTab = activeRef.current;
      const indicator = indicatorRef.current;
      if (indicator && activeTab) {
        const activeTabWidth = activeTab.offsetTop;
        setIndicatorOffset(activeTabWidth);
      }
  }, [location.pathname]);

  return (
    <nav className="navbar side-bar-width">
      <div className="flex flex-col justify-between flex-grow-1">
        <div className="navbar-top">
          <NavLink to="/about" className="logo">
            <span className="filter-shadow">
              <img src={logo} alt="logo" />
            </span>
            <h2 className="company">
              STOKIN
            </h2>
          </NavLink>
          <div className="navbar-top-links">
            {sideNav.map((item, index) => (
              <NavLink 
                key={`navbar-${index}`} 
                to={item.path} 
                className="navbar-item"
                ref={location.pathname === item.path ? activeRef : null}
              >
                {location.pathname === item.path ? item.fillIcon : item.icon}
                <span>{item.title}</span>
              </NavLink>
            ))}
            <span className="navbar-indicator" ref={indicatorRef}
              style={{
                  top: indicatorOffset,
              }}
            />
          </div>
        </div>
        <div className="navbar-footer">
          <p>
            © 2022
          </p>
        </div>
      </div>
    </nav>
  )
}

export default Navbar