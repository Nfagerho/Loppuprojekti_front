import React, {Component} from 'react';
import {haeKaikkiToimeksiannot, poistaToimeksianto, muokkaaToimeksianto} from '../../../../restpalvelu';
import { Route, Redirect } from 'react-router'


//Täällä haetaan yksittäiseen kouluun liittyvät toimeksiannot. Tällä hetkellä koodiin on kovakoodattu koulunID 1. Tämä pitäisi
//saada vastaamaan sisäänkirjautuneen koulun ID:tä Firebasen kautta.
class KoulunToimeksiannot extends Component {
    constructor(props) {
        super(props);
        this.state = {toimeksiantodata: []};
    }

    componentDidMount() {
        this.haekaikki();
    }

    haekaikki() {
        haeKaikkiToimeksiannot(this.kaikkihaettu);
    }

    kaikkihaettu = (haettudata, virhe) => {
        if (virhe) {
            alert("virhe");
        } else {
            this.setState({toimeksiantodata: haettudata});

        }
    }
    //Metodi poistaa yksittäisen toimeksiannon ID:n perusteella ja tämän jälkeen päivittää toimeksiantojen listan
    poistaToimeksiantoById = (e) => {
        e.preventDefault();
        poistaToimeksianto(e.target.value).then((function(){
            this.haekaikki();
        }).bind(this));
       
        
    };
//Metodi lähettää selaimen URL:illa muokattavan toimeksiannon ID > MuokkaaToimeksiantoa.js komponentille käsiteltäväksi. Siellä tapahtuu itse muokkaus.
    handlaamuokkaus = (e) => {
        this.props.history.push('/muokkaalomake/'+ e.target.value);
        };


//Alla olevaan mappaukseen on kovakoodattu kouluID 1. Eli IF-lause tsekkaa, onko toimeksiantoon kytketyn koulun ID 1, jos on niin
//näyttää toimeksiannon. Jos ei, niin ei näytä mitään.
    render() {

        var toimeksiantooliot = this.state.toimeksiantodata.map((toimeksiantomappi) => {
            if (toimeksiantomappi.koulu && toimeksiantomappi.koulu.kouluId === 1) {
                
                return <li key={toimeksiantomappi.toimeksiantoId}>
                    {toimeksiantomappi.koulu &&
                    <li>Oppiaine: {toimeksiantomappi.oppiaine}<br/> Alkaa: {toimeksiantomappi.toimeksiantoAlkuPvm} Loppuu: {toimeksiantomappi.toimeksiantoLoppuPvm}
                    </li>}
                    <button type="button"
                            value={toimeksiantomappi.toimeksiantoId}
                            onClick={this.poistaToimeksiantoById}>Poista toimeksianto</button> 
                            
                            <button type="button"
                            value={toimeksiantomappi.toimeksiantoId} onClick={this.handlaamuokkaus}>Muokkaa toimeksiantoa</button>
                </li>
               
            }

            // sessionStorage.setItem("toimeksiantoja", JSON.stringify(toimeksiantomappi));
            
            // console.log(JSON.parse(sessionStorage.getItem('toimeksiantoja')));
            
            
            
        })
       
        return (
            <ul>
                {toimeksiantooliot}
            </ul>
        );

    }
}

export default KoulunToimeksiannot;