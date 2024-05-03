const formulario = document.getElementById('form');

formulario.addEventListener('submit', (e)=>{
    e.preventDefault();
    console.log("ee");
    const datos = new FormData(formulario);
    //Pasa un elemento iterable como un array a objeto
    const datosFormulario = Object.fromEntries(datos)
    fetch(formulario.form,{
        headers:{
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(datosFormulario)
    }).then(()=>{

    }).catch(()=>{

    })
})