import React from "react";
import Popup from 'reactjs-popup';
import KaikkiToimeksiannot from "./sijainen/KaikkiToimeksiannot";
import SijaisenToimeksiannot from "./sijainen/SijaisenToimeksiannot";
import SijaisenTiedot from "./sijainen/SijaisenTiedot";

// Tämä valikko tulee näkyviin, kun hampurilaista klikataan.
export default ({ close }) => (
  <div className="menu">
    <ul>
      {/* <li onClick={close}>Omat sijaisuudet</li>
      <li onClick={close}>Näytä kaikki vapaat sijaisuudet</li>
      <li onClick={close}>Omat tiedot</li> */}
    
    {/* Näissä alla olevissa linkeissä valikon sulkeminen (onClick={close}) ei toimi*/}
        <Popup trigger={<li onClick={close}>Omat sijaisuudet</li>} modal closeOnDocumentClick>
            <span> Omat sijaisuudet: </span>
            {/* Tähän täytyy laittaa ehtolause (jos lista tyhjä, mitä näytetään) */}
            <SijaisenToimeksiannot/>
        </Popup>

        <Popup trigger={<li onClick={close}>Näytä kaikki vapaat sijaisuudet</li>} modal closeOnDocumentClick>
            <span> Kaikki vapaat sijaisuudet: </span>
            {/* Tähän täytyy laittaa ehtolause (jos lista tyhjä, mitä näytetään) */}
            <KaikkiToimeksiannot/>
        </Popup>

        <Popup trigger={<li onClick={close}>Omat tiedot</li>} modal closeOnDocumentClick>
            <span> Tähän sijaisen omat tiedot. </span>
            <SijaisenTiedot/>
        </Popup>
    </ul>
  </div>
);