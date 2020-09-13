const fs = require('fs');

// Almacenar notas en un arreglo

let listadoPorHacer = [];

// Funciones

// Guardar tareas en la base de datos
const guardarDB = () => {
    let data = JSON.stringify(listadoPorHacer);

    fs.writeFile('db/data.json', data, err => {
        // Se recibe un error, si existe se mostrara
        if (err) throw new Error('Error al grabar', err);
    });
}

// Regresar la informacion del json al arreglo
const cargarDB = () => {
    try {
        listadoPorHacer = require('../db/data.json');
    } catch (error) {
        listadoPorHacer = [];
    }

}

// Crea una tarea y la agrega al arreglo de tareas
const crear = (descripcion) => {

    cargarDB();

    let porHacer = {
        descripcion,
        completado: false,
    }

    listadoPorHacer.push(porHacer);
    guardarDB();
    return porHacer;
}

// Mostrar todas las tareas por hacer
const getListado = () => {
    cargarDB();
    return listadoPorHacer;
}

// Actualizar el estado de las tareas
const actualizar = (descripcion, completado = true) => {
    cargarDB();
    let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);
    if (index >= 0) {
        listadoPorHacer[index].completado = completado;
        guardarDB();
        return true;
    } else {
        return false;
    }
}

// Borrar una tarea
const borrar = (descripcion) => {
    cargarDB();
    let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);
    if (index >= 0) {
        listadoPorHacer.splice(index, 1); // Elimina '1' elemento a partir de 'index'.
        guardarDB();
        return true;
    } else {
        return false;
    }

}

module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}