// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

const getServerContent = (url) => {
    return fetch(url)
        .then((res) => res.json())
        .catch(console.err)
}

const addCommentsToDom = () => {

    // create DOM node for an individual comment
    const newCommentElement = (author, content) => {
        const wrapper = document.createElement("div")
        wrapper.classList.add("comment")

        const authorNode = document.createElement("h6")
        authorNode.appendChild(document.createTextNode(author))

        const contentNode = document.createElement("p")
        contentNode.appendChild(document.createTextNode(content))

        wrapper.appendChild(authorNode)
        wrapper.appendChild(contentNode)

        return wrapper
    }

    // create DOM nodes for each comment
    const parseComments = (json) => {

        let wrapper = document.createElement("div");
    
        json.forEach(comment => {
            wrapper.appendChild(newCommentElement(comment.author, comment.content))
        })

        return wrapper;
    }

    getServerContent("/comments")
        .then(parseComments)
        .then(addToDom)
} 

const addToDom = (text) => {
    document.getElementById("server-content").appendChild(text)
}