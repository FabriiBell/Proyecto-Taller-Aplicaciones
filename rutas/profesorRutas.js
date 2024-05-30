const express = require ('express');
const rutas = express.Router();
const ProfesorModel = require('../models/Profesor');

//endpoint 1 traer lista profesores
rutas.get('/lista', async (req, res) => {
    try {
        const profesores = await  ProfesorModel.find();
        res.json(profesores);
    } catch (error){
        res.status(500).json({ mensaje: error.message});
    }
});
//endpoint 2 anadir Profesor
rutas.post ('/anadir', async (req, res) => {
    const profesor = new ProfesorModel({
        Nombre: req.body.Nombre,
        Apellido: req.body.Apellido,
        Curso: req.body.Curso,
        Disciplina: req.body.Disciplina,
    })
    try {
        const nuevoProfesor = await profesor.save();
        res.status(201).json(nuevoProfesor);
    } catch (error) {
        res.status(400).json ({ mensaje: error.message})
    }
});
//endpoint 3 Editar Datos Estudiante
rutas.put('/editar/:id', async (req, res) => {
    try {
        const profesorEditado = await ProfesorModel.findByIdAndUpdate(req.params.id, req.body, { new : true });
        if (!profesorEditado)
            return res.status(404).json({ mensaje: 'Profesor no encontrado'});
        else
            return res.json(profesorEditado);

    } catch (error) {
        res.status(400).json ({ mensaje: error.message})
    }
});
//endpoint 4 Eliminar Profesor
rutas.delete ('/eliminar/:id', async (req, res) => {
    try {
     const profesorEliminado = await ProfesorModel.findByIdAndDelete(req.params.id);
     if (!profesorEliminado)
        return res.status(404).jso({ mensaje: 'Profesor no encontrado'});
    else
        return res.json({ mensaje : 'Profesor Eliminado'});
    } 
    catch (error) {
        res.status(500).json({ mensaje: error.message})
    }
});
//endpoint 5 encontrar por curso
rutas.get('/lista/:id', async (req, res) => {
    try {
        const profesores = await  ProfesorModel.findById(req.params.id);
        if (!profesores)
            return res.status(404).json({ mensaje: 'Profesor no encontrado'});
        else
            return res.json(profesores);
        } 
        catch (error) {
            res.status(500).json({ mensaje: error.message})
        }
});
rutas.get('/curso/:Curso', async (req, res) => {
    try {
        const CursoProfesor = await  ProfesorModel.find({ Curso : req.params.Curso});
            return res.json(CursoProfesor);
        } 
        catch (error) {
            res.status(500).json({ mensaje: error.message})
        }
});
rutas.get('/disciplina/:Disciplina', async (req, res) => {
    try {
        const DisciplinaProfesor = await  ProfesorModel.find({ Disciplina : req.params.Disciplina});
            return res.json(DisciplinaProfesor);
        } 
        catch (error) {
            res.status(500).json({ mensaje: error.message})
        }
});
module.exports = rutas;