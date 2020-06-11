import manageContent from "../utils/manageContent.js";
import Api from "../utils/api.js";

import { generateComments } from "../components/comment.js";
import generateUser from "../components/user.js";

const api = new Api();

class PanelPage {
    constructor() {
        // add eventListeners
        document
            .getElementById("tool__load-comments")
            .addEventListener("click", () => this.loadComments());

        document
            .getElementById("panel__load-all-comments")
            .addEventListener("click", () => this.loadComments());

        document
            .querySelector("#panel form")
            .addEventListener("submit", (e) => {
                e.preventDefault();
                this.handleForm(e);
            });

        // create contentManager
        this.commentContent = manageContent("panel__comments");
        this.userContent = manageContent("panel__user");

        // load initial data
        this.loadComments(3);
        this.loadUser();
    }

    loadComments(limit = -1) {
        // this.commentContent.set(generateComments(
        // [{"author":"undefined","content":"SHE WORKS!!!!","id":4644337115725824},{"author":"frank ocean","content":"im not dropping till 2040","id":4785074604081152},{"author":"yee","content":"yee yee yee","id":5066549580791808},{"author":"sdfsd","content":"dsfsdfdf","id":5629499534213120},{"author":"zxjckjzxkjczklxc","content":"comment 45","id":6192449487634432},{"author":"undefined","content":"WHEN WILL THIS WORK??\u003e??","id":6473924464345088}]
        // ))

        api.getJson(`/comments?limit=${limit}`).then((json) => {
            this.commentContent.set(generateComments(json));
        });
    }

    loadUser() {
        // this.userContent.set(
        //     generateUser(
        //         {"loginUrl":"/_ah/login?continue\u003d%2F","isLoggedIn": false}
        //     )
        // )
        api.getJson("/user").then((json) => {
            this.user = json;
            this.userContent.set(generateUser(json));
        });
    }

    // handling events

    // handle comment form to attach username to body
    handleForm() {
        if (this.user == undefined || !this.user.isLoggedIn) {
            alert("Log in before you submit a comment!");
            return;
        }

        const form = event.target;

        const requestBody = {
            author: this.user.email,
            content: form.querySelector("[name=content]").value,
        };

        api.postJson(
            `/comments?author=${requestBody.author}&content=${requestBody.content}`
        ).then(() => this.loadComments());
    }
}

export default PanelPage;
