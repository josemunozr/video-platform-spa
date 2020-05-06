import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/styles/components/Header.scss';
import playIcon from '../assets/statics/play-icon.png';
import userIcon from '../assets/statics/user-icon.png';

const Header = () => (
  <header className='header'>
    <Link to='/'>
      <div className='header__logo'>
        <img className='header__img' src={playIcon} alt='Video Platform' />
        <h3>
          Video
          <strong>Platform</strong>
        </h3>
      </div>
    </Link>
    <div className='header__menu'>
      <div className='header__menu--profile'>
        <img src={userIcon} alt='' />
        <p>Perfil</p>
      </div>
      <ul>
        <li>
          <a href='/'>Cuenta</a>
        </li>
        <Link to='/login'>Login</Link>
      </ul>
    </div>
  </header>
);

export default Header;
