const express = require ('express');
const rutas = express.Router();
const EstudianteModel = require('../models/Estudiante');
const UsuarioModel = require('../models/Usuario');

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
        Edad: req.body.Edad,
        Pago: req.body.Pago,
        usuario: req.body.usuario//asignar el id de usuario
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
//endpoint 5 encontrar por edad
rutas.get('/lista/:id', async (req, res) => {
    try {
        const estudiantes = await  EstudianteModel.findById(req.params.id);
        if (!estudiantes)
            return res.status(404).json({ mensaje: 'Estudiante no encontrado'});
        else
            return res.json(estudiantes);
        } 
        catch (error) {
            res.status(500).json({ mensaje: error.message})
        }
});
//endpoint 6 encontrar por division
rutas.get('/division/:Division', async (req, res) => {
    try {
        const Divisionestudiantes = await  EstudianteModel.find({ Division : req.params.Division});
            return res.json(Divisionestudiantes);
        } 
        catch (error) {
            res.status(500).json({ mensaje: error.message})
        }
});
//endpoint 7  encontrar por Apellido
rutas.get('/apellido/:Apellido', async (req, res) => {
    try {
        const Apellidoestudiantes = await  EstudianteModel.find({ Apellido : req.params.Apellido});
            return res.json(Apellidoestudiantes);
        } 
        catch (error) {
            res.status(500).json({ mensaje: error.message})
        }
});
//endpoint 7  encontrar por Pago
rutas.get('/Pago/:Pago', async (req, res) => {
    try {
        const pagosestudiantes = await  EstudianteModel.find({ Pago : req.params.Pago});
            return res.json(pagosestudiantes);
        } 
        catch (error) {
            res.status(500).json({ mensaje: error.message})
        }
});
//endpoint 9 eliminar todos los estudiantes
rutas.get('/eliminarpagos', async (req, res) => {
    try {
        await  EstudianteModel.deleteMany({Pago : Pago = /no/});
            return res.json({ mensaje: "Los estudiantes que no pagaron han sido eliminados"});
        } 
        catch (error) {
            res.status(500).json({ mensaje: error.message})
        }
});
//endpoint 10 Contar
rutas.get('/total/:Division', async (req, res) => {
    try {
        const total = await  EstudianteModel.countDocuments({ Division : req.params.Division});
            return res.json({ totalEstudiantes : total });
        } 
        catch (error) {
            res.status(500).json({ mensaje: error.message})
        }
});
//endpoint 11 ordenar
rutas.get('/ordenar', async (req, res) => {
    try {
        const ordenar = await  EstudianteModel.find().sort({ Nombre : 1});
            return res.json({ ordenar });
        } 
        catch (error) {
            res.status(500).json({ mensaje: error.message})
        }
});
//REPORTES 1
rutas.get('/EstudiantePorUsuario/:usuarioId', async (peticion, respuesta) =>{
    const {usuarioId} = peticion.params;
    console.log(usuarioId);
    try{
        const usuario = await UsuarioModel.findById(usuarioId);
        if (!usuario)
            return respuesta.status(404).json({mensaje: 'usuario no encontrado'});
        const estudiantes = await EstudianteModel.find({ usuario: usuarioId}).populate('usuario');
        respuesta.json(estudiantes);

    } catch(error){
        respuesta.status(500).json({ mensaje :  error.message})
    }
})
//REPORTES 2
//sumar porciones de recetas por Usuarios
rutas.get('/EdadPorUsuario', async (req, res) => {
    try {   
        const usuarios = await UsuarioModel.find();
        const reporte = await Promise.all(
            usuarios.map( async ( usuario1 ) => {
                const estudiantes = await EstudianteModel.find({ usuario: usuario1._id});
                const totalEstudiantes =estudiantes.reduce((sum, estudiantesba) => sum + estudiantesba.Edad, 0);
                return {
                    usuario: {
                        _id: usuario1._id,
                        nombreusuario: usuario1.nombreusuario
                    },
                    totalEstudiantes,
                    estudiantes: estudiantes.map( r => ( {
                        _id: r._id,
                        Nombre: r.Nombre,
                        Edad: r.Edad
                    }))
                }
            } )
        )
        res.json(reporte);
    } catch (error){
        res.status(500).json({ mensaje :  error.message})
    }
})
module.exports = rutas;