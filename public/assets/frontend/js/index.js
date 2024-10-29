'use strict';

import settings from "./settings.js";
import render from "./render.js";
import dom from "./dom.js";
import ajax from "./ajax.js";
// KONSTANTEN / VARIABLEN


// FUNKTIONEN


const init = () => {
    dom.mapping();
    dom.appendEventListeners();
    render.header();
    //übergibt Ajax den pfad für die Daten , dann render.content aufrufen
    ajax.loadJSON(settings.urlData).then(
        data => settings.data = data
    ).then(
        render.content
    ).catch(
        console.warn()
    )
}
    

// INIT
init();