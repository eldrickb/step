import manageContent from "../utils/manageContent.js"
import Api from "../utils/api.js"


const api = new Api();

class PanelPage {

    constructor() {
        document.getElementById("panel__load-comments").addEventListener(
            "click",

            this.loadComments()
        )

        const {
            clearContent: clearComments,
            appendContent: appendComments,
            setContent: setComments,
        } = manageContent("panel__comments");
        
    }

    loadComments() {
        api.getJson("/comments")
            .then(console.log);
    }
}

export default PanelPage