import React, { Component } from 'react';
import { saveProperty } from '../helpers/firebase';
import { kebabCase } from 'lodash';

function setErrorMessage(error) {
  return {
    addError: error.message
  }
}

export default class AddProperty extends Component {
  constructor(props) {
    super();
    this.state = {
      addError: null,
      addressValue: '',
      propertyNameValue: '',
      propertyAdded: 0
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const id = kebabCase(this.state.propertyNameValue);
    const config = {
      id,
      address: this.state.addressValue,
      propertyName: this.state.propertyNameValue,
    }
    this.getCoordinates(config, () => {
      saveProperty(config)
        .then(() => {
          this.props.notify();
          this.setState({
            addressValue: '',
            propertyNameValue: '',
          })
        })
        .catch(e => this.setState(setErrorMessage(e)))
    });
  }

  getCoordinates(config, cb) {
    const maps = window.google.maps;
    const geocoder = new maps.Geocoder();
    if(geocoder) {
      geocoder.geocode({
        'address' : config.address
      }, (results) => {
        if (results[0]) {
          config.lat = results[0].geometry.location.lat();
          config.lng = results[0].geometry.location.lng();
          cb();
        }
      });
    }
  }

  change = (propertyName) => (e) => {
    const newValue = e.target.value;
    this.setState({
      [propertyName]: newValue
    })
  }

  render() {
    return (
      <div className="row">
        <h2>Add Property</h2>
        <p>Adding a property to our database is as simple as entering the address and name in the form below.  After you've entered the property, it will appear in the list and map below.</p>
        <form onSubmit={this.handleSubmit}>
          <div className="form__field">
            <input
              type="text"
              className="form__input"
              placeholder="Property Name"
              value={this.state.propertyNameValue}
              onChange={this.change('propertyNameValue')}
            />
          </div>
          <div className="form__field">
            <input
              type="text"
              className="form__input"
              placeholder="Property Address"
              value={this.state.addressValue}
              onChange={this.change('addressValue')}
            />
          </div>
          {
            this.state.addError &&
            <div className="form__error" role="alert">
              {this.state.addError}
            </div>
          }
          <button type="submit" className="button">Add Property</button>
        </form>
      </div>
    )
  }
}