import React, { useState }  from 'react';
import { Link } from 'react-router-dom';

export default function SideNav() {
  const [toggle, setToggle] = useState(false);
  const [text, setText] = useState('Hide');
  const [navStyle, setNavStyle] = useState({display : 'Block'});

  const toggleNav = () => {
    setToggle(toggle => !toggle);
    if (!toggle) {
      setText(text => 'Show');
      setNavStyle({...navStyle, display:'None'})
    } else {
      setText(text => 'Hide');
      setNavStyle({...navStyle, display:'Block'});
    }
  };

  return (
    <nav className='side-nav'>
      <div className='nav-toggler'>
        <button className='toggle-tbn' onClick={toggleNav} id='toggler'>{text}</button>
      </div>
      <div className='nav-content'style={navStyle}>
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
