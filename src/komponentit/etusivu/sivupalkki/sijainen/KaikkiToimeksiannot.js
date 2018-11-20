import React, { Component } from 'react';
import { haeKaikkiToimeksiannot } from '../../../../restpalvelu' ;


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
        console.log(this.state.toimeksiantodata);
    }
}

render() {
   
   console.log(this.state.toimeksiantodata)
    var toimeksiantooliot = this.state.toimeksiantodata.map(function(toimeksiantomappi){
        return <li key={toimeksiantomappi.toimeksiantoId}>{toimeksiantomappi.oppiaine}<li>Alkaa: {toimeksiantomappi.toimeksiantoAlkuPvm} Loppuu: {toimeksiantomappi.toimeksiantoLoppuPvm}</li>
        {toimeksiantomappi.koulu &&
                 <li>Koulu:{toimeksiantomappi.koulu.kouluNimi} Osoite: {toimeksiantomappi.koulu.kouluOsoite} Yhteyshenkilö:{toimeksiantomappi.koulu.kouluYhteyshenkilo}</li>}</li>
       
    })

    return (    
        <ul>
            {toimeksiantooliot}
        </ul>
    );
    
}
}

export default KaikkiToimeksiannot;