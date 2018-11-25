import React, { Component } from 'react';
import { haeKaikkiToimeksiannot } from '../../../restpalvelu' ;
import { withAuthorization } from '../../firebase/Session';

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

        //Tämä näyttää tulevat toimeksiannot
            var optiot = {day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit'};
            var toimeksiantooliot = this.state.toimeksiantodata.map(function(toimeksiantomappi){
            var aikamuutos = new Date(toimeksiantomappi.toimeksiantoAlkuaika);
            var aikamuutos1 = new Date(toimeksiantomappi.toimeksiantoLoppuaika);
            var d = new Date();
            var d1 = Date.parse(d);
            var d2 = Date.parse (aikamuutos1);
                if (toimeksiantomappi.sijainen && toimeksiantomappi.sijainen.sijainenId === 1) {
                    if (d2 > d1 ) {
            return <li key={toimeksiantomappi.toimeksiantoId}>
                
                {toimeksiantomappi.koulu &&
            <li class="toimeksiannot">Oppiaine: {toimeksiantomappi.oppiaine}<br/> Alkaa: {aikamuutos.toLocaleTimeString("fi", optiot)}<br/> 
            Loppuu: {aikamuutos1.toLocaleTimeString("fi", optiot)}<br/> 
            Koulu:{toimeksiantomappi.koulu.kouluNimi}<br/>  Osoite: {toimeksiantomappi.koulu.kouluOsoite}<br/>  Yhteyshenkilö:{toimeksiantomappi.koulu.kouluYhteyshenkilo}</li>}</li> }}
           
        })
        //Ja tämä menneet toimeksiannot
        var optiot = {day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit'};
        var toimeksiantooliotmenneet = this.state.toimeksiantodata.map(function(toimeksiantomappi){
        var aikamuutos = new Date(toimeksiantomappi.toimeksiantoAlkuaika);
        var aikamuutos1 = new Date(toimeksiantomappi.toimeksiantoLoppuaika);
        var d = new Date();
        var d1 = Date.parse(d);
        var d2 = Date.parse (aikamuutos1);
            if (toimeksiantomappi.sijainen && toimeksiantomappi.sijainen.sijainenId === 1) {
                if (d2 < d1 ) {
        return <li key={toimeksiantomappi.toimeksiantoId}>
            
            {toimeksiantomappi.koulu &&
        <li class="toimeksiannot">Oppiaine: {toimeksiantomappi.oppiaine}<br/> Alkaa: {aikamuutos.toLocaleTimeString("fi", optiot)}<br/> 
        Loppuu: {aikamuutos1.toLocaleTimeString("fi", optiot)}<br/> 
        Koulu:{toimeksiantomappi.koulu.kouluNimi}<br/>  Osoite: {toimeksiantomappi.koulu.kouluOsoite}<br/>  Yhteyshenkilö:{toimeksiantomappi.koulu.kouluYhteyshenkilo}</li>}</li> }}
       
    })
    
        return (    
            <ul>
                <li><p id="tuleva">Tulevat toimeksiannot:</p></li>  
                {toimeksiantooliot}
                <li><p id="meneva">Menneet toimeksiannot:</p></li>  
                {toimeksiantooliotmenneet}
            </ul>
            
            
        );
        
    }
    }

const condition = authUser => !!authUser;

export default withAuthorization(condition)(SijaisenToimeksiannot);