import React, { Component } from 'react';
import { haeKaikkiToimeksiannot } from '../../../../restpalvelu' ;


//Täällä haetaan yksittäiseen kouluun liittyvät toimeksiannot. Tällä hetkellä koodiin on kovakoodattu koulunID 1. Tämä pitäisi
//saada vastaamaan sisäänkirjautuneen koulun ID:tä Firebasen kautta.
class KoulunToimeksiannot extends Component {
    constructor(props) {
        super(props);
        this.state = {toimeksiantodata: []};
    }
    componentDidMount () {
        this.haekaikki();
    }
    haekaikki() {
        haeKaikkiToimeksiannot(this.kaikkihaettu);
    }
    kaikkihaettu = (haettudata, virhe) => {
        if(virhe) {
            alert("virhe");
        } else {
            this.setState({toimeksiantodata: haettudata});
           
        }
    }

    
//Alla olevaan mappaukseen on kovakoodattu kouluID 1. Eli IF-lause tsekkaa, onko toimeksiantoon kytketyn koulun ID 1, jos on niin
//näyttää toimeksiannon. Jos ei, niin ei näytä mitään.
    render() {
       
        var toimeksiantooliot = this.state.toimeksiantodata.map(function(toimeksiantomappi){
            if (toimeksiantomappi.koulu && toimeksiantomappi.koulu.kouluId === 1) {
            return <li key={toimeksiantomappi.toimeksiantoId}>  
                {toimeksiantomappi.koulu &&
            <li>Oppiaine: {toimeksiantomappi.oppiaine}<br/> Alkaa: {toimeksiantomappi.toimeksiantoAlkuPvm} Loppuu: {toimeksiantomappi.toimeksiantoLoppuPvm}</li>}</li> }
           
        })
    
        return (    
            <ul>
                {toimeksiantooliot}
            </ul>
        );
        
    }
    }

export default KoulunToimeksiannot;