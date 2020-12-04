import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { loginUser } from '../actions';
import Header from '../components/Header';
import googleIcon from '../assets/statics/google-icon.png';
import twitterIcon from '../assets/statics/twitter-icon.png';
import '../assets/styles/components/Login.scss';

const Login = (props) => {
  const { loginUser, history } = props;
  const [form, setValues] = useState({});

  const handleChangeInput = (event) => {
    setValues({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    loginUser(form).then((data) => {
      history.go('/');
    });
  };

  return (
    <>
      <Header isLogin />
      <section className='login'>
        <section className='login__container'>
          <h2>Inicia sesión</h2>
          <form className='login__container--form' onSubmit={handleSubmit}>
            <input
              name='email'
              className='input'
              type='email'
              placeholder='Correo'
              onChange={handleChangeInput}
            />
            <input
              name='password'
              className='input'
              type='password'
              placeholder='Contraseña'
              onChange={handleChangeInput}
            />
            <button type='submit' className='button'>
              Iniciar sesión
            </button>
            <div className='login__container--remember-me'>
              <label>
                <input type='checkbox' name='' id='cbox1' value='checkbos' />
                Recuérdame
              </label>
              <a href='/'>Olvidé mi contraseña</a>
            </div>
          </form>
          <section className='login__container--social-media'>
            <div>
              <img src={googleIcon} alt='Google' />
              Inicia sesión con Google
            </div>
            <div>
              <img src={twitterIcon} alt='Twitter' />
              Inicia sesión con Twitter
            </div>
          </section>
          <p className='login__container--register'>
            No tienes ninguna cuenta
            <Link to='/register'> Regístrate</Link>
          </p>
        </section>
      </section>
    </>
  );
};

const mapDispatchToProps = {
  loginUser,
};

export default connect(null, mapDispatchToProps)(Login);
