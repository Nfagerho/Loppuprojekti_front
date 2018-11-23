import React, { Component } from 'react';
import { haeKaikkiToimeksiannot } from '../../../restpalvelu' ;

//Täällä haetaan yksittäiseen sijaiseen liittyvät toimeksiannot. Tällä hetkellä koodiin on kovakoodattu SijaisenId 1. Tämä pitäisi
//saada vastaamaan sisäänkirjautuneen sijaisen ID:tä Firebasen kautta.
class SijaisenToimeksiannot extends Component {
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


//Alla olevaan mappaukseen on kovakoodattu sijaisenId 1. Eli IF-lause tsekkaa, onko toimeksiantoon kytketyn sijaisen ID 1, jos on niin
//näyttää toimeksiannon. Jos ei, niin ei näytä mitään.
    render() {
       
        var toimeksiantooliot = this.state.toimeksiantodata.map(function(toimeksiantomappi){
            if (toimeksiantomappi.sijainen && toimeksiantomappi.sijainen.sijainenId === 1) {
            return <li key={toimeksiantomappi.toimeksiantoId}>  
                {toimeksiantomappi.sijainen &&
            <li>Oppiaine: {toimeksiantomappi.oppiaine}<br/> Alkaa: {toimeksiantomappi.toimeksiantoAlkuPvm} Loppuu: {toimeksiantomappi.toimeksiantoLoppuPvm}</li>}</li> }
           
        })
    
        return (    
            <ul>
                {toimeksiantooliot}
            </ul>
        );
        
    }
    }
export default SijaisenToimeksiannot;