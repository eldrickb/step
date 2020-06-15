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

        this.handleFileButtons();

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

        // scroll to bottom
        const container = document.getElementById("comments-wrapper")
        container.scrollTop = container.scrollHeight;

        // change language of button to indicate all are loaded
        if (limit === -1) {
            document.getElementById("panel__load-all-comments").innerHTML = "Reload Comments"
        }
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

        // attach file, if there is one
        const file = document.getElementById('form__real-file-button').files[0];
        const hasFile = file !== undefined;

        const requestParams = `?author=${this.user.email}&content=${form.querySelector('[name=content]').value}&hasImage=${hasFile}`;

        if (hasFile) {
            api.getJson('/file').then((json) => {
                const formData = new FormData();
                formData.append('image', file);

                // cloudshell hotfix to avoid making request to wrong localhost
                // TODO: make this unnecessary
                const url = json.uploadUrl.replace( /^[a-zA-Z]{3,5}\:\/{2}[a-zA-Z0-9_.:-]+\//, '')

                api.postJson(url + requestParams, { body: formData })
                    .then(this.loadComments())
                    .catch(console.err);
            });
        } else {
            api.postJson('/comments' + requestParams)
                .then(() => this.loadComments())
                .catch(console.err);
        }
    }

    handleFileButtons() {
        const fakeFileButton = document.getElementById(
            'form__fake-file-button'
        );
        const realFileButton = document.getElementById(
            'form__real-file-button'
        );
        const fileText = document.querySelector('#file-buttons span');

        // imitate real file button onclick
        fakeFileButton.addEventListener('click', (e) => {
            realFileButton.click();
        });

        // update file name text
        realFileButton.addEventListener('change', function () {
            if (realFileButton.value) {
                let filename = realFileButton.value.match(
                    /[\/\\]([\w\d\s\.\-\(\)]+)$/
                )[1];

                if (filename.length > 23) {
                    filename = filename.substr(0, 20) + '...';
                }

                fileText.innerHTML = filename;
                fileText.classList.add('hasContent');
            } else {
                fileText.innerHTML = null;
            }
        });
    }
}

export { PanelPage };
