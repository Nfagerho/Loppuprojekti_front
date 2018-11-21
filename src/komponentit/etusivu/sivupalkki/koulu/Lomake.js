import React, {Component} from 'react';
import {lahetaToimeksianto, poistaToimeksianto} from "../../../../restpalvelu";


class Lomake extends Component {
    state = {
        toimeksiantoId: '',
        kouluNimi: '',
        kouluOsoite: '',
        kouluYhteyshenkilo: '',
        toimeksiantoAlkuPvm: '',
        toimeksiantoLoppuPvm: '',
        oppiaine: '',
        koulu: 1
    };

    lahetaLomake = () => {
        lahetaToimeksianto(this.state)
    };

    render() {
        return (
            <div>
                <form>Poista toimeksianto<br/>
                    <input type="text" placeholder=""
                           value={this.state.toimeksiantoId}
                           onChange={this.handlaaPoistoByToimeksiantoId}/><br/>
                    <button type="submit" onClick={this.poistaToimeksiantoById}>Poista toimeksianto ID:llä</button>
                </form>
                <form>Koulun nimi: <br/>
                    <input type="text" placeholder=""
                           value={this.state.kouluNimi}
                           onChange={this.handlaaKouluNimi}/><br/>
                    Koulun osoite: <br/>
                    <input type="text" placeholder=""
                           value={this.state.kouluOsoite}
                           onChange={this.handlaaKouluOsoite}/><br/>
                    Koulun yhteyshenkilö: <br/>
                    <input type="text" placeholder=""
                           value={this.state.kouluYhteyshenkilo}
                           onChange={this.handlaaKouluYhteyshenkilo}/><br/>
                    Toimeksiannon AlkuPvm: <br/>
                    <input type="text" placeholder=""
                           value={this.state.toimeksiantoAlkuPvm}
                           onChange={this.handlaatoimeksiantoAlkuPvm}/><br/>
                    Toimeksiannon LoppuPvm: <br/>
                    <input type="text" placeholder=""
                           value={this.state.toimeksiantoLoppuPvm}
                           onChange={this.handlaatoimeksiantoLoppuPvm}/><br/>
                    Oppiaine: <br/>
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
    handlaatoimeksiantoAlkuPvm = (e) => {
        this.setState({toimeksiantoAlkuPvm: e.target.value});
    };
    handlaatoimeksiantoLoppuPvm = (e) => {
        this.setState({toimeksiantoLoppuPvm: e.target.value});
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