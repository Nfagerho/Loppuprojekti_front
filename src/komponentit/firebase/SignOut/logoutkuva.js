import React from 'react';
import logoutKuva from '../../sijainenNakyma/logout.png';
import {withFirebase} from '../Firebase';

const logoutkuva = ({firebase}) => (
    <img onClick={firebase.doSignOut} src={logoutKuva} alt="logout-kuva" />
    
//     <button type="button" onClick={firebase.doSignOut}>
//     Sign Out
//   </button>

);

export default withFirebase(logoutkuva);