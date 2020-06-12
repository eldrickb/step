const makeComment = (author, content) => {
    const wrapper = document.createElement("div");
    wrapper.classList.add("comment");

    const authorNode = document.createElement("span");
    authorNode.appendChild(document.createTextNode(author));

    const contentNode = document.createElement("p");
    contentNode.appendChild(document.createTextNode(content));

    wrapper.appendChild(authorNode);
    wrapper.appendChild(contentNode);

    return wrapper;
};

const generateComments = (json) => {
    const wrapper = document.createElement("div");
    wrapper.classList.add("comments");

    json.forEach((comment) => {
        wrapper.appendChild(makeComment(comment.author, comment.content));
    });

    return wrapper;
};

export { makeComment, generateComments };
