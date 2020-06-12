const makeAuthButton = (json, isLoggedIn) => {
    const wrapper = document.createElement("a");
    wrapper.classList.add(".button");

    if (json.isLoggedIn) {
        wrapper.appendChild(document.createTextNode("Logout"));
        wrapper.setAttribute("href", json.logoutUrl);
    } else {
        wrapper.appendChild(document.createTextNode("Login"));
        wrapper.setAttribute("href", json.loginUrl);
    }

    return wrapper;
};

const generateUser = (json) => {
    let wrapper = document.createElement("div");
    wrapper.classList.add("user");

    if (json.isLoggedIn) {
        const welcome = document.createElement("span");
        welcome.appendChild(document.createTextNode(`Hello, ${json.email}!`));

        wrapper.appendChild(welcome);
    }

    wrapper.appendChild(makeAuthButton(json));

    return wrapper;
};

export { generateUser };
