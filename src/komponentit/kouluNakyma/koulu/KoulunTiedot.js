import React, { Component } from 'react';
import { haeKoulunTiedot } from '../../../restpalvelu';
import { withAuthorization } from '../../firebase/Session';


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

    handlaatietojenmuokkaus = (e) => {
        this.props.history.push('/koulunomientietojenmuokkaus/'+ e.target.value);
        };

    //Täällä mapataan data
    render() {
       
       console.log(this.state.kouluntiedotdata)
        var kouluntiedotolio = this.state.kouluntiedotdata.map((kouluntiedotmappi) => {
            if (kouluntiedotmappi && kouluntiedotmappi.kouluId) {
                return <li key={kouluntiedotmappi.kouluId}>
                        Nimi: {kouluntiedotmappi.kouluNimi} <li>Osoite: {kouluntiedotmappi.kouluOsoite} 
                        Yhteyshenkilö: {kouluntiedotmappi.kouluYhteyshenkilo}</li>
                        <button type="button"value={kouluntiedotmappi.kouluId} onClick={this.handlaatietojenmuokkaus} >Muokkaa tietoja</button>
                        </li>}
               
           
        })
       //ja näytetään se sivustolla:
        return (    
            <ul>
                {kouluntiedotolio}
            </ul>
        );
        
    }
    }

const condition = authUser => !!authUser;

export default withAuthorization(condition)(KoulunTiedot);