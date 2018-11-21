import React, { Component } from 'react';
import { haeKaikkiToimeksiannot } from '../../../../restpalvelu' ;

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
    }
}
//Datan mappaus
render() {
    var toimeksiantooliot = this.state.toimeksiantodata.map(function(toimeksiantomappi){
        return <li key={toimeksiantomappi.toimeksiantoId}>{toimeksiantomappi.oppiaine}<li>Alkaa: {toimeksiantomappi.toimeksiantoAlkuPvm} Loppuu: {toimeksiantomappi.toimeksiantoLoppuPvm}</li>
        {toimeksiantomappi.koulu &&
                 <li>Koulu:{toimeksiantomappi.koulu.kouluNimi} Osoite: {toimeksiantomappi.koulu.kouluOsoite} Yhteyshenkilö:{toimeksiantomappi.koulu.kouluYhteyshenkilo}</li>}</li>
       
    })
//Datan näyttö sivustolla:
    return (    
        <ul>
            {toimeksiantooliot}
        </ul>
    );
    
}
}

export default KaikkiToimeksiannot;