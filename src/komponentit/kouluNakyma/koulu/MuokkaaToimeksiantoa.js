import React, {Component} from 'react';
import {haeKaikkiToimeksiannot, poistaToimeksianto, muokkaaToimeksianto} from '../../../restpalvelu';

class MuokkaaToimeksianto extends Component {
    state = {
        toimeksiantoId: this.props.match.params.id,
        toimeksiantoAlkuaika: '',
        toimeksiantoLoppuaika: '',
        oppiaine: '',
        koulu: 1,
        sijainen: 1
    };



     // componentDidMount () {
    //     this.taytakentat();
    // }
    // taytakentat() {
    //     var testi = JSON.parse(sessionStorage.getItem('toimeksiantoja'));
    //     this.setState({toimeksiantoAlkuPvm: testi.toimeksiantoAlkuPvm, toimeksiantoLoppuPvm: testi.toimeksiantoLoppuPvm, oppiaine: testi.oppiaine});

        
    // }
   
    
    muokkaalomake = (e) => {
        e.preventDefault();
        muokkaaToimeksianto(this.state.toimeksiantoId, this.state)
        this.props.history.push('/koulunomattoimeksiannot/');
    };

    render() {
        return (
            <div>
                <form>
                    Toimeksiannon AlkuPvm: <br/>
                    <input type="datetime-local" placeholder=""
                           value={this.state.toimeksiantoAlkuaika}
                           onChange={this.handlaatoimeksiantoAlkuaika}/><br/>
                    Toimeksiannon LoppuPvm: <br/>
                    <input type="datetime-local" placeholder=""
                           value={this.state.handlaatoimeksiantoLoppuaika}
                           onChange={this.handlaatoimeksiantoLoppuaika}/><br/>
                    Oppiaine: <br/>
                    <input type="text" placeholder=""
                           value={this.state.oppiaine}
                           onChange={this.handlaaoppiaine}/><br/>
                    <button type="submit" onClick={this.muokkaalomake}>Muokkaa toimeksianto</button>
                </form>
            </div>
        );
    }

  
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


export default MuokkaaToimeksianto;