class Api {

    constructor() {
        this.apiUrl =  "http://localhost:8080" 
    }

    getJson(address) {
        return fetch(this.makeUrl(address))
            .then((res) => res.json())
            .catch(console.err);
    }

    postJson(address, options = {}) {
        options.method = "POST"
        return fetch(this.makeUrl(address), options)
            .then((res) => res.json())
            .catch(console.err)
    }

    makeUrl(address) {
        return `${this.apiUrl}${address}`
    }
}

export default Api;