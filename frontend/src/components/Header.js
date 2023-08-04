import React from 'react';
import logo from '../images/logo.svg';
import { Link } from 'react-router-dom';

function Header({ isLoggedIn, headerMenuData, email, signOut }) {

  const [sliderMenu, setSliderMenu] = React.useState(false);

  function handleSignOut() {
    setSliderMenu(false);
    signOut();
  }

  return(
    <header className="header">
      {!sliderMenu && <img src={logo} alt="Логотип Mesto" className="logo" />}

      <div className={`header__menu ${isLoggedIn && 'header__menu_hidden'} ${sliderMenu && 'header__menu_opened'}`}>
        {isLoggedIn && <p className="header__email">{email}</p>}

        <Link
          to={headerMenuData.link}
          className="header__sign-link"
          onClick={isLoggedIn && handleSignOut}
        >
          {headerMenuData.name}
        </Link>
      </div>

      {sliderMenu && <img src={logo} alt="Логотип Mesto" className="logo" />}

      {isLoggedIn &&
        <div className="header__slider-menu" onClick={() => setSliderMenu(!sliderMenu)}>
        {!sliderMenu
          ? <div className="header__slider-open">
              <hr className="header__slider-line" />
              <hr className="header__slider-line" />
              <hr className="header__slider-line" />
            </div>
          : <div className="header__slider-close"></div>}
        </div>
      }


    </header>
  )
}

export default Header;
