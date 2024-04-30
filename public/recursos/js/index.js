const jsonProductos = async()=>{
    try{
        let data = await fetch('http://localhost:3000/productos');
        let json = await data.json();
        console.log(json);
    }catch(err){
        console.log(err)
        throw err
    }
}
jsonProductos();