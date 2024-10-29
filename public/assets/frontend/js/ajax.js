'use strict';

const ajax = {
    loadJSON(url){ //bekommt den pfad '/loadData' durch fecht als argument ->pfad in settings.js -urlData
        return fetch(url).then(
            res => res.json() // wenn ein ergebnis - per json umwandeln
            
        )
    }
}
//die url wir übergeben wenn die funktion loadjson aufgerufen wird -> index.js
export default ajax;
