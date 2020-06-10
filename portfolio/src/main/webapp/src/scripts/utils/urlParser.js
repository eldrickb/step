
class UrlParser {
    constructor () {

        this.path = window.location.pathname()
        this.root = path.split("/")[0]
    }

    match(target) {
        return this.root === target
    }
}

export default UrlParser