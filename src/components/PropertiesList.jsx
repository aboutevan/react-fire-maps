import React, { Component } from 'react';
import { getMaps } from '../helpers/firebase';
import './PropertiesList.css';

class PropertiesList extends Component {
  state = {
    properties: [],
  }
  getListings() {
    getMaps()
        .then((snapshot) => {
          const allProperties = [];
          snapshot.forEach(childSnap => {
            allProperties.push({name: childSnap.val().propertyName, address: childSnap.val().address, id: childSnap.key});
          })
          this.setState({properties: allProperties})
        })
  }
  componentDidUpdate(prevProps, prevState) {
    this.getListings();
  }
  componentDidMount() {
    this.getListings();
  }
  render() {
    return (
      <div className="PropertiesList">
        <ul>
          {
            this.state.properties.map(({name, address, id}) => {
              return (
                <li key={id}>
                  <span className="PropertiesList__name">{name}</span>
                  <span className="PropertiesList__address">{address}</span>
                </li>
              )
            })
          }
        </ul>
      </div>
    )
  }
}

export default PropertiesList;