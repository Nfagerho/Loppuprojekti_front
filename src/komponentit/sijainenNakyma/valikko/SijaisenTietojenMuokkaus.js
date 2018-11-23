import React, {Component} from 'react';
import {haeYksittainenSijainen, muokkaaSijaista} from '../../../restpalvelu';

//Täällä haetaan muokattavan toimeksiannon tiedot ja asetetaan ne stateen. 

class SijaisenTietojenMuokkaus extends Component {
    state = {
        sijainenId: this.props.match.params.id,
        sijainenNimi: '',
        sijainenOsoite: '',
        sijainenPuhelinnumero: '',
        sijainenSahkoposti: ''
    
    };



    componentDidMount () {
         this.haeyksisijainen();
     }

     //Haetaan selaimesta tulevalla id:llä (this.props.match.params.id) yksittäisen toimeksiannon tiedot ja
     //laitetaan sen jälkeen setStatella ne stateksi. Tällöin lomake saa tiedot automaattisesti ja voit muokata niitä haluamallasi tavalla
     haeyksisijainen() {
        haeYksittainenSijainen(this.yksihaettu, this.props.match.params.id);
    }
    yksihaettu = (haettudata, virhe) => {
        if (virhe) {
            alert("virhe");
        } else {
            this.setState({sijainenId: haettudata.sijainenId, sijainenNimi: haettudata.sijainenNimi, sijainenOsoite: haettudata.sijainenOsoite,
                sijainenPuhelinnumero: haettudata.sijainenPuhelinnumero, sijainenSahkoposti: haettudata.sijainenSahkoposti});
                
                
            
        }
    }
   
    //Lomakkeen muokkausfunktio, joka aktivoituu buttonin painalluksesta. Kun muokkaus on tehty, siirtää se sivuston automaattisesti
    //omiin toimeksiantoihin.
    muokkaatietoja = (e) => {
        e.preventDefault();
        muokkaaSijaista(this.state.sijainenId, this.state)
       
    };

    render() {
        console.log("Muokkaa, render", this.state);
        return (
            <div>
                <form>
                    Nimi: <br/>
                    <input type="text" placeholder=""
                           value={this.state.sijainenNimi}
                           onChange={this.handlaaNimi}/><br/>
                    Osoite: <br/>
                    <input type="text" placeholder=""
                           value={this.state.sijainenOsoite}
                           onChange={this.handlaaOsoite}/><br/>
                    Puhelinnumero: <br/>
                    <input type="text" placeholder=""
                           value={this.state.sijainenPuhelinnumero}
                           onChange={this.handlaaPuhelinnumero}/><br/>
                    Sahköposti: <br/>
                    <input type="text" placeholder=""
                           value={this.state.sijainenSahkoposti}
                           onChange={this.handlaaSahkoposti}/><br/>
                    <button type="submit" onClick={this.muokkaatietoja}>Muokkaa omia tietoja</button>
                </form>
            </div>
        );
    }

  
    handlaaNimi = (e) => {
        this.setState({sijainenNimi: e.target.value});
    };
    handlaaOsoite = (e) => {
        this.setState({sijainenOsoite: e.target.value});
    };
    handlaaPuhelinnumero = (e) => {
        this.setState({sijainenPuhelinnumero: e.target.value});
    };
    handlaaSahkoposti = (e) => {
        this.setState({sijainenSahkoposti: e.target.value})
    };

}


export default SijaisenTietojenMuokkaus;