import React from 'react';
import '../assets/styles/components/Header.scss';
import playIcon from '../assets/statics/play-icon.png';
import userIcon from '../assets/statics/user-icon.png';

const Header = () => (
  <header className='header'>
    <div className='header__logo'>
      <img className='header__img' src={playIcon} alt='Video Platform' />
      <h3>
        Video
        <strong>Platform</strong>
      </h3>
    </div>
    <div className='header__menu'>
      <div className='header__menu--profile'>
        <img src={userIcon} alt='' />
        <p>Perfil</p>
      </div>
      <ul>
        <li>
          <a href='/components/login/login.html'>Login</a>
        </li>
        <li>
          <a href='/buscador.html'>Buscador</a>
        </li>
        <li>
          <a href='/'>Cuenta</a>
        </li>
        <li>
          <a href='/'>Cerrar Sesión</a>
        </li>
      </ul>
    </div>
  </header>
);

export default Header;
