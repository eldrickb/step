
const makeComment = (json) => {
    const wrapper = document.createElement('div');
    wrapper.classList.add('comment');

    const authorNode = document.createElement('span');
    authorNode.appendChild(document.createTextNode(json.author));

    const contentNode = document.createElement('div');
    contentNode.classList.add("comment__content");

    const contentTextNode = document.createElement('p');
    contentTextNode.appendChild(document.createTextNode(json.content));

    contentNode.appendChild(contentTextNode);

    if (json.img !== undefined && json.img.length > 0) {
        const imgWrapper = document.createElement('a')
        imgWrapper.href = json.img;
        imgWrapper.setAttribute("target", "_blank");
        imgWrapper.setAttribute("rel", "noreferrer noopener");

        const imgNode = document.createElement('img')
        imgNode.src = json.img;
        
        imgWrapper.appendChild(imgNode)
        contentNode.appendChild(imgWrapper);
    }

    wrapper.appendChild(authorNode);
    wrapper.appendChild(contentNode);

    return wrapper;
};

const generateComments = (json) => {
    const wrapper = document.createElement('div');
    wrapper.classList.add('comments');

    json.forEach((comment) => {
        wrapper.appendChild(makeComment(comment));
    });

    return wrapper;
};

export { makeComment, generateComments };
