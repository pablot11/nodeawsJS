import fs from 'node:fs/promises';
import { dirname, join } from 'node:path';
import {createServer} from 'node:http';
const PUERTO = 3000;
const rutaIndex = join('public');
const PRODUCTOS = join('json');
/* const gestionarRecursos = (req,res)=>{
    const ruta = path.join(rutaIndex,req.url);
    fs.readFile(ruta, (err,data)=>{
        if(err){
            console.log(err);
            res.statusCode= 500;
            res.end('Recurso no encontrado');
        }else{
            res.statusCode = 200;
            res.end(data)
        }
    })
    
} */
/* const gestionarIndex = (res)=>{
    const ruta = path.join(rutaIndex,'index.html');
    fs.readFile(ruta,'utf-8', (err,data)=>{
        if(err){
            console.log(err);
            res.statusCode= 500;
            res.end('Error');
        }else{
            res.statusCode = 200;
            res.end(data)
        }
    })
} */
async function fetchData() {
   
}
fetchData();
const gestionarIndex = async (res)=>{
    const ruta = join(rutaIndex,'index.html');
    let data;
    try{
        data = await fs.readFile(ruta)
    }catch(err){
        throw err;
    }
    res.end(data);
    return
} 


const gestionarRecursos = async (req,res)=>{
         const ruta = join(rutaIndex,req.url);
        let data;
        try{
            data = await fs.readFile(ruta);
            res.end(data);
        }catch(err){
            throw err
        }
   
}
const gestionarProductos = async ()=>{
     try {
        const ruta = join(PRODUCTOS, 'productos.json');
        const response = await fetch(ruta);
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error('Error al recuperar datos:', error);
    }
}



const miServidor =  createServer ((req,res)=>{
    if(req.method === 'GET'){
        if(req.url === '/' || req.url === '/index.html'){
            gestionarIndex(res);
        }else if(req.url === '/productos'){
             gestionarProductos();
        }
        else{
            gestionarRecursos();
        }
    }else{
        res.statusCode= 404;
        res.end("No se encuntra el recurso");
    }
})


miServidor.listen(PUERTO);
