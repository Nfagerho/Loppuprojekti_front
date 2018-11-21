import React, {Component} from 'react';
import {lahetaToimeksianto} from "../../../../restpalvelu";

class Lomake extends Component {
    state = {
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
                <input type="text" placeholder="KouluNimi"
                       value={this.state.kouluNimi}
                       onChange={this.handlaaKouluNimi}/>
                <input type="text" placeholder="KouluOsoite"
                       value={this.state.kouluOsoite}
                       onChange={this.handlaaKouluOsoite}/>
                <input type="text" placeholder="KouluYhteyshenkilo"
                       value={this.state.kouluYhteyshenkilo}
                       onChange={this.handlaaKouluYhteyshenkilo}/>
                <input type="text" placeholder="toimeksiantoAlkuPvm"
                       value={this.state.toimeksiantoAlkuPvm}
                       onChange={this.handlaatoimeksiantoAlkuPvm}/>
                <input type="text" placeholder="toimeksiantoLoppuPvm"
                       value={this.state.toimeksiantoLoppuPvm}
                       onChange={this.handlaatoimeksiantoLoppuPvm}/>
                <input type="text" placeholder="oppiaine"
                       value={this.state.oppiaine}
                       onChange={this.handlaaoppiaine}/>
                <button type="submit" onClick={this.lahetaLomake}>Lisää toimeksianto</button>
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
    }
}

export default Lomake;