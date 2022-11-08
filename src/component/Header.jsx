import React, { Component } from 'react';
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
      </header>
    );
  }
}

export default Header;
