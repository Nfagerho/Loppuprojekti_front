import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Etusivu from './komponentit/etusivu/Etusivu';
import LoginSivu from './komponentit/login/LoginSivu';
import { Switch, Route } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import SijainenLogin from './komponentit/login/sijainen/SijainenLogin';
import KouluLogin from './komponentit/login/koulu/KouluLogin';
import Rekisterointi from './komponentit/login/rekisterointi/Rekisterointi';
import KaikkiToimeksiannot from './komponentit/etusivu/sivupalkki/sijainen/KaikkiToimeksiannot';
import KoulunTiedot from './komponentit/etusivu/sivupalkki/koulu/KoulunTiedot';
import SijaisenTiedot from './komponentit/etusivu/sivupalkki/sijainen/SijaisenTiedot';
import KoulunToimeksiannot from './komponentit/etusivu/sivupalkki/koulu/KoulunToimeksiannot';
import SijaisenToimeksiannot from './komponentit/etusivu/sivupalkki/sijainen/SijaisenToimeksiannot';
import SivuaEiLoytynyt from './komponentit/SivuaEiLoytynyt';
import Lomake from "./komponentit/etusivu/sivupalkki/koulu/Lomake";
import MuokkaaToimeksianto from "./komponentit/etusivu/sivupalkki/koulu/MuokkaaToimeksianto";



ReactDOM.render((
    <BrowserRouter>
        <Switch>
            <Route exact path='/' component={LoginSivu}></Route>
            <Route exact path='/etusivu' component={Etusivu}></Route>
            <Route exact path='/sijainenlogin' component={SijainenLogin}></Route>
            <Route exact path='/koululogin' component={KouluLogin}></Route>
            <Route exact path='/rekisterointi' component={Rekisterointi}></Route>
            {/* Allaolevat routtaukset on tehty, jotta Nooa voi koklailla datan hakemista databasesta: */}
            <Route exact path='/toimeksiannot' component={KaikkiToimeksiannot}></Route>
            <Route exact path='/kouluntiedot' component={KoulunTiedot}></Route>
            <Route exact path='/sijaisentiedot' component={SijaisenTiedot}></Route>
            <Route exact path='/koulunomattoimeksiannot' component={KoulunToimeksiannot}></Route>
            <Route exact path='/sijaisenomattoimeksiannot' component={SijaisenToimeksiannot}></Route>
            <Route exact path='/lomake' component={Lomake}></Route>
            <Route exact path='/muokkaatoimeksianto' component={MuokkaaToimeksianto}></Route>
            <Route component={SivuaEiLoytynyt} />
        </Switch>
    </BrowserRouter>
), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA

