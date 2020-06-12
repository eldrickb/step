import "../styles/index.scss";

import { HomePage } from "./pages/home.js";
import { PanelPage } from "./pages/panel.js";

if (document.querySelector("body").id === "panel-page") {
    new PanelPage();
} else  {
    new HomePage();
}