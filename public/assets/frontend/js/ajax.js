'use strict';

const ajax = {
    loadJSON(url){ 
        return fetch(url).then(
            res => res.json()
            
        )
    }
}

export default ajax;
