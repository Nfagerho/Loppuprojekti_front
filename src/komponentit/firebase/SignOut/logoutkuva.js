import React from 'react';
import logoutKuva2 from '../../sijainenNakyma/logout.png';
import {withFirebase} from '../Firebase';

const Logoutkuva = ({firebase}) => (
    <a href="/"><img onClick={firebase.doSignOut} src={logoutKuva2} alt="logout-kuva" className="valikkokuva" /></a>

);

export default withFirebase(Logoutkuva);