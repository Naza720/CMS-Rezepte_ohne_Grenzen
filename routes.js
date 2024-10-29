'use strict';
import settings from './settings.js';
import express, {request, response, Router} from 'express';
const router = express.Router(); // das Methode Router von express ist um routen anzulegen


router.get('/loadData', (request, response) => { //pfad für die daten settings.data
    response.json(settings.data); // data aus der Settings holen bzw das Array asu der Json datei 
    // hier wird data heraus genommen und per JSON gelifert
})

 //route angelegt
 // im server gebunden
 // das ermöglich von client mit hilfe eine AJAX Anfrage die Daten aus der JSON auslesen


export default router;