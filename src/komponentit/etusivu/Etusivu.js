import React, { Component } from 'react';
import Kartta from './kartta/Kartta';
import './sivupalkki/sivupalkki.css';
import Popup from 'reactjs-popup';
import BurgerIkoni from './sivupalkki/BurgerIkoni';
import Valikko from './sivupalkki/Valikko';
import Substidudes2 from './substidudes2.png'

// Valikkoon liittyviä tyylityksiä
const styles = {
  fontFamily: "sans-serif",
  textAlign: "center",
  marginTop: "40px"
};

// Valikkoon liittyviä tyylityksiä
const contentStyle = {
  background: "rgba(255,255,255,0",
  width: "50%",
  border: "none"
};

class Etusivu extends Component {
  render() {
    return (
      <div>
        <div style={styles}>
            <img src={Substidudes2}/>
          {/* <Sivupalkki /> */}

        <Popup 
          modal
          overlayStyle={{ background: "rgba(255,255,255,0.8"}}
          contentStyle={contentStyle}
          closeOnDocumentClick={false}
          trigger={open => <BurgerIkoni open={open} />} 
        >
          {close => <Valikko close={close} />}
        </Popup>

        </div>
        <Kartta />
    
      </div>
    );
  }
}

export default Etusivu;
