import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SweetAlert from 'sweetalert2-react';
import { setFavorite, deleteFavorite } from '../actions';
import '../assets/styles/components/CarouselItem.scss';
import playIcon from '../assets/statics/play-icon.png';
import plusIcon from '../assets/statics/plus-icon.png';
import removeIcon from '../assets/statics/remove-icon.png';

const CarouselItem = (props) => {
  const { id, cover, title, year, contentRating, duration, isMyList, myList } = props;
  const [showSwal, setShowSwal] = useState(false);

  const handleSetFavorite = () => {
    const item = myList.find((item) => item.id === id);
    if (!item) {
      props.setFavorite({
        id,
        cover,
        title,
        year,
        contentRating,
        duration
      });
    } else {
      setShowSwal(true);
    }
  };

  const handleDeleteFavorite = (idItem) => {
    props.deleteFavorite(idItem);
  };

  return (
    <>
      <div className='carousel-item'>
        <img className='carousel-item__img' src={cover} alt={title} />
        <div className='carousel-item__details'>
          <div>
            <Link to={`/player/${id}`}>
              <img className='carousel-item__details--img' src={playIcon} alt='Play Icon' />
            </Link>
            {isMyList ? <img className='carousel-item__details--img' src={removeIcon} alt='Remove Icon' onClick={() => handleDeleteFavorite(id)} /> : <img className='carousel-item__details--img' src={plusIcon} alt='Plus Icon' onClick={handleSetFavorite} />}
          </div>
          <p className='carousel-item__details--title'>{title}</p>
          <p className='carousel-item__details--subtitle'>{`${year} ${contentRating} ${duration}`}</p>
        </div>
      </div>
      <SweetAlert show={showSwal} title='Agregar ítem' text={`${title} ya se encuentra en tu lista`} onConfirm={() => setShowSwal(false)} />
    </>
  );
};

CarouselItem.prototype = {
  cover: PropTypes.string,
  title: PropTypes.string,
  year: PropTypes.number,
  contentRating: PropTypes.number,
  duration: PropTypes.number
};

const mapDispatchToProps = {
  setFavorite,
  deleteFavorite
};

const mapStateToProps = (state) => ({
  myList: state.myList
});

export default connect(mapStateToProps, mapDispatchToProps)(CarouselItem);
