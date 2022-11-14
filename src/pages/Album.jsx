import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../component/Header';

class Album extends Component {
  render() {
    return (
      <div data-testid="page-album">
        <Header />
      </div>
    );
  }
}

Album.propTypes = {
  collectionId: PropTypes.string,
  artistId: PropTypes.string,
  artistName: PropTypes.string,
  collectionName: PropTypes.string,
  collectionPrice: PropTypes.string,
  artworkUrl100: PropTypes.string,
  releaseDate: PropTypes.string,
  trackCount: PropTypes.string,
}.isRequired;

export default Album;
