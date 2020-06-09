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


// general utils

const getServerContent = (url) => {
    return fetch(url)
        .then((res) => res.json())
        .catch(console.err)
}

const contentManagementClosure = (id) => {

    // is a function until i learn how to await window.onLoad
    const getElem = () => document.getElementById(id)
    
    const clearContent = () => {
        getElem().innerHTML = null
    }

    const appendContent = content => {

        if(typeof content === "string")
            content = document.createTextNode(content)

        getElem().appendChild(content)
    }

    const setContent = content => {
        clearContent()
        appendContent(content)
    }

    return {
        clearContent,
        appendContent,
        setContent
    }
}

// direct functions

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

    // query string
    const fetchQuery = () => {
        let queryString = "?"

        // query count
        const queryCountElem = document.getElementById("query-count");
        const queryCountValue = queryCountElem.options[queryCountElem.selectedIndex].value;

        queryString+=`query-count=${queryCountValue}`

        return getServerContent(`/comments${queryString}`)
    }

    fetchQuery()
        .then(parseComments)
        .then(addToDom)
} 

const deleteAllComments = () => {
    fetch("/comment/delete-all", {
        method: "POST"
    })
        .then(() => {
            clearServerContent()
            appendServerContent(document.createTextNode("No comments to display."))   
        })
}


// content utils

const addToDom = (text) => {
    clearServerContent()
    appendServerContent(text)
}

const {
    clearContent: clearServerContent, 
    appendContent: appendServerContent,
    setContent: setServerContent
} = contentManagementClosure("server-content")


// user auth utils

const {
    clearContent: clearUserContent, 
    appendContent: appendUserContent, 
    setContent: setUserContent
} = contentManagementClosure("user-content")

const setLoggedInContent = (email) => {
    setUserContent(`Yes, you're ${email}`)
} 


// user authentication

let loginUrl, logoutUrl

const getUser = () => {

    getServerContent("/user")
        .then(data => {
            console.log(data)

            // if logout url exists, user is logged in
            if (data.logoutUrl !== undefined) {
                setLoggedInContent(data.email);
                logoutUrl = data.logoutUrl
            }
            // else if login url exists, user is not logged in
            else if (data.loginUrl !== undefined) {
                loginUrl = data.loginUrl
                setUserContent("no, log in -->")
            // uh oh
            } else {
                console.err(data)
            }

        })
}

const userLogin = () => location.href = loginUrl
const userLogout = () => location.href = logoutUrl