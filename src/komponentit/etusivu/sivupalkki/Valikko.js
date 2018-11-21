import React from "react";
import Popup from 'reactjs-popup';

// Tämä valikko tulee näkyviin, kun hampurilaista klikataan.
export default ({ close }) => (
  <div className="menu">
    <ul>
      {/* <li onClick={close}>Omat sijaisuudet</li>
      <li onClick={close}>Näytä kaikki vapaat sijaisuudet</li>
      <li onClick={close}>Omat tiedot</li> */}
    
    {/* Näissä alla olevissa linkeissä valikon sulkeminen (onClick={close}) ei toimi*/}
        <Popup trigger={<li onClick={close}>Omat sijaisuudet</li>} modal closeOnDocumentClick>
            <span> Tähän lista omista sijaisuuksista. </span>
        </Popup>

        <Popup trigger={<li onClick={close}>Näytä kaikki vapaat sijaisuudet</li>} modal closeOnDocumentClick>
            <span> Tähän kaikki vapaat sijaisuudet. </span>
        </Popup>

        <Popup trigger={<li onClick={close}>Omat tiedot</li>} modal closeOnDocumentClick>
            <span> Tähän sijaisen omat tiedot. </span>
        </Popup>
    </ul>
  </div>
);