const manageContent = (id) => {
    const elem = document.getElementById(id);
    const clearContent = () => {
        elem.innerHTML = null;
    };

    const appendContent = (content) => {

        let contentNode;

        if (typeof content === "string" || typeof content === "number") {
            contentNode = document.createTextNode(content);
        } else {
            contentNode = content;
        } 

        elem.appendChild(contentNode);
    };

    const setContent = (content) => {
        clearContent();
        appendContent(content);
    };

    return {
        clear: clearContent,
        append: appendContent,
        set: setContent,
    };
};

export { manageContent };
