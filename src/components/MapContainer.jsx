import React, { Component } from 'react';
import Map from './Map';
import './Map.css';
import { mapsApiKey } from '../config/maps';

const loadScript = (src) => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.addEventListener('load', () => resolve());
    script.addEventListener('error', (e) => reject(e));
    document.body.appendChild(script);
  })
}

const googleMaps = loadScript(`https://maps.googleapis.com/maps/api/js?key=${mapsApiKey}`);

export class MapContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loaded: false
    }
  }

  loadScript(state) {
    googleMaps.then(() => {
      this.setState(state)
    }).catch((e) => {
      console.log(e);
    })
  }

  componentWillMount() {
    this.loadScript({loaded: true});
  }

  render() {
    return (
      !this.state.loaded
        ? <h1>Map Loading</h1>
        : <div className="MapContainer">
            <Map />
          </div>
    )
  }
}

export default MapContainer;