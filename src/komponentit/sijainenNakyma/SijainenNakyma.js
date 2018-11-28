import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch, Link, Redirect} from 'react-router-dom';
import Kartta from './kartta/Kartta';
import './valikko/sivupalkki.css';
import Popup from 'reactjs-popup';
import BurgerIkoni from './valikko/BurgerIkoni';
import Valikko from './valikko/Valikko';
import Substidudes2 from '../substidudes2.png';
import userSymbol from './userSymbol.png';
import { Button } from 'react-bootstrap';

import SivuaEiLoytynyt from '../SivuaEiLoytynyt';
import SijaisenTiedot from './valikko/SijaisenTiedot';
import SijaisenToimeksiannot from './valikko/SijaisenToimeksiannot';
import KaikkiToimeksiannot from './valikko/KaikkiToimeksiannot';

// Autentikointiin liittyvää
import {withAuthorization, AuthUserContext} from '../firebase/Session';
import SignOutButton from "../firebase/SignOut";
import ToimeksiannonVaraus from './valikko/ToimeksiannonVaraus';
import { haeSijaisenTiedotEmaililla } from '../../restpalvelu';
import SijaisenTietojenMuokkaus from './valikko/SijaisenTietojenMuokkaus';

// import { sisaankirjaantuneenId } from './SisaankirjautunutId';


// Valikkoon liittyviä tyylityksiä
const styles = {
    fontFamily: "sans-serif",
    textAlign: "center",
    marginTop: "-25px"
};

// Valikkoon liittyviä tyylityksiä
const contentStyle = {
    // background: "rgba(255,255,255,0",
    background: "rgba(255,255,255,0.7",
    width: "40%",
    border: "none",
    borderRadius: "50px"

};


const Navigointipalkki = () => (
    <div>
        <Link to="/sijainen/"><Button className="Valikkonapit" bsStyle="danger">Kartta</Button></Link> &nbsp; &nbsp;
        <Link to="/sijainen/toimeksiannot"><Button className="Valikkonapit" bsStyle="danger">Sijaisuudet</Button></Link> &nbsp; &nbsp;
        <Link to="/sijainen/sijaisenomattoimeksiannot"><Button className="Valikkonapit" bsStyle="danger">Omat sijaisuudet</Button></Link> &nbsp; &nbsp;
        <Link to="/sijainen/sijaisentiedot"><Button className="Valikkonapit" bsStyle="danger">Käyttäjätili</Button></Link>
        <br/><br/>
    </div>
)

class SijainenNakyma extends Component {

    constructor(props) {
        super(props);

        this.state = { 
            sisaankirjautunut: '',
            sijainen: ''
        };
    }

    // Haetaan sisäänkirjautuneen emailin perusteella sijaisen id.
    componentDidMount() {
        this.haeyksisijainen();
    }

    haeyksisijainen() {
        var emaili3 = this.props.firebase.naytaEmail();
        haeSijaisenTiedotEmaililla(this.yksihaettu, emaili3);
    }

    yksihaettu = (haettudata, virhe) => {
        if (virhe) {
            alert("virhe");
        } else {
            this.setState({sijainen: haettudata.sijainenId});
        }
    }
    /////////


    render() {
        var emailii = this.props.firebase.naytaEmail();

        return (
            
            <div>
                <br/>
                <div className="logo">
                    <a href='/sijainen'>
                        <img src={Substidudes2} alt="Substidudes-logo"/></a>
                </div>
                <br/>
                {/* /*Näyttää sisäänkirjautuneen käyttäjän emailin ja user-logon sen edessä */}
                {/* <AuthUserContext.Consumer callbackfromparent = {this.callbackDataKomponentilta}>
                    {authUser => (
                        <div className="sisaanKirjautunut">
                            <p><img src={userSymbol} alt="userSymbol-logo" />{authUser.email}</p>
                        </div>
                    )}
                </AuthUserContext.Consumer> */}

                {/* Hampurilaismenu: */}
                {/* <div style={styles}>
                    <Popup
                        modal
                        // overlayStyle={{ background: "rgba(255,255,255,0.8"}}
                        overlayStyle={{background: "rgba(255,255,255,0"}}
                        contentStyle={contentStyle}
                        closeOnDocumentClick={true}
                        trigger={open => <BurgerIkoni open={open}/>}
                    >
                        {close => <Valikko close={close} history={this.props.history}/>}
                    </Popup>
                </div> */}
        
                <Router>
                    <div>
                        <div className="keskita">
                            <Navigointipalkki/>
                        </div>
                        <div  className="nakyma">
                        <Switch>
                            <Route path="/sijainen" exact component={Kartta}/>
                            <Route path="/sijainen/toimeksiannot" exact component={KaikkiToimeksiannot}/>
                            <Route path="/sijainen/sijaisenomattoimeksiannot" exact render={(props) => <SijaisenToimeksiannot {...props} emaili={emailii} />}/>
                            <Route path="/sijainen/sijaisentiedot" exact render={(props) => <SijaisenTiedot {...props} emaili={emailii} />}/>

                            <Route path='/toimeksiannonvaraus/:id' render={(props) => <ToimeksiannonVaraus {...props} sijaisenId={this.state.sijainen}/>}/>
                            <Route path='/sijaisenomientietojenmuokkaus/:id' render={(props) => <SijaisenTietojenMuokkaus {...props} sijaisenId={this.state.sijainen}/>}/>
                            <Route component={SivuaEiLoytynyt}/>
                        </Switch>
                        </div>
                    </div>
                </Router>
            </div>
        );
    }
}
// Autentikointiin liittyvää
const condition = authUser => !!authUser;
// Autentikointiin liittyvää
export default withAuthorization(condition)(SijainenNakyma);
// export default SijainenNakyma;
