import React, { Component } from 'react';
import { getMaps } from '../helpers/firebase';
import './PropertiesList.css';

class PropertiesList extends Component {
  state = {
    properties: [],
  }
  getListings() {
    const allProperties = [];
    return getMaps()
        .then((snapshot) => {
          snapshot.forEach(childSnap => {
            allProperties.push({name: childSnap.val().propertyName, address: childSnap.val().address, id: childSnap.key});
          })
          return allProperties;
        })
  }

  componentDidUpdate(prevProps, prevState) {
    this.getListings()
      .then(allProperties => {
        if (allProperties.length !== this.state.properties.length) {
          this.setState({properties: allProperties});
        }
      });

  }
  componentDidMount() {
    this.getListings()
      .then(allProperties => {
        this.setState({properties: allProperties});
      });
  }
  componentWillUnmount() {
    this.setState({
      unmounting: true
    })
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