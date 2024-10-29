'use strict';

import express, { request, response } from 'express';
import settings from './settings.js';
import routes from './routes.js';
import files, {loadJSON} from './files.js';
import formidable from 'formidable';
import fs from 'fs';


const server = express();

server.use(express.static('public', {
    extensions:['html']
}));
server.use(routes);
server.post('/uploadNewRecipe', (request, response)=>{
   
    const form = formidable({
        uploadDir: 'public/assets/frontend/img',
        keepExtensions: true, 
        multiples:false 
    })
    form.parse(request, (err, fields, dateien) => {

        if(err)console.warn(err);
        else{
            console.log(dateien);
        const uploadedFile = dateien.bild[0];
       
        const imagePath = `assets/frontend/img/${uploadedFile.newFilename}`;
        function getFieldValue(field) {
            if (Array.isArray(field)) {
                return field[0]; 
            } else {
                return field; 
            }
        }
        const newRecipe = {
            name: getFieldValue(fields.name),
            zubereitungszeit: getFieldValue(fields.time),
            land: getFieldValue(fields.country),
            schwierigkeit: getFieldValue(fields.schwierigkeit),
            zutaten: fields.ingredient[0].split(',').map(ingredient => ingredient.trim()), 
            Zubereitung: fields.Zubereitung[0].split(',').map(step => step.trim()), 
            attribute: fields.attribute,
            beschreibung: getFieldValue(fields.beschreibung),
            bild: imagePath,
            tipp: getFieldValue(fields.tipp)
        };
            console.log(newRecipe);
            settings.data.push(newRecipe); 
             
            fs.writeFile(settings.pfadRecipes, JSON.stringify(settings.data, null, 2), (err) => { 
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
    loadJSON(settings.pfadRecipes).then(
        data => settings.data = data 
    ).then(
        () => server.listen(
            settings.port, 
            err => console.log(err || 'Server läuft')
        ) 
    )
    .catch(
        console.warn
    )
    
}

init();
