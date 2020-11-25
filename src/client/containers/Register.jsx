import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { registerRequest } from '../actions';
import Header from '../components/Header';
import '../assets/styles/components/Register.scss';

const Register = (props) => {
  const [form, setValues] = useState({});

  const handleChange = (event) => {
    setValues({
      ...form,
      [event.target.name]: event.target.value
    });
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();
    props.registerRequest(form);
    props.history.push('/');
  };

  return (
    <>
      <Header isRegister />
      <section className='registro'>
        <section className='registro__container'>
          <h2>Regístrate</h2>
          <form className='registro__container--form' onSubmit={handleOnSubmit}>
            <input name='name' className='input' type='text' placeholder='Nombre' onChange={handleChange} />
            <input name='email' className='input' type='email' placeholder='Correo' onChange={handleChange} />
            <input name='password' className='input' type='password' placeholder='Contraseña' onChange={handleChange} />
            <button type='submit' className='button'>
              Registrarme
            </button>
          </form>
          <p className='registro__container--register'>
            <Link to='/login'>Iniciar sesión</Link>
          </p>
        </section>
      </section>
    </>
  );
};

const mapDistpachToProps = {
  registerRequest
};

export default connect(null, mapDistpachToProps)(Register);
