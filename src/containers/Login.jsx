import React from 'react';
import { Link } from 'react-router-dom';
import googleIcon from '../assets/statics/google-icon.png';
import twitterIcon from '../assets/statics/twitter-icon.png';
import '../assets/styles/components/Login.scss';

const Login = () => (
  <section className='login'>
    <section className='login__container'>
      <h2>Inicia sesión</h2>
      <form className='login__container--form'>
        <input className='input' type='text' placeholder='Correo' />
        <input className='input' type='password' placeholder='Contraseña' />
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
        <Link to='/register'>Regístrate</Link>
      </p>
    </section>
  </section>
);

export default Login;
