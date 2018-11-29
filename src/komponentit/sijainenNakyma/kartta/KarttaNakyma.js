import ReactDOM from 'react-dom';
import React, {Component} from 'react';
import {haeKaikkiToimeksiannot} from '../../../restpalvelu';
// Tarviiko lisätä autentikointia?


const mapStyles = {
    map: {
        marginLeft: '1%',
        position: 'absolute',
        width: '98%',
        height: '75%'
    }
};

class KarttaNakyma extends Component {
    constructor(props) {
        super(props);

        const {lat, lng} = this.props.initialCenter;
        this.state = {
            currentLocation: {
                lat: lat,
                lng: lng
            },
            //////////////////////////
            toimeksiantodata: []
        };

        // var koulutaulukko = [];
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
        if (virhe) {
            alert("virhe");
        } else {
            this.setState({toimeksiantodata: haettudata});


        }
    };

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
            const {google} = this.props;
            const maps = google.maps;

            const mapRef = this.refs.map;

            // reference to the actual DOM element
            const node = ReactDOM.findDOMNode(mapRef);

            let {zoom} = this.props;
            const {lat, lng} = this.state.currentLocation;
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
        const {children} = this.props;

        // var contentString1 = '<div id="content"><h1>Käpylän peruskoulu</h1><h3>Vapaat toimeksiannot</h3>' +
        //     '<object type="text/html" data="/koulunomattoimeksiannot" width="600px" height="600px" >\n' +
        //     '</object></div>';

        var contentString1 = '<div id="content"><h1>Academy</h1><h3>Vapaat toimeksiannot</h3>\' +\n' +
            '        //     \'<object type="text/html" data="/toimeksiannot" width="600px" height="600px" >\\n\' +\n' +
            '        //     \'</object></div>';

        var infowindow1 = new window.google.maps.InfoWindow({
            content: contentString1
        });

        var contentString2 = '<div id="content"><h1>Ressun peruskoulu</h1><p>RESSUN PERUSKOULUN VAPAAT SIJAISUUDET: </p></div>';

        var infowindow2 = new window.google.maps.InfoWindow({
            content: contentString2
        });

        // Tehdään toimeksiannoista taulukko, jonka yksi alkio vastaa yhtä koulua (nimi, lat, long, toimeksiantojen lkm)
        var koulutaulukko = [];
        var loytyykoKoulutaulukosta = false;
        for (var i = 0; i < this.state.toimeksiantodata.length; ++i) {
            loytyykoKoulutaulukosta = false;

            if (koulutaulukko.length == 0) {
                koulutaulukko[i] = [this.state.toimeksiantodata[i].koulu.kouluNimi,
                    this.state.toimeksiantodata[i].koulu.kouluKoordLat,
                    this.state.toimeksiantodata[i].koulu.kouluKoordLong,
                    1];
            } else {

                for (var y = 0; y < koulutaulukko.length; ++y) {
                    if (koulutaulukko[y][0] === this.state.toimeksiantodata[i].koulu.kouluNimi) {
                        koulutaulukko[y][3] += 1;
                        loytyykoKoulutaulukosta = true;
                        break;
                    }
                }

                if (loytyykoKoulutaulukosta == false) {
                    koulutaulukko[i] = [this.state.toimeksiantodata[i].koulu.kouluNimi,
                        this.state.toimeksiantodata[i].koulu.kouluKoordLat,
                        this.state.toimeksiantodata[i].koulu.kouluKoordLong,
                        1];
                }
            }

            console.log("MONTAKOHAN KERTAA TÄMÄ NÄKYY");
            // Mäpätään toimeksiannot taulukosta markkereiksi
            var markerit;
            for (var toimeksianto = 0; toimeksianto < koulutaulukko.length; ++toimeksianto) {
                markerit = new this.props.google.maps.Marker({
                    position: {lat: koulutaulukko[toimeksianto][1], lng: koulutaulukko[toimeksianto][2]},
                    map: this.map,
                    // label: markkerit[i2][3].toString(),
                    title: koulutaulukko[toimeksianto][0],

                });

                markerit.addListener('click', function () {
                    this.map.setZoom(18);
                    this.map.setCenter(markerit.getPosition());
                    infowindow1.open(this.map, markerit, contentString1);
                });

            }

        }

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

        const style = Object.assign({}, mapStyles.map);

        return (
            <div>
                <div style={style} ref="map">
                    Ladataan karttaa...
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