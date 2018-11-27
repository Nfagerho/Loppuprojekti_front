import React, {Component }from "react";
import Popup from 'reactjs-popup';
import KaikkiToimeksiannot from "./KaikkiToimeksiannot";
import SijaisenToimeksiannot from "./SijaisenToimeksiannot";
import SijaisenTiedot from "./SijaisenTiedot";
import SijaisenTietojenMuokkaus from './SijaisenTietojenMuokkaus'
import ToimeksiannonVaraus from './ToimeksiannonVaraus'
import SignOutButton from "../../firebase/SignOut";

// testihommia
import { withAuthorization } from '../../firebase/Session';

// Tämä valikko tulee näkyviin, kun hampurilaista klikataan.
// export default class Valikko extends Component {
class Valikko extends Component {

    constructor(props) {
        super(props);
        this.state = {
            sijaisenNakyma: false,
            toimeksiantoNakyma: false,
            id : undefined,
            toimeksiantoid: undefined

        }
    }

    muokkaus = (id) => {
        this.setState({
            sijaisenNakyma: !this.state.sijaisenNakyma,
            id:id

        })
    }

    varaus = (id) => {
        this.setState({
            toimeksiantoNakyma: !this.state.toimeksiantoNakyma,
            toimeksiantoid:id

        })
    }

    render() {

        var emailii = this.props.firebase.naytaEmail();

        return   (
            <div className="menu">
              <ul>
                {/* <li onClick={close}>Omat sijaisuudet</li>
                <li onClick={close}>Näytä kaikki vapaat sijaisuudet</li>
                <li onClick={close}>Omat tiedot</li> */}
              
              {/* Näissä alla olevissa linkeissä valikon sulkeminen (onClick={close}) ei toimi*/}
                  <Popup trigger={<li onClick={this.props.close}>Omat sijaisuudet</li>} modal closeOnDocumentClick>
                      {/* Tähän täytyy laittaa ehtolause (jos lista tyhjä, mitä näytetään) */}
                      <SijaisenToimeksiannot emaili={emailii}/>
                  </Popup>
          
                  <Popup trigger={<li onClick={this.props.close}>Näytä kaikki vapaat sijaisuudet</li>} modal closeOnDocumentClick>
                      
                      {/* Tähän täytyy laittaa ehtolause (jos lista tyhjä, mitä näytetään) */}
                      {!this.state.toimeksiantoNakyma &&<KaikkiToimeksiannot histroy={this.props.history} varaus={this.varaus}/>}
                      
                      {this.state.toimeksiantoNakyma && <ToimeksiannonVaraus id={this.state.toimeksiantoid} varaus={this.varaus}/>}
            
                  </Popup>
          
                  <Popup trigger={<li onClick={this.props.close}>Omat tiedot</li>} modal closeOnDocumentClick>
                      <span> Tähän sijaisen omat tiedot. </span>
                      {!this.state.sijaisenNakyma &&<SijaisenTiedot emaili={emailii} histroy={this.props.history} muokkaus={this.muokkaus}/>}
                      
                      {this.state.sijaisenNakyma && <SijaisenTietojenMuokkaus id={this.state.id} muokkaus={this.muokkaus}/>}
                  </Popup>
                  <hr/>
                  <SignOutButton/>
              </ul>
            </div>
          );
    }
 }

 const condition = authUser => !!authUser;

export default withAuthorization(condition)(Valikko);