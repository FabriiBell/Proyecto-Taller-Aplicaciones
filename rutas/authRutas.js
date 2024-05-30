const express = require ('express');
const rutas = express.Router();
const Usuario = require('../models/Usuario');
const bcrypt = require ('bcrypt');
const jwt =  require('jsonwebtoken');
const redis = require('redis');
// Configurar cliente de Redis
const redisClient = redis.createClient();

redisClient.on('error', (err) => {
    console.error('Redis error: ', err);
});

//Registro
rutas.post ('/Registrarse', async (req, res) => {
    try {
        const { nombreusuario, correo, contrasenia } = req.body;
        const usuario = new Usuario ({ nombreusuario, correo, contrasenia });
        await usuario.save();
        res.status(201).json({mensaje: 'Usuario registrado con exito'});
    }
    catch (error){
        res.status(500).json({mensaje: error.message});
    }
});
//Inicio de sesion
rutas.post ('/iniciarsesion', async (req, res) => {
    try {
        const { correo, contrasenia} = req.body;
        const usuario = await Usuario.findOne({ correo });
        if (!usuario)
            return res.status(401).json({ error : 'correo invalido'});
        const validarContrasena = await usuario.compararContrasenia(contrasenia);
        if (!validarContrasena)
            return res.status(401).json({ error : 'Contrasena invalido'});
        //creacion de token
        const token = jwt.sign({ usuarioId: usuario._id},'clave_secreta', {expiresIn: '4h'});
        res.json( {token});
    } 
    catch (error) {
        res.status(500).json ({ mensaje: error.message});
    }
});
// Cerrar sesión
rutas.post('/cerrarsesion', (req, res) => {
    try {
        const token = req.headers['authorization'] ? req.headers['authorization'].split(' ')[1] : null;
        if (!token) {
            return res.status(400).json({ mensaje: 'Token no provisto' });
        }

        // Añadir el token a la lista negra con un tiempo de expiración
        const decoded = jwt.decode(token);
        const expiration = decoded.exp - Math.floor(Date.now() / 1000);
        redisClient.set(token, 'blacklisted', 'EX', expiration);

        res.status(200).json({ mensaje: 'Sesión cerrada exitosamente' });
    } catch (error) {
        res.status(500).json({ mensaje: error.message });
    }
});
// Middleware para verificar el token
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'] ? req.headers['authorization'].split(' ')[1] : null;
    if (!token) {
        return res.status(403).json({ mensaje: 'Token no provisto' });
    }

    redisClient.get(token, (err, reply) => {
        if (err) {
            return res.status(500).json({ mensaje: 'Error en la verificación del token' });
        }

        if (reply === 'blacklisted') {
            return res.status(401).json({ mensaje: 'Token inválido' });
        }

        try {
            const decoded = jwt.verify(token, 'clave_secreta');
            req.usuarioId = decoded.usuarioId;
            next();
        } catch (error) {
            return res.status(401).json({ mensaje: 'Token inválido' });
        }
    });
};


module.exports = rutas;
module.exports.verifyToken = verifyToken;