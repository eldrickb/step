const apiUrl = '';

class Api {
    constructor() {}

    getJson(address) {
        return fetch(this.makeUrl(address))
            .then((res) => res.json())
            .catch(console.err);
    }

    postJson(address, options = {}) {
        options.method = 'POST';
        return fetch(this.makeUrl(address), options)
            .then((res) => res.json())
            .catch(console.err);
    }

    makeUrl(address) {
        return `${apiUrl}${address}`;
    }
}

const apiSingleton = new Api();

export { apiSingleton as api };
