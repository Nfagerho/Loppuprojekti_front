import ReactDOM from 'react-dom';
import React, { Component } from 'react';
///////////////////////////////
import { haeKaikkiToimeksiannot } from '../../../restpalvelu';
import { runInThisContext } from 'vm';
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

        // var markkerit = [];
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
         
            // Tehdään toimeksiannoista taulukko, jonka yksi alkio vastaa yhtä koulua (nimi, lat, long, toimeksiantojen lkm)
            var markkerit = new Array ( );
            var matchi = false;
            for(var i = 0; i < this.state.toimeksiantodata.length; ++i){

                matchi = false;

                if(markkerit.length == 0) {
                        markkerit[i] = new Array ( 
                        this.state.toimeksiantodata[i].koulu.kouluNimi,
                        this.state.toimeksiantodata[i].koulu.kouluKoordLat,
                        this.state.toimeksiantodata[i].koulu.kouluKoordLong,
                        1);
                } else {
                    for(var y = 0; y < markkerit.length; ++y) {
                        console.log(this.state.toimeksiantodata[i].koulu.kouluNimi);
                        console.log("TÄMÄ ON ACADEMY:", markkerit[0][0]);
                        if(markkerit[y][0] === this.state.toimeksiantodata[i].koulu.kouluNimi){
                            markkerit[y][3] += 1;
                            console.log("Nyt sen piti lisätä +1 Ressun kouluun");
                            matchi = true;
                            break;
                        }
                    }

                    if(matchi == false) {
                        markkerit[i] = new Array ( 
                            this.state.toimeksiantodata[i].koulu.kouluNimi,
                            this.state.toimeksiantodata[i].koulu.kouluKoordLat,
                            this.state.toimeksiantodata[i].koulu.kouluKoordLong,
                            1); 
                    }
                }

                console.log("MARKKERIT!!!!!!!!!!!!!!!!!!", markkerit);
                console.log(markkerit[0][1]);

                
                for(var x = 0; x < markkerit.length; ++x) {
                    console.log("KOULU " + x);
                    for(var xx = 0; xx < 4; ++xx) {
                        console.log(markkerit[x][xx]);
                    }
                }

                // Mäpätään toimeksiannot taulukosta markkereiksi
                var markerit;
                for(var i2 = 0; i2 < markkerit.length; ++i2){
                    // console.log(this.state.toimeksiantodata[i]);
                    console.log("iiiiiiiiiiiiiii", i2);
                    console.log(markkerit[i2][1]);
                    markerit = new this.props.google.maps.Marker({
                        position: {lat: markkerit[i2][1], lng: markkerit[i2][2]},
                        map: this.map,
                        title: markkerit[i2][0],
                        label: markkerit[i2][3].toString(),
                    });
                }
                
                  
                // markkerit[i].push(this.state.toimeksiantodata[i].koulu.kouluNimi);
                // markkerit[i].push(this.state.toimeksiantodata[i].koulu.kouluKoordLat);
                // markkerit[i].push(this.state.toimeksiantodata[i].koulu.kouluKoordLong);
                // markkerit[i].push(this.state.toimeksiantodata[i].koulu.kouluKoordLong);
                // console.log("Yksi koulu" + JSON.stringify(this.state.toimeksiantodata[i].koulu));
                // console.log("MARKERIT", markerit);
                // markerit = new this.props.google.maps.Marker({
                //     position: {lat: this.state.toimeksiantodata[i].koulu.kouluKoordLat, lng: this.state.toimeksiantodata[i].koulu.kouluKoordLong},
                //     map: this.map,
                //     title: this.state.toimeksiantodata[i].koulu.kouluNimi,
                //     // Labeliin ++1
                //     label: "1",
                // });
            }

            // var markerit;
            // // Mäpätään toimeksiannot markkereiksi
            // for(var i = 0; i < this.state.toimeksiantodata.length; ++i){
            //     // console.log(this.state.toimeksiantodata[i]);
            //     console.log("MARKERIT", markerit);
            //     markerit = new this.props.google.maps.Marker({
            //         position: {lat: this.state.toimeksiantodata[i].koulu.kouluKoordLat, lng: this.state.toimeksiantodata[i].koulu.kouluKoordLong},
            //         map: this.map,
            //         title: this.state.toimeksiantodata[i].koulu.kouluNimi,
            //         // Labeliin ++1
            //         label: "1",
            //     });
            // }

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

        // var markerit, i;
        // // Mäpätään toimeksiannot markkereiksi
        // for(var i = 0; i < this.state.toimeksiantodata.length; ++i){
        //     // console.log(this.state.toimeksiantodata[i]);
        //     console.log("MARKERIT", markerit);
        //     markerit = new this.props.google.maps.Marker({
        //         position: {lat: this.state.toimeksiantodata[i].koulu.kouluKoordLat, lng: this.state.toimeksiantodata[i].koulu.kouluKoordLong},
        //         map: this.map,
        //         title: this.state.toimeksiantodata[i].koulu.kouluNimi,
        //         // Labeliin ++1
        //         label: "1",
        //     });
        // }

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