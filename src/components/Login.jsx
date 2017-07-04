import React, { Component } from 'react';
import { login, resetPassword } from '../helpers/firebase';

function setErrorMsg(error) {
  return {
    loginMessage: error
  }
}

export default class Login extends Component {
  state = {
    loginMessage: null,
    emailValue: '',
    passwordValue: '',
  }
  handleSubmit = (e) => {
    e.preventDefault();
    login(this.state.emailValue, this.state.passwordValue)
      .catch((error) => {
        this.setState(setErrorMsg('Invalid username/password'))
      })
  }
  resetPassword = () => {
    resetPassword(this.state.emailValue)
      .then(() => this.setState(setErrorMsg(`Password reset email sent to ${this.state.emailValue}`)))
      .catch((error) => this.setState(setErrorMsg(`No user found with this email address`)));
  }
  change = (propertyName) => (e) => {
      const newValue = e.target.value;
      this.setState({
        [propertyName]: newValue
      });
    }
  render() {
    return (
      <div>
          <h1>Login</h1>
          <form onSubmit={this.handleSubmit}>
            <div className="form__field">
              <input type="text"
                className="form__input"
                onChange={this.change('emailValue')}
                placeholder="Email"/>
            </div>
            <div className="form__field">
              <input type="password"
                className="form__input"
                onChange={this.change('passwordValue')}
                placeholder="Password"/>
            </div>
            {
              this.state.loginMessage &&
              <div className="form__error" role="alert">
                {this.state.loginMessage}
                <button onClick={this.resetPassword}
                  className="alert-link">
                  Forgot Password?
                </button>
              </div>
            }
          <button type="submit" className="button">Login</button>
        </form>
      </div>
    );
  }
}