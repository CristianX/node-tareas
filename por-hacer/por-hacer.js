// File system para hacer tarea persistente
const fs = require('fs');


let listadoPorHacer = [];

const guardarDB = () => {
    // JSON.stringify convierte un objeto en formato JSON
    let data = JSON.stringify(listadoPorHacer);

    fs.writeFile(`db/data.json`, data, (err) => {
        if (err) throw new Error('No se puedo grabar', err);
    });
}

// Leer contenido de bdd
const cargarDB = () => {

    try {

        listadoPorHacer = require('../db/data.json');
        // console.log(listadoPorHacer);


    } catch (error) {
        listadoPorHacer = [];

    }
}

const getListado = () => {
    cargarDB();
    return listadoPorHacer;
}

const actualizar = (descripcion, completado = true) => {
    cargarDB();

    // encontrando un elemento por el index
    let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);

    if (index >= 0) {
        listadoPorHacer[index].completado = completado;
        guardarDB();
        return true;
    } else {
        return false;
    }
}



const crear = (descripcion) => {


    cargarDB();

    let porHacer = {
        descripcion,
        completado: false
    };

    listadoPorHacer.push(porHacer);

    guardarDB();

    return porHacer;
}


const borrar = (descripcion) => {
    cargarDB();
    // Filter crea un nuevo listado borrando el que se pidió en la descripcion
    let nuevoListado = listadoPorHacer.filter(tarea => tarea.descripcion != descripcion);

    if (listadoPorHacer.length === nuevoListado.length) {
        return false;
    } else {
        listadoPorHacer = nuevoListado;
        guardarDB();
        return true;
    }



    guardarDB();
}




module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}