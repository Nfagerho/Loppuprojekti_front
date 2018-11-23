import React, {Component} from 'react';
import {haeYksittainenToimeksianto, poistaToimeksianto, muokkaaToimeksianto} from '../../../restpalvelu';
import { withAuthorization } from '../../firebase/Session';

//Täällä haetaan muokattavan toimeksiannon tiedot ja asetetaan ne stateen. 

class MuokkaaToimeksianto extends Component {
    state = {
        toimeksiantoId: '',
        toimeksiantoAlkuaika: '',
        toimeksiantoLoppuaika: '',
        oppiaine: '',
        koulu: 1,
        sijainen: ''
    };



    componentDidMount () {
         this.haeyksi();
     }

     //Haetaan selaimesta tulevalla id:llä (this.props.match.params.id) yksittäisen toimeksiannon tiedot ja
     //laitetaan sen jälkeen setStatella ne stateksi. Tällöin lomake saa tiedot automaattisesti ja voit muokata niitä haluamallasi tavalla
     haeyksi() {
        haeYksittainenToimeksianto(this.yksihaettu, this.props.match.params.id);
    }
    yksihaettu = (haettudata, virhe) => {
        if (virhe) {
            alert("virhe");
        } else {
            this.setState({toimeksiantoId: haettudata.toimeksiantoId, toimeksiantoAlkuaika: haettudata.toimeksiantoAlkuaika, toimeksiantoLoppuaika: haettudata.toimeksiantoLoppuaika,
                oppiaine: haettudata.oppiaine, sijainen: haettudata.sijainen});
                
                
            
        }
    }
   
    //Lomakkeen muokkausfunktio, joka aktivoituu buttonin painalluksesta. Kun muokkaus on tehty, siirtää se sivuston automaattisesti
    //omiin toimeksiantoihin.
    muokkaalomake = (e) => {
        e.preventDefault();
        muokkaaToimeksianto(this.state.toimeksiantoId, this.state)
        this.props.history.push('/koulunomattoimeksiannot/');
    };

    render() {
        console.log("Muokkaa, render", this.state);
        return (
            <div>
                <form>
                    Toimeksiannon AlkuPvm: <br/>
                    <input type="datetime-local" placeholder=""
                           value={this.state.toimeksiantoAlkuaika}
                           onChange={this.handlaatoimeksiantoAlkuaika}/><br/>
                    Toimeksiannon LoppuPvm: <br/>
                    <input type="datetime-local" placeholder=""
                           value={this.state.toimeksiantoLoppuaika}
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


const condition = authUser => !!authUser;

export default withAuthorization(condition)(MuokkaaToimeksianto);