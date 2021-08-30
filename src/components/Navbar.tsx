import { useState } from 'react';
import SearchIcon from "@material-ui/icons/Search";
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import { Avatar } from "@material-ui/core";
import { Link } from "react-router-dom";
import "./Navbar.css";

import Dropdown from './Dropdown';


function Navbar() {
  const [click, setClick] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  const closeMobileMenu = () => setClick(false);

  const onMouseEnter = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(true);
    }
  };

  const onMouseLeave = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(false);
    }
  };


  return (
    <div className="navbar">

      {/* Left */}

      <Link to="/">
        <img
          className="navbar-logo"
          src="https://www.peaceparks.org/wp-content/themes/peaceparks/assets/images/logos/peaceparks-dark.png"
          alt=""
        />
      </Link>

      {/* Center */}

      <div className="navbar__center">
        <input type="text" placeholder="Start your search" />
        <SearchIcon />
      </div>


      {/* Right */}

      <div className="navbar__right">
        <li className='nav-item'>
          <Link to='/' className='nav-links' onClick={closeMobileMenu}>
            Home
          </Link>
        </li>

        <NotificationsNoneIcon />

        <ul className={click ? 'nav-menu active' : 'nav-menu'}>
          <li
            className='nav-item'
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          >
            <div
              className='nav-links'
              onClick={closeMobileMenu}
            >
              <Avatar
                alt="Ndumiso Mlambo"
                src="https://lh3.googleusercontent.com/10LpvXbxQpIm_IGre1TK59tIvmxD_YFQCsp6-2hFkjxJyPRb7Tu3XuYQS1Mr4Bxilias2muJ0XKXVsat-VcaVFTJPA"
              />
            </div>
            {dropdown && <Dropdown />}
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
