'use strict';

// KONSTANTEN / VARIABLEN
const elements = {};

// FUNKTIONEN
const domMapping = () => {
    elements.myForm = document.querySelector('#recipeForm');
}


const sendRequest = evt =>{
    evt.preventDefault();

    fetch('/uploadNewRecipe', { 
        method: 'post', 
        body: new FormData(elements.myForm) 
    }).then(
        result => result.text()
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
