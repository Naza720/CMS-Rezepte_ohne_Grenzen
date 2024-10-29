'use strict';

// KONSTANTEN / VARIABLEN
const elements = {};

// FUNKTIONEN
const domMapping = () => {
    elements.myForm = document.querySelector('#recipeForm');
}


const sendRequest = evt =>{
    //neue Laden der Seite unterbinden
    evt.preventDefault();

    fetch('/uploadNewRecipe', { // an welche route wird die Anfrage gesendet
        method: 'post', //als post methode
        body: new FormData(elements.myForm) // body formdata eintragen
    }).then(
        result => result.text()// das wird an server übertragen
    ).then(
        (message => alert(message))
    ).catch(
        console.warn
    )
}

const appendEventlisteners = () => {
    elements.myForm.addEventListener('submit', sendRequest);
}

const init = () => {
    domMapping();
    appendEventlisteners();
}

// INIT
init();