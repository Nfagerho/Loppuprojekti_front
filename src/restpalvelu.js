//Kaikkien toimeksiantojen fetchaus databasesta

const url = '/api/toimeksianto';

export function haeKaikkiToimeksiannot(callback) {
    fetch(url, {accept: 'application/json'})
        .then(function (response) {
            response.json().then(function (json) {
                if (response.status >= 400)
                    callback(null, response.status);
                else
                    callback(json);
            });
        });
}

//Kaikkien koulujen tietojen fetchaus databasesta
const url1 = '/api/koulu/';

export function haeKoulunTiedot(callback) {
    fetch(url1, {accept: 'application/json'})
        .then(function (response) {
            response.json().then(function (json) {
                if (response.status >= 400)
                    callback(null, response.status);
                else
                    callback(json);
            });
        });
}

//Kaikkien sijaisten tietojen fetchaus databasesta
const url2 = '/api/sijainen';

export function haeSijaisenTiedot(callback) {
    fetch(url2, {accept: 'application/json'})
        .then(function (response) {
            response.json().then(function (json) {
                if (response.status >= 400)
                    callback(null, response.status);
                else
                    callback(json);
            });
        });
}

//Lisätään uusi toimeksianto POST:illa databaseen
const palveluurl = '/api/toimeksianto/';

export function lahetaToimeksianto(lomake) {
    return fetch(palveluurl, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(lomake)
    })
}
//Poistetaan yksittäinen toimeksianto
const deleteurl = '/api/toimeksianto/';

export function poistaToimeksianto(id) {
    return fetch(deleteurl + id, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'}
    })
        .then(res => res.text())
        
}
//Muokataan yksittäistä toimeksiantoa databasessa
const muokkausurl = '/api/toimeksianto/';

export function muokkaaToimeksianto(id, lomake) {
    return fetch(muokkausurl + id, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(lomake)
    })

}
//Haetaan yksittäinen toimeksianto databasesta
const yksittainenURL = '/api/toimeksianto/';

export function haeYksittainenToimeksianto(callback, id) {
    fetch(yksittainenURL + id, {accept: 'application/json'})
        .then(function (response) {
            response.json().then(function (json) {
                if (response.status >= 400)
                    callback(null, response.status);
                else
                    callback(json);
            });
        });
}

//Haetaan yksittäinen sijainen databasesta
const yksittainensijainenURL = '/api/sijainen/';

export function haeYksittainenSijainen(callback, id) {
    fetch(yksittainensijainenURL + id, {accept: 'application/json'})
        .then(function (response) {
            response.json().then(function (json) {
                if (response.status >= 400)
                    callback(null, response.status);
                else
                    callback(json);
            });
        });
}
//Muokataan yksittäisen sijaisen tietoja databasessa
const sijaisenmuokkausurl = '/api/sijainen/';

export function muokkaaSijaista(id, lomake) {
    return fetch(sijaisenmuokkausurl + id, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(lomake)
    })

}

//Haetaan yksittäinen koulu databasesta
const yksittainenkoulunURL = '/api/koulu/';

export function haeYksittainenKoulu(callback, id) {
    fetch(yksittainenkoulunURL + id, {accept: 'application/json'})
        .then(function (response) {
            response.json().then(function (json) {
                if (response.status >= 400)
                    callback(null, response.status);
                else
                    callback(json);
            });
        });
}

//Muokataan yksittäisen koulun tietoja databasessa
const koulunmuokkausurl = '/api/koulu/';

export function muokkaaKoulua(id, lomake) {
    return fetch(koulunmuokkausurl + id, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(lomake)
    })

}