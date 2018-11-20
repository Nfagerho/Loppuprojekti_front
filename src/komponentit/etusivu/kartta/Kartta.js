import React, { Component } from 'react';
import { withGoogleMap, GoogleMap } from 'react-google-maps';

class Kartta extends Component {
    render() {
        const GoogleMapExample = withGoogleMap(props => (
            <GoogleMap
                defaultCenter = { { lat: 40.756795, lng: -73.954298 } }
                defaultZoom = { 14 }
            >
            </GoogleMap>
        ));
        return(
            <div>
                <GoogleMapExample
                    containerElement={ <div style={{ height: `720px`, width: '1530px' }} /> }
                    mapElement={ <div style={{ height: `100%` }} /> }
                />
            </div>
        );
    }
};
export default Kartta;