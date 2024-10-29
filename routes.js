'use strict';
import settings from './settings.js';
import express, {request, response, Router} from 'express';
const router = express.Router(); 

router.get('/loadData', (request, response) => { 
    response.json(settings.data); 
})
export default router;
