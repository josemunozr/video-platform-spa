import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getVideoSource } from '../actions';
import NotFound from './NotFound';
import '../assets/styles/components/Player.scss';

const Player = (props) => {
  const { id } = props.match.params;
  const { playing } = props;
  const hasPlaying = Object.keys(playing).length > 0;

  const handleGoBack = () => {
    props.history.goBack();
  };

  useEffect(() => {
    props.getVideoSource(id);
  }, []);

  return hasPlaying ? (
    <div className='Player'>
      <video controls autoPlay>
        <source src={playing.source} type='video/mp4' />
      </video>
      <div className='Player-back'>
        <button type='button' onClick={handleGoBack}>
          Regresar
        </button>
      </div>
    </div>
  ) : (
    <NotFound />
  );
};

const mapStateToProps = (state) => ({
  playing: state.playing
});

const mapDistpatchToProps = {
  getVideoSource
};

export default connect(mapStateToProps, mapDistpatchToProps)(Player);
