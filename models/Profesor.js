const mongoose = require ('mongoose');
//definir esquema
const profesorSchema = new mongoose.Schema({
    //nombre:  { type : String, require: true}
    Nombre: String,
    Apellido: String,
    Curso: String,
    Disciplina: String
});

const ProfesorModel = mongoose.model('Profesor', profesorSchema, 'profesor');
module.exports = ProfesorModel;
