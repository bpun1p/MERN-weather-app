import React, { useState }  from 'react';
import { Link } from 'react-router-dom';

export default function SideNav() {
  const [toggleOn, setToggleOn] = useState(false);
  const [navProps, setNavProps] = useState({
    text : 'Hide',
    display : 'Block'
  });

  const toggleNav = () => {
    setToggleOn(toggle => !toggle);
    if (!toggleOn) {
      setNavProps({...navProps,
        text : 'Show',
        display : 'None'
      });
    } else {
        setNavProps({...navProps,
          text : 'Hide',
          display : 'Block'
        });
      }
  };

  return (
    <nav className='side-nav'>
      <div className='nav-toggler'>
        <button className='toggle-tbn' onClick={toggleNav} id='toggler'>{navProps.text}</button>
      </div>
      <div className='nav-content'style={{display: navProps.display}}>
        <div className='dashboard'>
          <Link to='/dashboard'>
            <button type='button' className='dashboard-btn'>Dashboard</button>
          </Link>
        </div>
        <div className='search'>
          <Link to='/search'>
            <button type='button' className='search-btn'>Search</button>
          </Link>
        </div>
        <div className='library'>
          <Link to='library'>
            <button type='button' className='library-btn'>Library</button>
          </Link>
        </div>
        <div className='profile'>
          <Link to='profile'>
            <button type='button'className='profile-btn'>Profile</button>
          </Link>
        </div>
        <div className="learn-more">
          <Link to='Learn'>
            <button type='button' className='learn-btn'>Learn</button>
          </Link>
        </div>
      </div>
    </nav>

  );
}
