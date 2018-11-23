import React, {Component} from 'react';
import {lahetaToimeksianto, poistaToimeksianto} from "../../../../restpalvelu";


class Lomake extends Component {

    state = {
        toimeksiantoId: '',
        kouluNimi: '',
        kouluOsoite: '',
        kouluYhteyshenkilo: '',
        toimeksiantoAlkuaika: '',
        toimeksiantoLoppuaika: '',
        oppiaine: '',
        koulu: 1
    };


   lahetaLomake = () => {
       lahetaToimeksianto(this.state)
   };


    render() {
        return (
            <div>
                <form>Poista toimeksianto
                    <input type="text" placeholder=""
                           value={this.state.toimeksiantoId}
                           onChange={this.handlaaPoistoByToimeksiantoId}/><br/>
                    <button type="submit" onClick={this.poistaToimeksiantoById}>Poista toimeksianto ID:llä</button>
                </form>
                <form>Koulun nimi:
                    <input type="text" placeholder=""
                           value={this.state.kouluNimi}
                           onChange={this.handlaaKouluNimi}/><br/>
                    Koulun osoite:
                    <input type="text" placeholder=""
                           value={this.state.kouluOsoite}
                           onChange={this.handlaaKouluOsoite}/><br/>
                    Koulun yhteyshenkilö:
                    <input type="text" placeholder=""
                           value={this.state.kouluYhteyshenkilo}
                           onChange={this.handlaaKouluYhteyshenkilo}/><br/>
                    Toimeksiannon Alkuaika:
                    <input type="datetime-local" placeholder=""
                           value={this.state.toimeksiantoAlkuaika}
                           onChange={this.handlaatoimeksiantoAlkuaika}/><br/>
                    Toimeksiannon Loppuaika:
                    <input type="datetime-local" placeholder=""
                           value={this.state.toimeksiantoLoppuaika}
                           onChange={this.handlaatoimeksiantoLoppuaika}/><br/>
                    Oppiaine:
                    <input type="text" placeholder=""
                           value={this.state.oppiaine}
                           onChange={this.handlaaoppiaine}/><br/>
                    <button type="submit" onClick={this.lahetaLomake}>Lisää toimeksianto</button>
                </form>
            </div>
        );
    }

    handlaaKouluNimi = (e) => {
        this.setState({kouluNimi: e.target.value});
    };
    handlaaKouluOsoite = (e) => {
        this.setState({kouluOsoite: e.target.value});
    };
    handlaaKouluYhteyshenkilo = (e) => {
        this.setState({kouluYhteyshenkilo: e.target.value});
    };
    handlaatoimeksiantoAlkuaika = (e) => {
        this.setState({toimeksiantoAlkuaika: e.target.value});
    };
    handlaatoimeksiantoLoppuaika = (e) => {
        this.setState({toimeksiantoLoppuaika: e.target.value});
    };
    handlaaoppiaine = (e) => {
        this.setState({oppiaine: e.target.value});
    };
    handlaaPoistoByToimeksiantoId = (e) => {
        this.setState({toimeksiantoId: e.target.value})
    };
    poistaToimeksiantoById = () => {
        poistaToimeksianto(this.state)
    }

}

export default Lomake;