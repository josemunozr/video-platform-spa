import React from 'react';
import { connect } from 'react-redux';
import { getResultSearch } from '../actions';
import '../assets/styles/components/Search.scss';

const Search = (props) => {
  const handleChange = (event) => {
    event.target.value !== '' ?
      props.getResultSearch(event.target.value) :
      props.getResultSearch(null);
  };
  return (
    <section className='search'>
      <h2 className='search__title'>¿Qué quieres ver hoy?</h2>
      <input
        type='text'
        className='input'
        placeholder='Buscar...'
        onChange={handleChange}
      />
    </section>
  );
};

const mapDistpachToProps = {
  getResultSearch,
};

export default connect(null, mapDistpachToProps)(Search);
