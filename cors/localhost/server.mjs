import fs from 'node:fs/promises';
import http from 'node:http';
import path from 'node:path';
import { readFile } from 'node:fs/promises';
const PUERTO = 3000;
const rutaJson = ('nodeawsjs', 'cors', 'localhost', 'productos.json')
const miServer = http.createServer((peticion, respuesta)=>{
       if(peticion.method === 'GET'){
        respuesta.setHeader(
            'Access-Control-Allow-Origin', '*'
        )
        manejoJson(respuesta);
       }
    
})

const manejoJson = async (respuesta)=>{

    try{
        const data = await readFile('cors/productos.json', 'utf-8')
        respuesta.end(data);
    }catch(err){
        console.log(err);
    }
}

miServer.listen(PUERTO);
