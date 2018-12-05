import React from 'react';
import { GoogleApiWrapper, InfoWindow, Map, Marker } from 'google-maps-react';
import {haeKaikkiToimeksiannot} from '../../../restpalvelu'; 
import { Route, Redirect } from 'react-router';

class GoogleMapsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      // Tämä on toistaiseksi kovakoodattu
      currentLocation: {lat: '60.169857', lng: '24.938379'},
      selectedPlace: {},
      toimeksiantodata: []
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

  // Haetaan toimeksiantodata
  haekaikki() {
    haeKaikkiToimeksiannot(this.kaikkihaettu);
  }

  kaikkihaettu = (haettudata, virhe) => {
      if (virhe) {
          alert("virhe");
      } else {
          this.setState({toimeksiantodata: haettudata});
          // console.log(haettudata);
          // console.log(this.state.toimeksiantodata[0].koulu.kouluKoordLat);
          // console.log(this.state.toimeksiantodata[0].koulu.kouluKoordLong);
      }
  };

  componentDidMount() {
    this.haekaikki();
  }

  // <--- Haetaan toimeksiantodata

  render() {
    const style = {
      width: '100%',
      height: '100%',
      'marginLeft': '0px',
      'marginRight': 'auto'
    }

    // Tehdään toimeksiannoista taulukko, jonka yksi alkio vastaa yhtä koulua (nimi, lat, long, toimeksiantojen lkm)
    var koulutaulukko = [];
    var loytyykoKoulutaulukosta = false;
    for (var i = 0; i < this.state.toimeksiantodata.length; ++i) {
        loytyykoKoulutaulukosta = false;

        if (koulutaulukko.length == 0) {
            koulutaulukko[i] = [this.state.toimeksiantodata[i].koulu.kouluNimi,
                this.state.toimeksiantodata[i].koulu.kouluKoordLat,
                this.state.toimeksiantodata[i].koulu.kouluKoordLong,
                1, "/sijainen/koulunsijaisuudet/" + this.state.toimeksiantodata[i].koulu.kouluId];
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
                    1, "/sijainen/koulunsijaisuudet/" + this.state.toimeksiantodata[i].koulu.kouluId];
            }
        }
    }

    // Mäpätään koulutaulukon sisältö markkereiksi

    // var mapataanMarkkerit = koulutaulukko.map(function (datamappi) {
      var mapataanMarkkerit = koulutaulukko.map((datamappi) => {

      if (datamappi) {
                  return <Marker      
                  // MIKSI TÄTÄ EI SAA TOIMIMAAN:     
                    onClick = { this.onMarkerClick }

                    // onClick={ history.push('/sijainen/koulunsijaisuudet/1') }
                    // onClick={ console.log("fuu") }

                    key = { datamappi[0] }
                    title = { datamappi[0] + "\n" + "Sijaisuuksia: " + datamappi[3]}
                    position = {{ lat: datamappi[1], lng: datamappi[2] }}
                    name = { datamappi[0] }
                    label = { " " + datamappi[3] }
                    toimeksiannot = {datamappi[3]}
                    // urli = "/sijainen/koulunsijaisuudet/2"
                    urli = {datamappi[4]}
                    >
                  
                    </Marker>
        }
    });

    console.log(koulutaulukko[0]);

    return (
      <Map
        item
        xs = { 12 }
        style = { style }
        google = { this.props.google }
        onClick = { this.onMapClick }
        size = {{width: 100, height: '500px'}}
        zoom = { 14 }
        initialCenter = {{ lat: this.state.currentLocation.lat, lng: this.state.currentLocation.lng }}
      >
        <Marker
          onClick = { this.onMarkerClick }
          title = { 'Helsinki' }
          position = {{ lat: 60.169857, lng: 24.938379 }}
          name = { 'Hki' }
        />

        <Marker
          onClick = { this.onMarkerClick }
          title = { 'Helsinki 2' }
          position = {{ lat: 60.169250, lng: 24.938379 }}
          name = { 'Hki 2' }
        />

        {/* Markkerit: */}
        {mapataanMarkkerit}

        {/* Markkeria napsautettaessa ilmestyy infowindow, joka näyttää koulun nimen: */}
        <InfoWindow
          marker = { this.state.activeMarker }
          visible = { this.state.showingInfoWindow }

        >
        <p>{this.state.selectedPlace.name}</p>
        <p>Sijaisuuksia: {this.state.selectedPlace.toimeksiannot} kpl</p>
        <a href={this.state.selectedPlace.urli}>Näytä sijaisuudet</a>
        </InfoWindow>



      </Map>
    );
  }
}
export default GoogleApiWrapper({
    api: ("")
})(GoogleMapsContainer)