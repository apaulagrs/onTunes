import React from 'react';
import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom';
import Login from './pages/Login';
import ProfileEdit from './pages/ProfileEdit';
import Profile from './pages/Profile';
import Favorites from './pages/Favorites';
import Search from './pages/Search';
import Album from './pages/Album';
import NotFound from './pages/NotFound';
import { createUser } from './services/userAPI';
import Loading from './component/Loading';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      userName: '',
      userEmail: '',
      userImage: '',
      userDescription: '',
      loading: false,
      wasLogged: false,
      isLoginButtonDisabled: true,
    };
  }

  onInputChange = ({ target }) => {
    const { name, value } = target;

    const minLength = 3;
    const inputValue = value.length < minLength;

    this.setState({ [name]: value }, () => {
      this.setState({ isLoginButtonDisabled: inputValue });
    });
  };

  onSubmitButton = async (event) => {
    event.preventDefault();
    const { userName, userEmail, userImage, userDescription } = this.state;
    this.setState({ loading: true }, async () => {
      await createUser({
        name: userName,
        email: userEmail,
        image: userImage,
        description: userDescription,
      });
      this.setState({
        loading: false,
        wasLogged: true,
      });
    });
  };

  render() {
    const {
      userName,
      userEmail,
      userImage,
      userDescription,
      loading,
      wasLogged,
      isLoginButtonDisabled } = this.state;

    return (
      <BrowserRouter>
        <Switch>
          <Route path="/profile/edit" render={ () => <ProfileEdit /> } />
          <Route path="/album/:id" render={ () => <Album /> } />
          <Route path="/profile" render={ () => <Profile /> } />
          <Route path="/favorites" render={ () => <Favorites /> } />
          <Route path="/search" render={ () => <Search /> } />
          <Route exact path="/">
            { loading ? <Loading /> : <Login
              userName={ userName }
              userEmail={ userEmail }
              userImage={ userImage }
              userDescription={ userDescription }
              isLoginButtonDisabled={ isLoginButtonDisabled }
              onInputChange={ this.onInputChange }
              onSubmitButton={ this.onSubmitButton }
            />}
            { wasLogged ? <Redirect to="/search" /> : null }
          </Route>
          <Route path="*" render={ () => <NotFound /> } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
