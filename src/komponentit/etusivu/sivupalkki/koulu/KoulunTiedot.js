import React, { Component } from 'react';
import { haeKoulunTiedot } from '../../../../restpalvelu';
import { haeKaikkiToimeksiannot } from '../../../../restpalvelu' ;


// Täällä haetaan koulun omat tiedot. Tällä hetkellä hakee kaikkien koulujen kaikki tiedot. 
class KoulunTiedot extends Component {
    
    constructor(props) {
        super(props);
        this.state = {kouluntiedotdata: []};
   
    }
    componentDidMount () {
        this.haekaikki();
    }
    haekaikki() {
        haeKoulunTiedot(this.kaikkihaettu);
    }
    kaikkihaettu = (haettudata, virhe) => {
        if(virhe) {
            alert("virhe");
        } else {
            this.setState({kouluntiedotdata: haettudata});
      
        }
    }
    //Täällä mapataan data
    render() {
       
       console.log(this.state.kouluntiedotdata)
        var kouluntiedotolio = this.state.kouluntiedotdata.map(function(kouluntiedotmappi){
            return <li key={kouluntiedotmappi.kouluId}>Nimi: {kouluntiedotmappi.kouluNimi} <li>Osoite: {kouluntiedotmappi.kouluOsoite} Yhteyshenkilö: {kouluntiedotmappi.kouluYhteyshenkilo}</li>
                    </li>
               
           
        })
       //ja näytetään se sivustolla:
        return (    
            <ul>
                {kouluntiedotolio}
            </ul>
        );
        
    }
    }

export default KoulunTiedot;