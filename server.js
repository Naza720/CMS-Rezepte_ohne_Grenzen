'use strict';

import express, { request, response } from 'express';
import settings from './settings.js';
import routes from './routes.js';
import files, {loadJSON} from './files.js';
import formidable from 'formidable';
import fs from 'fs';


//server anlegen
const server = express();

//root anlegen
server.use(express.static('public', {
    extensions:['html']
}));
//zuerst der static: zuerst die datei pfad suchen, wenn die Datei nich gefunden würden dann sollen die routes ausgefuhrt werden
server.use(routes);

// bekommt die Daten von index.js(bc)-> sendRequest funktion 
server.post('/uploadNewRecipe', (request, response)=>{
    //console.log('daten hochgeladen');
    const form = formidable({
        uploadDir: 'public/assets/frontend/img', //wo werde gespeichert
        keepExtensions: true, //extension bleiben gleich
        multiples:false //mehrere Datein auswahl nich möglich
    })

    //formualar auseinander, infos holen und die in felder und dateien übertragen
    //Bearbeitung von formular Daten (texte un Bild)
    form.parse(request, (err, fields, dateien) => {

        if(err)console.warn(err);
        else{
            console.log(dateien);
            //console.log(felder, dateien);
        
        const uploadedFile = dateien.bild[0]; // variable für das neu Bild
        // relative pfad schaffen
        const imagePath = `assets/frontend/img/${uploadedFile.newFilename}`;//pfad bild
        
        //Fuktion um überprufen ob fiels ein array ist oder nicht
        function getFieldValue(field) {
            if (Array.isArray(field)) {// isArray = true / false
                return field[0]; // wenn true, erste elemente zuruck
            } else {
                return field; // wenn false, Wert zurück
            }
        }
        //  Neue objekt für Rezepte
        const newRecipe = {
            name: getFieldValue(fields.name),
            zubereitungszeit: getFieldValue(fields.time),
            land: getFieldValue(fields.country),
            schwierigkeit: getFieldValue(fields.schwierigkeit),
            zutaten: fields.ingredient[0].split(',').map(ingredient => ingredient.trim()), //split: trenn die kette mit , trim: Leerzeichen entfernt.
            Zubereitung: fields.Zubereitung[0].split(',').map(step => step.trim()), 
            attribute: fields.attribute,
            beschreibung: getFieldValue(fields.beschreibung),
            bild: imagePath,
            tipp: getFieldValue(fields.tipp)
        };
            console.log(newRecipe);
            settings.data.push(newRecipe); // daten in array spechern
             
            // array/ object in Json Speichern
            fs.writeFile(settings.pfadRecipes, JSON.stringify(settings.data, null, 2), (err) => { //null standar konver // 2 = menschenlesbare JSON (Anzahl Leerzeichen steuer)
                if (err) {
                    console.warn(err);
                }else{
                    response.send('Rezept erfolgreich hochgeladen und gespeichert')
                }
            });
        }
    })
})

const init = () => {
    //benutzt loadJson von files.js und übergibt den pfad von der Datei (durch settings)
    // then = resolve / catch = reject
    loadJSON(settings.pfadRecipes).then(
        data => settings.data = data // Array in setting übertragen
        
    ).then(
        () => server.listen(
            settings.port, 
            err => console.log(err || 'Server läuft')
        ) // server starten
    )
    .catch(
        console.warn
    )
    
}

init();