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
const url1 = '/api/koulu';

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
const palveluurl = '/api/toimeksianto/';
export function lahetaToimeksianto(lomake) {
    return fetch(palveluurl, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(lomake)
    })
}