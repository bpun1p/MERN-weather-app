import React, { useState }  from 'react';
import { NavLink } from 'react-router-dom';
import './side-nav.css';

export default function SideNav() {
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
        <div className='dashboard'>
          <NavLink to='/dashboard'>
            <button type='button' className='dashboard btn'>Dashboard</button>
          </NavLink>
        </div>
        <div className='search'>
          <NavLink to='/search'>
            <button type='button' className='search btn'>Search</button>
          </NavLink>
        </div>
        <div className='library'>
          <NavLink to='library'>
            <button type='button' className='library btn'>Library</button>
          </NavLink>
        </div>
        <div className='profile'>
          <NavLink to='profile'>
            <button type='button'className='profile btn'>Profile</button>
          </NavLink>
        </div>
      </div>
    </nav>

  );
}
