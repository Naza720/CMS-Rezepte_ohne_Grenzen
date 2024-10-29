'use strict';

import fs from 'fs';
const files = {
    loadJSON(pfad){ 
        return new Promise((resolve,rejects) => { 
            fs.readFile(  
                pfad,
                (err, content) =>{
                    if(err) rejects(err); 
                    else{ 
                        content = content.toString(); 
                        content = JSON.parse(content); 
                        resolve(content);
                    }
                }
            )
        })
    }
}

export default files; 
export let loadJSON = files.loadJSON;
