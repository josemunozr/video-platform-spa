import React from 'react';
import '../assets/styles/components/Footer.scss';
import { Link } from 'react-router-dom';

const Footer = () => (
  <footer className='footer'>
    <Link to='/not-found'>Terminos de uso</Link>
    <Link to='/not-found'>Declaración de privacidad</Link>
    <Link to='/not-found'>Centro de ayuda</Link>
  </footer>
);

export default Footer;
