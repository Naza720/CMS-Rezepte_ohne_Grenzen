'use strict';

import fs from 'fs';
const files = {
    loadJSON(pfad){ // methode um die daten zu laden, parsen und zurück geben
        return new Promise((resolve,rejects) => { //resolve (wenn die Daten geladen sind)
            fs.readFile( // Datei lessen 
                pfad,
                (err, content) =>{
                    if(err) rejects(err); // wenn ein Fehler ist, reject aufrufen und errror übergeben
                    else{ // kein Fehler, dann in content die geladen Daten
                        content = content.toString(); // von Hex zu string konvertieren
                        content = JSON.parse(content); // von Json-String zu array convertieren
                        resolve(content);
                    }
                }
            )
        })
    }
}

export default files; 
export let loadJSON = files.loadJSON;