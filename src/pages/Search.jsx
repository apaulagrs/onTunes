import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../component/Header';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      searchInput: '',
      isSearchButtonDisabled: true,
    };
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

  render() {
    const { onSubmitButton } = this.props;
    const { searchInput, isSearchButtonDisabled } = this.state;

    return (
      <div data-testid="page-search">
        <header><Header /></header>
        <main>
          <form method="get" onSubmit={ onSubmitButton }>
            <label htmlFor="searchInput">
              <input
                type="text"
                name="searchInput"
                className="searchInput"
                id="searchInput"
                minLength="2"
                data-testid="search-artist-input"
                value={ searchInput }
                onChange={ this.onInputChange }
              />
            </label>
            <button
              type="button"
              data-testid="search-artist-button"
              disabled={ isSearchButtonDisabled }
            >
              Pesquisar
            </button>
          </form>
        </main>
      </div>
    );
  }
}

Search.propTypes = {
  onSubmitButton: PropTypes.func.isRequired,
};

export default Search;
