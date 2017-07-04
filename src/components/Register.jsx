import React, { Component } from 'react';
import { auth } from '../helpers/firebase';

function setErrorMessage(error) {
  return {
    registerError: error.message
  }
}

export default class Register extends Component {
  state = {
    registerError: null,
    radioValue: 'no',
    emailValue: '',
    passwordValue: '',
  }
  handleSubmit = (e) => {
    e.preventDefault()
    const isAdmin = this.state.radioValue !== 'yes' ? null : true;
    auth(this.state.emailValue, this.state.passwordValue, isAdmin)
      .catch(e => this.setState(setErrorMessage(e)))
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
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form__field">
            <input
              type="text"
              className="form__input"
              onChange={this.change('emailValue')}
              value={this.state.emailValue}
              placeholder="Email"
            />
          </div>
          <div className="form__field">
            <input
              type="password"
              className="form__input"
              onChange={this.change('passwordValue')}
              value={this.state.passwordValue}
              placeholder="Password"
            />
          </div>
          <p>Registering as a property owner/agent allows you to add properites for rent/sale</p>
          <div className="form__field">
            <span className="form__label">Are you a property owner/agent?: </span>
            <label htmlFor="property-owner-yes" className="form__label">Yes</label>
            <input
              type="radio"
              className="form__input"
              name="property-owner-yes"
              value="yes"
              onChange={this.change('radioValue')}
              checked={this.state.radioValue === 'yes'}
            />
            <label htmlFor="property-owner-no" className="form__label">No</label>
            <input
              type="radio"
              className="form__input"
              name="property-owner-no"
              value="no"
              onChange={this.change('radioValue')}
              checked={this.state.radioValue === 'no'}
            />
          </div>
          {
            this.state.registerError &&
            <div className="form__error" role="alert">
              {this.state.registerError}
            </div>
          }
          <button type="submit" className="button">Register</button>
        </form>
      </div>
    );
  }
}