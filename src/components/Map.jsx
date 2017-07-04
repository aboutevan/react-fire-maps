import React, { Component } from 'react';
import { getMaps } from '../helpers/firebase';

export default class Map extends Component {

  loadMap(allCoords) {
    const gMaps = window.google.maps;
    // get lat/lng of first maps entry in db
    const lat = allCoords[0][0];
    const lng = allCoords[0][1];
    const mapConfig = {
      center: new gMaps.LatLng(lat, lng),
      zoom: 10,
      scrollwheel: false,
    }

    // create map
    this.map = new gMaps.Map(this.mapNode, mapConfig);

    // add markers
    allCoords.map((entry) => {
      return new gMaps.Marker({
        position: new gMaps.LatLng(entry[0], entry[1]),
        map: this.map,
        title: entry[2]
      })
    });
  }

  getAllMaps() {
    getMaps()
      .then((snapshot) => {
        const allCoords = [];
        // snapshot is 'maps', childSnap each entry
        // save each entry to allCoords so
        snapshot.forEach((childSnap) => {
          allCoords.push([
            childSnap.val().lat,
            childSnap.val().lng,
            childSnap.val().propertyName
          ])
        })
        return allCoords;
      })
      // load map only after all markers have been configured
      .then((allCoords) => {
          this.loadMap(allCoords);
        }
      );
  }

  componentDidUpdate(prevProps, prevState) {
    this.getAllMaps();
  }

  componentDidMount() {
    this.getAllMaps();
  }

  render() {
    return (
      <div
        style={{width: '100%', height: '100%'}}
        ref={(map) => {this.mapNode = map;}}
      >
        Loading Map...
      </div>
    )
  }
}