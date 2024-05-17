const express = require ('express');
const rutas = express.Router();
const EstudianteModel = require('../models/Estudiante');

//endpoint 1 traer lista estudiantes
rutas.get('/lista', async (req, res) => {
    try {
        const estudiantes = await  EstudianteModel.find();
        res.json(estudiantes);
    } catch (error){
        res.status(500).json({ mensaje: error.message});
    }
});
//endpoint 2 anadir estudiante
rutas.post ('/anadir', async (req, res) => {
    const estudiante = new EstudianteModel({
        Nombre: req.body.Nombre,
        Apellido: req.body.Apellido,
        Division: req.body.Division,
        edad: req.body.edad,
    })
    try {
        const nuevoEstudiante = await estudiante.save();
        res.status(201).json(nuevoEstudiante);
    } catch (error) {
        res.status(400).json ({ mensaje: error.message})
    }
});
//endpoint 3 Editar Datos Estudiante
rutas.put('/editar/:id', async (req, res) => {
    try {
        const estudianteEditado = await EstudianteModel.findByIdAndUpdate(req.params.id, req.body, { new : true });
        if (!estudianteEditado)
            return res.status(404).jso({ mensaje: 'Estudiante no encontrado'});
        else
            return res.json(estudianteEditado);

    } catch (error) {
        res.status(400).json ({ mensaje: error.message})
    }
});
//endpoint 4 Eliminar Estudiante
rutas.delete ('/eliminar/:id', async (req, res) => {
    try {
     const estudianteEliminado = await EstudianteModel.findByIdAndDelete(req.params.id);
     if (!estudianteEliminado)
        return res.status(404).jso({ mensaje: 'Estudiante no encontrado'});
    else
        return res.json({ mensaje : 'Estudiante Eliminado'});
    } 
    catch (error) {
        res.status(500).json({ mensaje: error.message})
    }
});
module.exports = rutas;