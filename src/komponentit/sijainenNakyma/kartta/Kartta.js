import React, { Component } from 'react';
import { GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';

import KarttaNakyma from './KarttaNakyma'

class Kartta extends Component {
    state = {
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {}
    };

    onMarkerClick = (props, marker, e) =>
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });

    onClose = props => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            });
        }
    };

    render() {
        return (
            <KarttaNakyma centerAroundCurrentLocation google={this.props.google}>
                <Marker onClick={this.onMarkerClick} name={'Nykyinen sijainti'} />
                <InfoWindow
                    marker={this.state.activeMarker}
                    visible={this.state.showingInfoWindow}
                    onClose={this.onClose}
                >
                    <div>
                        <h4>{this.state.selectedPlace.name}</h4>
                    </div>
                </InfoWindow>
            </KarttaNakyma>
        );
    }
}
export default GoogleApiWrapper({
    apiKey: 'AIzaSyAUH1zJfyxQLcANucHvyUefXI9mNM_C1FM'
})(Kartta);