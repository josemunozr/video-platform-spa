import React from 'react';
import '../assets/styles/components/Header.scss';

const Header = () => (
  <header className='header'>
    <div className='header__logo'>
      <img className='header__img' src='../../../assets/play-icon.png' alt='Video Platform' />
      <h3>
        Video
        <strong>Platform</strong>
      </h3>
    </div>
    <div className='header__menu'>
      <div className='header__menu--profile'>
        <img src='../../assets/user-icon.png' alt='' />
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
