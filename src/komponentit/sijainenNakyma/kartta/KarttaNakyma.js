import ReactDOM from 'react-dom';
import React, {Component} from 'react';
import {haeKaikkiToimeksiannot} from '../../../restpalvelu';
// Tarviiko lisätä autentikointia?


const mapStyles = {
    map: {
        marginLeft: '1%',
        position: 'absolute',
        width: '98%',
        height: '72%'
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

        var contentString1 = '<div id="content"><h1>Academy</h1><h3>Vapaat toimeksiannot</h3><a href="/koulunomattoimeksiannot"/>Tästä sijaisuuksiin</div>';


        var contentString2 = '<div id="content"><h1>Ressun peruskoulu</h1><p>RESSUN PERUSKOULUN VAPAAT SIJAISUUDET: </p></div>';

        var infowindow2 = new window.google.maps.InfoWindow({
            content: contentString2
        });

        // // Tehdään toimeksiannoista taulukko, jonka yksi alkio vastaa yhtä koulua (nimi, lat, long, toimeksiantojen lkm)
        // var koulutaulukko = [];
        // var loytyykoKoulutaulukosta = false;
        // for (var i = 0; i < this.state.toimeksiantodata.length; ++i) {
        //     loytyykoKoulutaulukosta = false;

        //     if (koulutaulukko.length == 0) {
        //         koulutaulukko[i] = [this.state.toimeksiantodata[i].koulu.kouluNimi,
        //             this.state.toimeksiantodata[i].koulu.kouluKoordLat,
        //             this.state.toimeksiantodata[i].koulu.kouluKoordLong,
        //             1];
        //     } else {

        //         for (var y = 0; y < koulutaulukko.length; ++y) {
        //             if (koulutaulukko[y][0] === this.state.toimeksiantodata[i].koulu.kouluNimi) {
        //                 koulutaulukko[y][3] += 1;
        //                 loytyykoKoulutaulukosta = true;
        //                 break;
        //             }
        //         }

        //         if (loytyykoKoulutaulukosta == false) {
        //             koulutaulukko[i] = [this.state.toimeksiantodata[i].koulu.kouluNimi,
        //                 this.state.toimeksiantodata[i].koulu.kouluKoordLat,
        //                 this.state.toimeksiantodata[i].koulu.kouluKoordLong,
        //                 1];
        //         }
        //     }

        //     console.log("MONTAKOHAN KERTAA TÄMÄ NÄKYY");
        //     // Mäpätään toimeksiannot taulukosta markkereiksi
        //     var markerit;
        //     for (var toimeksianto = 0; toimeksianto < koulutaulukko.length; ++toimeksianto) {
        //         markerit = new this.props.google.maps.Marker({
        //             position: {lat: koulutaulukko[toimeksianto][1], lng: koulutaulukko[toimeksianto][2]},
        //             map: this.map,
        //             // label: markkerit[i2][3].toString(),
        //             title: koulutaulukko[toimeksianto][0],

        //         });

        //         markerit.addListener('click', function () {
        //             this.map.setZoom(18);
        //             this.map.setCenter(markerit.getPosition());
        //             infowindow1.open(this.map, markerit, contentString1);
        //         });

        //     }

        // }

        // Kovakoodatut koulumarkkerit
        // Markerin lisääminen (tämän koodin voi lisätä esim. renderinkin sisälle suoraan)
        // Academy
        var marker1 = new this.props.google.maps.Marker({
            position: {lat: 60.17187, lng: 24.82698},
            map: this.map,
            title: 'Academy',
        });

        // Tapahtuma, kun markeria klikataan
        marker1.addListener('click', function() {
            this.map.setZoom(18);
            this.map.setCenter(marker1.getPosition());
            infowindow1.open(this.map, marker1, contentString1);

        });

        var infowindow1 = new window.google.maps.InfoWindow({
            content: 'Academy' + '<br/><a href="/sijainen/koulunsijaisuudet/1">Näytä sijaisuudet</a>'
        });

        // Kauniaisten lukio
        var marker2 = new this.props.google.maps.Marker({
            position: {lat: 60.215197, lng: 24.704153},
            map: this.map,
            title: 'Kauniaisten lukio',
        });

        marker2.addListener('click', function() {
            this.map.setZoom(18);
            this.map.setCenter(marker2.getPosition());
            infowindow2.open(this.map, marker2);

        });

        var infowindow2 = new window.google.maps.InfoWindow({
            content: 'Kauniaisten lukio' + '<br/><a href="/sijainen/koulunsijaisuudet/2">Näytä sijaisuudet</a>'
        });

        // Helsingin Rudolf Steiner -koulu
        var marker3 = new this.props.google.maps.Marker({
            position: {lat: 60.201441, lng: 24.908629},
            map: this.map,
            title: 'Helsingin Rudolf Steiner -koulu',
        });

        marker3.addListener('click', function() {
            this.map.setZoom(18);
            this.map.setCenter(marker3.getPosition());
            infowindow3.open(this.map, marker3);

        });

        var infowindow3 = new window.google.maps.InfoWindow({
            content: 'Helsingin Rudolf Steiner -koulu' + '<br/><a href="/sijainen/koulunsijaisuudet/3">Näytä sijaisuudet</a>'
        });

        // Helsingin Saksalainen Koulu
        var marker4 = new this.props.google.maps.Marker({
            position: {lat: 60.167357, lng: 24.931953},
            map: this.map,
            title: 'Helsingin Saksalainen Koulu',
        });

        marker4.addListener('click', function() {
            this.map.setZoom(18);
            this.map.setCenter(marker4.getPosition());
            infowindow4.open(this.map, marker4);

        });

        var infowindow4 = new window.google.maps.InfoWindow({
            content: 'Helsingin Saksalainen Koulu' + '<br/><a href="/sijainen/koulunsijaisuudet/4">Näytä sijaisuudet</a>'
        });

        // Töölön ala-aste
        var marker5 = new this.props.google.maps.Marker({
            position: {lat: 60.182733, lng: 24.922112},
            map: this.map,
            title: 'Töölön ala-aste',
        });

        marker5.addListener('click', function() {
            this.map.setZoom(18);
            this.map.setCenter(marker5.getPosition());
            infowindow5.open(this.map, marker5);

        });

        var infowindow5 = new window.google.maps.InfoWindow({
            content: 'Töölön ala-aste' + '<br/><a href="/sijainen/koulunsijaisuudet/5">Näytä sijaisuudet</a>'
        });

        // Taivallahden Koulu
        var marker6 = new this.props.google.maps.Marker({
            position: {lat: 60.176776, lng: 24.916966},
            map: this.map,
            title: 'Taivallahden Koulu',
        });

        marker6.addListener('click', function() {
            this.map.setZoom(18);
            this.map.setCenter(marker6.getPosition());
            infowindow6.open(this.map, marker6);

        });

        var infowindow6 = new window.google.maps.InfoWindow({
            content: 'Taivallahden Koulu' + '<br/><a href="/sijainen/koulunsijaisuudet/6">Näytä sijaisuudet</a>'
        });

        // Käpylän Koulu
        var marker7 = new this.props.google.maps.Marker({
            position: {lat: 60.216615, lng: 24.947332},
            map: this.map,
            title: 'Käpylän Koulu',
        });

        marker7.addListener('click', function() {
            this.map.setZoom(18);
            this.map.setCenter(marker7.getPosition());
            infowindow7.open(this.map, marker7);

        });

        var infowindow7 = new window.google.maps.InfoWindow({
            content: 'Taivallahden Koulu' + '<br/><a href="/sijainen/koulunsijaisuudet/7">Näytä sijaisuudet</a>'
        });

        // Leppävaaran Lukio
        var marker8 = new this.props.google.maps.Marker({
            position: {lat: 60.226017, lng: 24.805696},
            map: this.map,
            title: 'Leppävaaran Lukio',
        });

        marker8.addListener('click', function() {
            this.map.setZoom(18);
            this.map.setCenter(marker8.getPosition());
            infowindow8.open(this.map, marker8);

        });

        var infowindow8 = new window.google.maps.InfoWindow({
            content: 'Leppävaaran Lukio' + '<br/><a href="/sijainen/koulunsijaisuudet/8">Näytä sijaisuudet</a>'
        });

        // Neulamäen Koulu
        var marker9 = new this.props.google.maps.Marker({
            position: {lat: 60.226017, lng: 24.805696},
            map: this.map,
            title: 'Neulamäen Koulu',
        });

        marker9.addListener('click', function() {
            this.map.setZoom(18);
            this.map.setCenter(marker9.getPosition());
            infowindow9.open(this.map, marker9);

        });

        var infowindow9 = new window.google.maps.InfoWindow({
            content: 'Neulamäen Koulu' + '<br/><a href="/sijainen/koulunsijaisuudet/9">Näytä sijaisuudet</a>'
        });

        // Ressun peruskoulu
        var marker10 = new this.props.google.maps.Marker({
            position: {lat: 60.16695, lng: 24.92725},
            map: this.map,
            title: 'Ressun peruskoulu',
        });

        marker10.addListener('click', function() {
            this.map.setZoom(18);
            this.map.setCenter(marker10.getPosition());
            infowindow10.open(this.map, marker10);

        });

        var infowindow10 = new window.google.maps.InfoWindow({
            content: 'Ressun peruskoulu' + '<br/><a href="/sijainen/koulunsijaisuudet/10">Näytä sijaisuudet</a>'
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