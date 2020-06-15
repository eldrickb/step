import { manageContent } from '../utils/manageContent.js';
import { api } from '../utils/api.js';

import { generateComments } from '../components/comment.js';
import { generateUser } from '../components/user.js';

class PanelPage {
    constructor() {
        // add eventListeners
        document
            .getElementById('tool__load-comments')
            .addEventListener('click', () => this.loadComments());

        document
            .getElementById('panel__load-all-comments')
            .addEventListener('click', () => this.loadComments());

        document
            .querySelector('#panel form')
            .addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleForm(e);
            });

        // create contentManager
        this.commentContent = manageContent('panel__comments');
        this.userContent = manageContent('panel__user');

        this.user = '';

        // load initial data
        this.loadComments(3);
        this.loadUser();
    }

    loadComments(limit = -1) {
        api.getJson(`/comments?limit=${limit}`).then((json) => {
            this.commentContent.set(generateComments(json));
        });
    }

    loadUser() {
        api.getJson('/user').then((json) => {
            this.user = json;
            this.userContent.set(generateUser(json));
        });
    }

    // handling events

    // handle comment form to attach username to body
    handleForm() {
        if (!this.user || !this.user.isLoggedIn) {
            alert('Log in before you submit a comment!');
            return;
        }

        const form = event.target;

        const requestBody = {
            author: this.user.email,
            content: form.querySelector('[name=content]').value,
        };

        api.postJson(
            `/comments?author=${requestBody.author}&content=${requestBody.content}`
        ).then(() => this.loadComments());
    }
}

export { PanelPage };
