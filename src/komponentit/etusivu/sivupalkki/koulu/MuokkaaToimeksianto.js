import React, {Component} from 'react';
import {lahetaToimeksianto} from "../../../../restpalvelu";

class MuokkaaToimeksianto extends Component {

    lahetaLomake = () => {
        lahetaToimeksianto(this.state)
    };
    render() {
        console.log(this.props);
        return (
            <div>
                <form>Koulun nimi: <br/>
                    <input type="text" placeholder={this.props.kouluNimi}
                           value={this.props.kouluNimi}
                           onChange={this.handlaaKouluNimi}/><br/>
                    Koulun osoite: <br/>
                    <input type="text" placeholder={this.props.kouluOsoite}
                           value={this.props.kouluOsoite}
                           onChange={this.handlaaKouluOsoite}/><br/>
                    Koulun yhteyshenkilö: <br/>
                    <input type="text" placeholder={this.props.kouluYhteyshenkilo}
                           value={this.props.kouluYhteyshenkilo}
                           onChange={this.handlaaKouluYhteyshenkilo}/><br/>
                    Toimeksiannon Alkuaika: <br/>
                    <input type="datetime-local" placeholder={this.props.toimeksiantoAlkuaika}
                           value={this.props.toimeksiantoAlkuaika}
                           onChange={this.handlaatoimeksiantoAlkuaika}/><br/>
                    Toimeksiannon Loppuaika: <br/>
                    <input type="datetime-local" placeholder={this.props.toimeksiantoLoppuaika}
                           value={this.props.toimeksiantoLoppuaika}
                           onChange={this.handlaatoimeksiantoLoppuaika}/><br/>
                    Oppiaine: <br/>
                    <input type="text" placeholder={this.props.oppiaine}
                           value={this.props.oppiaine}
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
}

export default MuokkaaToimeksianto;