import React from 'react';
import { GoogleApiWrapper, InfoWindow, Map, Marker } from 'google-maps-react';

 
class GoogleMapsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      // Tämä on toistaiseksi kovakoodattu
      currentLocation: {lat: '60.169857', lng: '24.938379'},
      selectedPlace: {}
    }
    // binding this to event-handler functions
    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.onMapClick = this.onMapClick.bind(this);
  }
  onMarkerClick = (props, marker, e) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  }
  onMapClick = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  }

  render() {
    const style = {
      width: '100%',
      height: '72%',
      'marginLeft': '0px',
      'marginRight': '100px'
    }
    return (
      <Map
        item
        xs = { 12 }
        style = { style }
        google = { this.props.google }
        onClick = { this.onMapClick }
        zoom = { 14 }
        initialCenter = {{ lat: this.state.currentLocation.lat, lng: this.state.currentLocation.lng }}
      >
        <Marker
          onClick = { this.onMarkerClick }
          title = { 'Helsinki' }
          position = {{ lat: 60.169857, lng: 24.938379 }}
          name = { 'Hki' }
        />

        <InfoWindow
          marker = { this.state.activeMarker }
          visible = { this.state.showingInfoWindow }
          content =  { 'Helsinki!' }
        >
        </InfoWindow>
      </Map>
    );
  }
}
export default GoogleApiWrapper({
    api: ("")
})(GoogleMapsContainer)