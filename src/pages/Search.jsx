import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import { createUser } from '../services/userAPI';
import Header from '../component/Header';
import Loading from '../component/Loading';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      albums: [],
      artistNameSearch: '',
      loading: false,
      searchInput: '',
      isSearchButtonDisabled: true,
    };
  }

  async getAlbums() {
    const { searchInput } = this.state;
    const albumsResult = await searchAlbumsAPI(searchInput);

    this.setState({ loading: false }, () => {
      this.setState({ albums: albumsResult });
    });
  }

  onInputChange = ({ target }) => {
    const { name, value } = target;

    const searchMinLength = 2;
    const searchInputValidation = value.length < searchMinLength;

    this.setState({ [name]: value }, () => {
      this.setState({
        isSearchButtonDisabled: searchInputValidation,
      });
    });
  };

  onClickButton = (event) => {
    event.preventDefault();
    const {
      userName,
      userEmail,
      userImage,
      userDescription,
      searchInput } = this.state;

    this.getAlbums();

    this.setState({
      loading: true,
      artistNameSearch: searchInput,
      searchInput: '' }, async () => {
      await createUser({
        name: userName,
        email: userEmail,
        image: userImage,
        description: userDescription,
      });
    });
  };

  render() {
    const { onSubmitButton } = this.props;
    const { searchInput,
      isSearchButtonDisabled,
      loading,
      albums,
      artistNameSearch } = this.state;

    return (
      <div data-testid="page-search">
        <header><Header /></header>
        <main>
          {
            loading
              ? <Loading />
              : (
                <div>
                  <form method="get" onSubmit={ onSubmitButton }>
                    <label htmlFor="searchInput">
                      <input
                        type="text"
                        name="searchInput"
                        className="searchInput"
                        id="searchInput"
                        minLength="2"
                        data-testid="search-artist-input"
                        placeholder="Nome do artista"
                        value={ searchInput }
                        onChange={ this.onInputChange }
                      />
                    </label>
                    <button
                      type="button"
                      data-testid="search-artist-button"
                      disabled={ isSearchButtonDisabled }
                      onClick={ this.onClickButton }
                    >
                      Pesquisar
                    </button>
                  </form>
                  <div>
                    { albums?.length === 0 && (
                      <p>Nenhum álbum foi encontrado</p>)}
                    {
                      artistNameSearch !== '' && (
                        <p>{ `Resultado de álbuns de: ${artistNameSearch}` }</p>)
                    }
                    {
                      albums?.length > 0 && (
                        <div>
                          <p>
                            {albums
                              .map((element) => {
                                const {
                                  artistId,
                                  artistName,
                                  collectionId,
                                  collectionName,
                                  collectionPrice,
                                  artworkUrl100,
                                  releaseDate,
                                  trackCount } = element;
                                return (
                                  <div key={ collectionId }>
                                    <Link
                                      to={ `album/${collectionId}` }
                                      data-testid={ `link-to-album-${collectionId}` }
                                    >
                                      <ul>
                                        <li>{ artistId }</li>
                                        <li>{ artistName }</li>
                                        <li>{ collectionId }</li>
                                        <li>{ collectionName }</li>
                                        <li>{ collectionPrice }</li>
                                        <li>{ artworkUrl100 }</li>
                                        <li>{ releaseDate }</li>
                                        <li>{ trackCount }</li>
                                      </ul>
                                    </Link>
                                  </div>
                                );
                              })}
                          </p>
                        </div>
                      )
                    }
                  </div>
                </div>
              )
          }
        </main>
      </div>
    );
  }
}

Search.propTypes = {
  onSubmitButton: PropTypes.func.isRequired,
};

export default Search;
