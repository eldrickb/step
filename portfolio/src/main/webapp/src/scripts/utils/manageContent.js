const manageContent = (id) => {
    const elem = document.getElementById(id);
    const clearContent = () => {
        elem.innerHTML = null;
    };

    const appendContent = (content) => {
        if (typeof content === "string")
            content = document.createTextNode(content);

        elem.appendChild(content);
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

export default manageContent;
