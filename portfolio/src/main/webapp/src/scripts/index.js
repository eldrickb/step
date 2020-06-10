import '../styles/index.scss';

import HomePage from "./pages/home.js";
import PanelPage from "./pages/panel.js"
import UrlParser from "./utils/urlParser.js"



// if (urlParser.match("root"))
    // const homeScript = new HomePage();

// else if (urlParser.match(`panel`))
    const panelScript = new PanelPage();