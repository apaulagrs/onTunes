import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../component/Header';
import getMusics from '../services/musicsAPI';
import Loading from '../component/Loading';
import MusicCard from '../component/MusicCard';
import { addSong, removeSong } from '../services/favoriteSongsAPI';

class Album extends Component {
  state = {
    musicList: [],
    artist: '',
    album: '',
    loading: false,
    checked: {},
  };

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const musicsAPI = await getMusics(id);

    this.setState({
      musicList: musicsAPI,
      artist: musicsAPI[0].artistName,
      album: musicsAPI[0].collectionName,
      image: musicsAPI[0].artworkUrl100,
    });
  }

  handleChange = async ({ target }) => {
    const { musicList } = this.state;
    const { name, id, checked } = target;
    const allMusics = musicList.slice(1);

    const findMusic = allMusics.find((music) => {
      const { trackId } = music;
      return trackId === id;
    });

    this.setState((prevState) => ({
      checked: { ...prevState.checked, [name]: checked },
    }));

    if (checked) {
      this.setState({ loading: true }, async () => {
        await addSong(findMusic);
        this.setState({ loading: false });
      });
    } else {
      this.setState({ loading: true }, async () => {
        await removeSong(findMusic);
        this.setState({ loading: false });
      });
    }
  };

  render() {
    const {
      musicList,
      artist,
      album,
      loading,
      image,
      checked } = this.state;

    const musics = musicList.slice(1);
    return (
      <>
        <header data-testid="page-album">
          <Header />
          <h2 data-testid="artist-name">{ artist }</h2>
          <h3 data-testid="album-name">{ album }</h3>
        </header>
        <main>
          <div>
            {
              loading
                ? <Loading />
                : musics.map((music) => {
                  const { trackId, previewUrl, trackName } = music;
                  return (<MusicCard
                    key={ trackId }
                    previewUrl={ previewUrl }
                    trackName={ trackName }
                    trackId={ trackId }
                    image={ image }
                    album={ album }
                    handleChange={ this.handleChange }
                    checked={ checked[trackName] }
                  />);
                })
            }
          </div>
        </main>
      </>

    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }),
}.isRequired;

export default Album;
