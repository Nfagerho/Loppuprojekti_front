import React, {Component} from 'react';
import { withAuthorization } from '../../Session';
import { lahetaSijainen } from '../../../../restpalvelu';

//Täällä sijainen pystyy rekisteröitymään PostgreSQL-tietokantaan
class SijaisenRekisterointilomake extends Component {

    state = {
        sijainenNimi: '',
        sijainenOsoite: '',
        sijainenPuhelinnumero: '',
        sijainenSahkoposti: ''
    };


   lahetaLomake = () => {
       lahetaSijainen(this.state)
   };


    render() {
        return (
            <div>
                <h1>Rekisteröidy PostgreSQL-tietokantaan:</h1>
                <form>Nimi:
                    <input type="text" placeholder=""
                           value={this.state.sijainenNimi}
                           onChange={this.handlaaSijainenNimi}/><br/>
                    Osoite:
                    <input type="text" placeholder=""
                           value={this.state.sijainenOsoite}
                           onChange={this.handlaaSijainenOsoite}/><br/>
                    Puhelinnumero:
                    <input type="text" placeholder=""
                           value={this.state.sijainenPuhelinnumero}
                           onChange={this.handlaaSijainenPuhelinnumero}/><br/>
                    Sähköposti:
                    <input type="text" placeholder=""
                           value={this.state.sijainenSahkoposti}
                           onChange={this.handlaaSijainenSahkoposti}/><br/>
                    <button type="submit" onClick={this.lahetaLomake}>Lähetä tiedot</button>
                </form>
            </div>
        );
    }

    handlaaSijainenNimi = (e) => {
        this.setState({sijainenNimi: e.target.value});
    };
    handlaaSijainenOsoite = (e) => {
        this.setState({sijainenOsoite: e.target.value});
    };
    handlaaSijainenPuhelinnumero = (e) => {
        this.setState({sijainenPuhelinnumero: e.target.value});
    };
    handlaaSijainenSahkoposti = (e) => {
        this.setState({sijainenSahkoposti: e.target.value});
    }; 

}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(SijaisenRekisterointilomake);