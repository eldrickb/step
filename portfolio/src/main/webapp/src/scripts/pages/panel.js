export default class PanelPage {

    constructor() {

        
        // Private utility methods
        const getServerContent = (url) => {
            return fetch(url)
                .then((res) => res.json())
                .catch(console.err);
        };

    }

    loadComments() {

        getServerContent()

    }
}