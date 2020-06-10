import manageContent from "../utils/manageContent.js"
import Api from "../utils/api.js"

import {generateComments} from "../components/comment.js"

const api = new Api();

class PanelPage {

    constructor() {

        // add eventListeners
        document.getElementById("tool__load-comments").addEventListener(
            "click",
            () => this.loadComments(2)
        )

        document.getElementById("panel__load-all-comments").addEventListener(
            "click",
            () => this.loadComments()
        )

        // create contentManager
        this.content = manageContent("panel__comments");

        // load initial data
        this.loadComments()
    }

    loadComments(limit = -1) {

        // this.content.set(generateComments(
        //     [{"author":"sdfsd","content":"dsfsdfdf","id":5629499534213120},
        //     {"author":"frank","content":"im in da ocean","id":5629499534213120},
        //     {"author":"zzz","content":"im sleepin cuh","id":5629499534213120}
        //     ]

        // ))

        api.getJson(`/comments?limit=${limit}`)
            .then(json => {
                this.content.set(generateComments(json));
            });
    }
}

export default PanelPage