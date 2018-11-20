const url = '/api/toimeksianto';

export function haeKaikkiToimeksiannot(callback) {
    fetch(url, {accept: 'application/json'})
        .then(function(response) {
            response.json().then(function(json) {
                if (response.status >= 400)
                    callback(null, response.status);
                else
                    callback(json);
            });
        });
}