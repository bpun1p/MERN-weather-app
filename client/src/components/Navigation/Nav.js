import React, {useState}  from 'react';
import {NavLink} from 'react-router-dom';
import './Nav.css';

export default function Nav() {
  const [toggleOn, setToggleOn] = useState(false);
  const [navProps, setNavProps] = useState({
    text : 'Hide',
    class : 'displayed'
  });

  const toggleNav = () => {
    setToggleOn(toggle => !toggle);
    if (!toggleOn) {
      setNavProps({...navProps,
        text : 'Show',
        class : 'dismissed'
      });
    } else {
        setNavProps({...navProps,
          text : 'Hide',
          class : 'displayed'
        });
      }
  };

  return (
    <nav className={`nav ${navProps.class}`}>
      <div className='nav-toggler'>
        <button className='toggle-btn' onClick={toggleNav} id='toggler'>{navProps.text}</button>
      </div>
      <div className='side-nav'>
        <div className='nav-dashboard'>
          <NavLink to='/dashboard'>
            <button type='button' className='dashboard-btn btn'>Dashboard</button>
          </NavLink>
        </div>
        <div className='nav-search'>
          <NavLink to='/search'>
            <button type='button' className='search-btn btn'>Search</button>
          </NavLink>
        </div>
        <div className='nav-library'>
          <NavLink to='/library'>
            <button type='button' className='library-btn btn'>Library</button>
          </NavLink>
        </div>
        <div className='nav-profile'>
          <NavLink to='/profile'>
            <button type='button'className='profile-btn btn'>Profile</button>
          </NavLink>
        </div>
      </div>
    </nav>

  );
}
