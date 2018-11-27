import ReactDOM from 'react-dom';
import React, { Component } from 'react';
///////////////////////////////
import { haeKaikkiToimeksiannot } from '../../../restpalvelu';
// Tarviiko lisätä autentikointia?


const mapStyles = {
    map: {
        marginLeft: '1%',
        position: 'absolute',
        width: '98%',
        height: '77%'
    }
};

class KarttaNakyma extends Component {
    constructor(props) {
        super(props);

        const { lat, lng } = this.props.initialCenter;
        this.state = {
            currentLocation: {
                lat: lat,
                lng: lng
            },
            //////////////////////////
            toimeksiantodata: []
        };
    }
    componentDidMount() {
        //////////////////////////
        this.haekaikki();

        if (this.props.centerAroundCurrentLocation) {
            if (navigator && navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(pos => {
                    const coords = pos.coords;
                    this.setState({
                        currentLocation: {
                            lat: coords.latitude,
                            lng: coords.longitude,
                            
                        }
                    });
                });
            }
        }
        this.loadMap();
      
        
       
    }

    // HAETAAN KAIKKI TOIMEKSIANNOT
    haekaikki() {
        haeKaikkiToimeksiannot(this.kaikkihaettu);
    }
    kaikkihaettu = (haettudata, virhe) => {
        if(virhe) {
            alert("virhe");
        } else {
            this.setState({toimeksiantodata: haettudata});
            console.log(this.state.toimeksiantodata);
        }
    };
    /////////////////////////

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.google !== this.props.google) {
            this.loadMap();
        }
        if (prevState.currentLocation !== this.state.currentLocation) {
            this.recenterMap();
        }
    }

    loadMap() {
        if (this.props && this.props.google) {
            // checks if google is available
            const { google } = this.props;
            const maps = google.maps;

            const mapRef = this.refs.map;

            // reference to the actual DOM element
            const node = ReactDOM.findDOMNode(mapRef);

            let { zoom } = this.props;
            const { lat, lng } = this.state.currentLocation;
            const center = new maps.LatLng(lat, lng);
            const mapConfig = Object.assign(
                {},
                {
                    center: center,
                    zoom: zoom
                }
            );
            // maps.Map() is constructor that instantiates the map
            this.map = new maps.Map(node, mapConfig);
        }
    }

    recenterMap() {
        const map = this.map;
        const current = this.state.currentLocation;

        const google = this.props.google;
        const maps = google.maps;

        if (map) {
            let center = new maps.LatLng(current.lat, current.lng);
            map.panTo(center);
        }
    }

    renderChildren() {
        const { children } = this.props;

        var contentString1 = '<div id="content"><h1>Käpylän peruskoulu</h1><h3>Vapaat toimeksiannot</h3>' +
            '<object type="text/html" data="/koulunomattoimeksiannot" width="600px" height="600px" >\n' +
            '</object></div>';

        var infowindow1 = new window.google.maps.InfoWindow({
            content: contentString1
        });

        var contentString2 = '<div id="content"><h1>Ressun peruskoulu</h1><p>RESSUN PERUSKOULUN VAPAAT SIJAISUUDET: </p></div>';

        var infowindow2 = new window.google.maps.InfoWindow({
            content: contentString2
        });


        // Markerin lisääminen (tämän koodin voi lisätä esim. renderinkin sisälle suoraan)
        var marker1 = new this.props.google.maps.Marker({
            position: {lat: 60.210270, lng: 24.945590},
            map: this.map,
            title: 'Käpylän peruskoulu',
            label: '5'
        });

        // Tapahtuma, kun markeria klikataan
        marker1.addListener('click', function() {
            this.map.setZoom(18);
            this.map.setCenter(marker1.getPosition());
            infowindow1.open(this.map, marker1);

          });

        var marker2 = new this.props.google.maps.Marker({
            position: {lat: 60.166950, lng: 24.927250},
            map: this.map,
            title: 'Ressun peruskoulu',
            label: '2'
        });

        marker2.addListener('click', function() {
            this.map.setZoom(18);
            this.map.setCenter(marker2.getPosition());
            infowindow2.open(this.map, marker2);
            });

        if (!children) return;

        return React.Children.map(children, c => {
            if (!c) return;
            return React.cloneElement(c, {
                map: this.map,
                google: this.props.google,
                mapCenter: this.state.currentLocation
            });
        });
    }

    render() {
<<<<<<< HEAD

        // Mäpätään toimeksiannot markkereiksi
        for(var i = 0; i < this.state.toimeksiantodata.length; ++i){
            console.log(this.state.toimeksiantodata[i]);
            // var marker1 + i = new this.props.google.maps.Marker({
            //     position: {lat: 60.210270, lng: 24.945590},
            //     map: this.map,
            //     title: 'Käpylän peruskoulu',
            //     label: '5',
            // });
        }

=======
>>>>>>> 172c74a9b86239f78dd0bff8d806c5035122a84e
        const style = Object.assign({}, mapStyles.map);

        return (
            <div>
                <div style={style} ref="map">
                    Loading map...
                </div>
                {this.renderChildren()}
            </div>
        );
    }
}

export default KarttaNakyma;

KarttaNakyma.defaultProps = {
    zoom: 16,
    initialCenter: {
        lat: 60.177336,
        lng: 24.833474
    },
    centerAroundCurrentLocation: false,
    visible: true
};