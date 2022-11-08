import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Login extends Component {
  render() {
    const {
      userName,
      isLoginButtonDisabled,
      onInputChange,
      onSubmitButton } = this.props;

    return (
      <div data-testid="page-login">
        <form onSubmit={ onSubmitButton }>
          <label htmlFor="userName">
            Nome
            <input
              type="text"
              placeholder="Digite seu nome"
              data-testid="login-name-input"
              name="userName"
              className="userName"
              id="userName"
              minLength="3"
              value={ userName }
              onChange={ onInputChange }
            />
          </label>
          <button
            type="button"
            data-testid="login-submit-button"
            name="login-button"
            disabled={ isLoginButtonDisabled }
            onClick={ onSubmitButton }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  userName: PropTypes.string.isRequired,
  onSubmitButton: PropTypes.func.isRequired,
  onInputChange: PropTypes.func.isRequired,
  isLoginButtonDisabled: PropTypes.bool.isRequired,
};

export default Login;
