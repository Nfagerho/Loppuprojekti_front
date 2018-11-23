import React, {Component} from 'react';
import {haeYksittainenSijainen, muokkaaSijaista} from '../../../restpalvelu';


class SijaisenTietojenMuokkaus extends Component {
    state = {
        sijainenId: this.props.id,
        sijainenNimi: '',
        sijainenOsoite: '',
        sijainenPuhelinnumero: '',
        sijainenSahkoposti: ''
    
    };



    componentDidMount () {
         this.haeyksisijainen();
     }

     haeyksisijainen() {
        haeYksittainenSijainen(this.yksihaettu, this.props.id);
    }
    yksihaettu = (haettudata, virhe) => {
        if (virhe) {
            alert("virhe");
        } else {
            this.setState({sijainenId: haettudata.sijainenId, sijainenNimi: haettudata.sijainenNimi, sijainenOsoite: haettudata.sijainenOsoite,
                sijainenPuhelinnumero: haettudata.sijainenPuhelinnumero, sijainenSahkoposti: haettudata.sijainenSahkoposti});
                
                
            
        }
    }
   
    muokkaatietoja = (e) => {
        e.preventDefault();
        muokkaaSijaista(this.state.sijainenId, this.state)
        this.props.muokkaus();
       
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