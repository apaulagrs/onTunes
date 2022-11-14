import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MusicCard extends Component {
  render() {
    const {
      previewUrl,
      trackName,
      trackId,
      image,
      album,
      handleChange,
      checked } = this.props;

    return (
      <div>
        <img src={ image } alt={ album } />
        <p>{ trackName }</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          <code>audio</code>
        </audio>
        <label
          htmlFor={ trackId }
          data-testid={ `checkbox-music-${trackId}` }
        >
          Favorita
          <input
            type="checkbox"
            name={ trackName }
            id={ trackId }
            className="favoriteSong"
            checked={ checked }
            onChange={ handleChange }
          />
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  previewUrl: PropTypes.string,
  trackName: PropTypes.string,
  trackId: PropTypes.string,
  image: PropTypes.string,
  album: PropTypes.string,
  handleChange: PropTypes.func,
  checked: PropTypes.bool,
}.isRequired;

export default MusicCard;
