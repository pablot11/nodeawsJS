import fs from 'node:fs/promises';
import { join, extname } from 'node:path';
import {createServer} from 'node:http';
import { readFile } from 'node:fs/promises';
const PUERTO = 3000;
const rutaIndex = 'public'
const PRODUCTOS = 'json';
const mimeDiccionario = {
    '.jpeg': 'image/jpeg',
    '.jpg': 'image/jpg',
    '.json': 'application/json',
    '.css': 'text/css',
    '.js': 'application/javascript'
}
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

const gestionarIndex = async (res)=>{
    const ruta = join(rutaIndex,'index.html');
    let data;
    try{
        data = await fs.readFile(ruta)
        res.setHeader('Cache-Control','max-age=3600')
        res.setHeader('Content-Type','text/html;charset=utf-8')
        res.end(data);
    }catch(err){
        res.statusCode = 500;
        res.setHeader('Content-Type','text/plain;charset=utf-8')
        res.end('Hubo un error en el servidor')
        throw err;
    }
   
    return
} 


const gestionarRecursos = async (req,res)=>{
        const ruta = join(rutaIndex,req.url);
        let data;
        try{
            data = await fs.readFile(ruta);
            const extension = extname(ruta)
            const mime = mimeDiccionario[extension]

            res.writeHead(200,{
                'Content-Type':mime,
                'Cache-Control':'max-age=3600'
            })
            res.end(data);
        }catch(err){
            res.setHeader('Content-Type','text/plain;charset=utf-8')
            res.statusCode = 404;
            res.end('recurso no encontrado')
        }
   
}
const gestionarProductos = async (res)=>{
     try {
        const ruta = join(PRODUCTOS, 'productos.json');
        const datos = await readFile(ruta, 'utf-8');
        res.setHeader('Cache-Control','max-age=3600')
        res.setHeader('Content-Type','application/json;charset=utf-8')
        res.statusCode = 200;
        res.end(datos)
    } catch (error) {
        res.setHeader('Content-Type','text/plain;charset=utf-8')
        res.statusCode = 404;
        res.end('recurso no encontrado')
        console.error('Error al recuperar datos:', error);
    }
}



const miServidor =  createServer ((req,res)=>{
    if(req.method === 'GET'){
        if(req.url === '/' || req.url === '/index.html'){
            gestionarIndex(res);
        }else if(req.url === '/productos'){
             gestionarProductos(res);
        }
        else{
            gestionarRecursos(req,res);
        }
    }else if(req.method === 'POST'){
        if(req.url=== '/procesar-formulario'){
            let datosFormulario = '';
            //llegando, cuando estoy recibiendo datos
            req.on('data', (pedacitos)=>{
                datosFormulario += pedacitos
            })
            //hay un error
            req.on('error', (error)=>{
                console.error(error);
                req.statusCode = 500;
                res.end("recurs no encontrado")
            })
            //ya llego todo
            req.on('end',()=>{
                console.log(datosFormulario);
                res.end(datosFormulario);
            })


        }else{
            gestionarRecursos(req, res)
        }
    } 
    else{
        res.statusCode= 404;
        res.end("No se encuntra el recurso");
    }
})


miServidor.listen(PUERTO);
