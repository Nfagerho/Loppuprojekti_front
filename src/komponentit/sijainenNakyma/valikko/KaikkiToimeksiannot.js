import React, { Component } from 'react';
import { haeKaikkiToimeksiannot } from '../../../restpalvelu' ;
import { withAuthorization } from '../../firebase/Session';

//Täällä näytetään kaikki mahdolliset toimeksiannot. Koodiin ei ole vielä lisätty ominaisuutta, joka blokkaisi ne toimeksiannot, jotka
//on jo kytketty johonkin sijaiseen
class KaikkiToimeksiannot extends Component {

constructor(props) {
    super(props);
    this.state = {toimeksiantodata: []};
}
componentDidMount () {
    this.haekaikki();
}
haekaikki() {
    haeKaikkiToimeksiannot(this.kaikkihaettu);
}
kaikkihaettu = (haettudata, virhe) => {
    if(virhe) {
        alert("virhe");
    } else {
        this.setState({toimeksiantodata: haettudata});
        // console.log(this.state.toimeksiantodata);
    }
};

handlaavaraus = (e) => {
    this.props.varaus(e.target.value);
    //this.props.history.push('/sijaisenomientietojenmuokkaus/'+ e.target.value);
  
    };
//Datan mappaus
render() {
    
    var optiot = {day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit'};
    var toimeksiantooliot = this.state.toimeksiantodata.map((toimeksiantomappi) =>{
        var aikamuutos = new Date(toimeksiantomappi.toimeksiantoAlkuaika);
        var aikamuutos1 = new Date(toimeksiantomappi.toimeksiantoLoppuaika);
        if (toimeksiantomappi.sijainen === null) {
        return <li key={toimeksiantomappi.toimeksiantoId}>{toimeksiantomappi.oppiaine}<li>Alkaa: {aikamuutos.toLocaleTimeString("fi", optiot)} Loppuu: {aikamuutos1.toLocaleTimeString("fi", optiot)}</li>
        {toimeksiantomappi.koulu &&
                 <li>Koulu:{toimeksiantomappi.koulu.kouluNimi} Osoite: {toimeksiantomappi.koulu.kouluOsoite} Yhteyshenkilö:{toimeksiantomappi.koulu.kouluYhteyshenkilo}</li>}
                 <button type="button" value={toimeksiantomappi.toimeksiantoId} onClick={this.handlaavaraus}>Varaa</button></li>
                 
                }
       
    })
//Datan näyttö sivustolla:
    return (    
        <ul>
            {toimeksiantooliot}
        </ul>
    );
    
}
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(KaikkiToimeksiannot);