// KESKEN !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

import { haeSijaisenTiedot } from '../../restpalvelu';

export function sisaankirjaantuneenId() {
    haeSijaisenTiedot(this.kaikkihaettu);

    console.log("Sisäänkirjautuneen id -funktio", haeSijaisenTiedot());
};

var kaikkihaettu = (haettudata, virhe) => {
    if(virhe) {
        alert("virhe");
    } else {
        console.log(haettudata);
    }
}

// export default sisaankirjaantuneenId();

// import React, { Component } from 'react';
// import { haeSijaisenTiedot } from '../../restpalvelu';
// import {withAuthorization, AuthUserContext} from '../firebase/Session';


// class SisaankirjautunutId extends Component {

//     constructor(props) {
//         super(props);
//         this.state = {sijaisentiedotdata: []};
//     }
//     componentDidMount () {
//         this.haekaikki();
//     }

//     haekaikki() {
//         haeSijaisenTiedot(this.kaikkihaettu);
//     }
//     kaikkihaettu = (haettudata, virhe) => {
//         if(virhe) {
//             alert("virhe");
//         } else {
//             this.setState({sijaisentiedotdata: haettudata});
//             console.log(this.state.sijaisentiedotdata[0]);
//             console.log(this.props.firebase.naytaEmail());
//         }
//     }


//     render() {
        

//         return (
//             <div>
//                 Testi
//             </div>
//         );
//     }
// }

// // Autentikointiin liittyvää
// const condition = authUser => !!authUser;
// // Autentikointiin liittyvää
// export default withAuthorization(condition)(SisaankirjautunutId);
// // export default SijainenNakyma;