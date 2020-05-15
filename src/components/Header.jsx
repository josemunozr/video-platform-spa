import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logoutRequest } from '../actions';
import gravatar from '../utils/gravatar';
import '../assets/styles/components/Header.scss';
import playIcon from '../assets/statics/play-icon.png';
import userIcon from '../assets/statics/user-icon.png';

const Header = (props) => {
  const { user } = props;

  const hasUser = Object.keys(user).length > 0;

  const handleLogOut = () => {
    props.logoutRequest({});
  };

  return (
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
          {hasUser ? <img src={gravatar(user.email)} alt={user.email} /> : <img src={userIcon} alt='' />}
          <p>Perfil</p>
        </div>
        <ul>
          {hasUser ? (
            <li>
              <a href='/'>{user.name}</a>
            </li>
          ) : null}
          {hasUser ? (
            <li>
              <a href='#logout' onClick={handleLogOut}>
                Cerrar sessión
              </a>
            </li>
          ) : (
            <Link to='/login'>Login</Link>
          )}
        </ul>
      </div>
    </header>
  );
};

const mapStateToProps = (state) => ({
  user: state.user
});

const mapDispatchToProps = {
  logoutRequest
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
