import fs from 'fs';

const archivo = './db/data.json'

const guardar = (data)=>{
    
    fs.writeFileSync(archivo,JSON.stringify(data))
}

const leer = ()=>{
    if(!fs.existsSync(archivo)){
        return null
    }else{
        const info = fs.readFileSync(archivo,{encoding:"utf-8"});
        return JSON.parse(info);
    }
}

export {guardar,leer}