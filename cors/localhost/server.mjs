import fs from 'node:fs/promises';
import http from 'node:http';
import path from 'node:path';
import { readFile } from 'node:fs/promises';
const PUERTO = 3000;
const rutaJson = ('nodeawsjs', 'cors', 'localhost', 'productos.json')
const miServer = http.createServer((peticion, respuesta)=>{
       if(peticion.method === 'GET'){
        respuesta.writeHead(200,{
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Method': 'POST',
            'Access-Control-Allow-Headers': 'Content-Type'


        }
            
        )
        manejoJson(respuesta);
        if(peticion.url === '/formulario'){
            respuesta.on('data',(pedacitos)=>{
                let datosCompletos = '';
                datosCompletos += pedacitos
            })
            respuesta.on('error', (error)=>{
                respuesta.statusCode = 500
                respuesta.end("hubo error")
                return
            })
            res.on('end', ()=>{
                console.log(datosCompletos)
                respuesta.statusCode = 200
                res.end("datos recibidos")
            })

        }else{
            respuesta.statusCode = 404;
            res.end("No se envio el formulario");
        }



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
