import React, {Component} from 'react';
import {haeKaikkiToimeksiannot, poistaToimeksianto, muokkaaToimeksianto} from '../../../../restpalvelu';

class MuokkaaToimeksianto extends Component {
    state = {
        toimeksiantoId: this.props.match.params.id,
        toimeksiantoAlkuPvm: '',
        toimeksiantoLoppuPvm: '',
        oppiaine: '',
        koulu: 1
    };
    
    muokkaalomake = (e) => {
        e.preventDefault();
        muokkaaToimeksianto(this.state.toimeksiantoId, this.state)
    };

    render() {
        return (
            <div>
                <form>
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
                    <button type="submit" onClick={this.muokkaalomake}>Muokkaa toimeksianto</button>
                </form>
            </div>
        );
    }

  
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

export default MuokkaaToimeksianto;