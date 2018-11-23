import React, {Component} from 'react';
import {haeYksittainenKoulu, muokkaaKoulua} from '../../../restpalvelu';


class KoulunTietojenMuokkaus extends Component {
    state = {
        kouluId: this.props.match.params.id,
        kouluNimi: '',
        kouluOsoite: '',
        kouluYhteyshenkilo: ''
    
    };



    componentDidMount () {
         this.haeyksikoulu();
     }

     haeyksikoulu() {
        haeYksittainenKoulu(this.yksihaettu, this.props.match.params.id);
    }
    yksihaettu = (haettudata, virhe) => {
        if (virhe) {
            alert("virhe");
        } else {
            this.setState({kouluId: haettudata.kouluId, kouluNimi: haettudata.kouluNimi, kouluOsoite: haettudata.kouluOsoite,
                kouluYhteyshenkilo: haettudata.kouluYhteyshenkilo});
                
                
            
        }
    }
   
    muokkaatietoja = (e) => {
        e.preventDefault();
        muokkaaKoulua(this.state.kouluId, this.state)
       
    };

    render() {
        console.log("Muokkaa, render", this.state);
        return (
            <div>
                <form>
                    Nimi: <br/>
                    <input type="text" placeholder=""
                           value={this.state.kouluNimi}
                           onChange={this.handlaaNimi}/><br/>
                    Osoite: <br/>
                    <input type="text" placeholder=""
                           value={this.state.kouluOsoite}
                           onChange={this.handlaaOsoite}/><br/>
                    Yhteyshenkilö: <br/>
                    <input type="text" placeholder=""
                           value={this.state.kouluYhteyshenkilo}
                           onChange={this.handlaaYhteystieto}/><br/>
                    <button type="submit" onClick={this.muokkaatietoja}>Muokkaa omia tietoja</button>
                </form>
            </div>
        );
    }

  
    handlaaNimi = (e) => {
        this.setState({kouluNimi: e.target.value});
    };
    handlaaOsoite = (e) => {
        this.setState({kouluOsoite: e.target.value});
    };
    handlaaYhteystieto = (e) => {
        this.setState({kouluYhteyshenkilo: e.target.value});
    };
    

}


export default KoulunTietojenMuokkaus;