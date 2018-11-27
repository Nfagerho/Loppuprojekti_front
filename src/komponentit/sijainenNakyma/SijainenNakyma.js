import React, {Component} from 'react';
import Kartta from './kartta/Kartta';
import './valikko/sivupalkki.css';
import Popup from 'reactjs-popup';
import BurgerIkoni from './valikko/BurgerIkoni';
import Valikko from './valikko/Valikko';
import Substidudes2 from '../substidudes2.png'


// Autentikointiin liittyvää
import {withAuthorization} from '../firebase/Session';


// Valikkoon liittyviä tyylityksiä
const styles = {
    fontFamily: "sans-serif",
    textAlign: "center",
    marginTop: "40px"
};

// Valikkoon liittyviä tyylityksiä
const contentStyle = {
    // background: "rgba(255,255,255,0",
    background: "rgba(255,255,255,0.7",
    width: "40%",
    border: "none"
};

class SijainenNakyma extends Component {
    render() {
        return (
            <div>
                <div className="logo">
                    <a href='/'>
                        <img src={Substidudes2}/></a>
                </div>
                

                <div style={styles}>

                    {/* <Sivupalkki /> */}

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

                </div>
                <Kartta/>

            </div>
        );
    }
}
// Autentikointiin liittyvää
const condition = authUser => !!authUser;
// Autentikointiin liittyvää
export default withAuthorization(condition)(SijainenNakyma);
// export default SijainenNakyma;
