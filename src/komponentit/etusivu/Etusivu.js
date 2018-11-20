import React, { Component } from 'react';
import Sivupalkki from './sivupalkki/Sivupalkki';
import Kartta from './kartta/Kartta';
import './sivupalkki/sivupalkki.css';


class Etusivu extends Component {
  render() {
    return (
      <div id="App">
        <Sivupalkki pageWrapId={"page-wrap"} outerContainerId={"App"} />
        <div id="page-wrap">
        <Kartta />
        </div>
    
      </div>
    );
  }
}

export default Etusivu;
