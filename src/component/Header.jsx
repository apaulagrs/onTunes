import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends Component {
  state = {
    userAPI: '',
    loading: true,
  };

  async componentDidMount() {
    const getUserNameAPI = await getUser();
    this.setState({
      userAPI: getUserNameAPI.name,
      loading: false,
    });
  }

  render() {
    const { userAPI, loading } = this.state;
    return (
      <header data-testid="header-component">
        {
          loading
            ? <Loading />
            : <h3 data-testid="header-user-name">{ userAPI }</h3>
        }
        <nav>
          <ul>
            <li>
              <Link
                to="/search"
                data-testid="link-to-search"
              >
                Search
              </Link>
            </li>
            <li>
              <Link
                to="/favorites"
                data-testid="link-to-favorites"
              >
                Favorites
              </Link>
            </li>
            <li>
              <Link
                to="/profile"
                data-testid="link-to-profile"
              >
                Profile
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    );
  }
}

export default Header;
