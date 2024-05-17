const mongoose = require ('mongoose');
//definir esquema
const estudianteSchema = new mongoose.Schema({
    //nombre:  { type : String, require: true}
    Nombre: String,
    Apellido: String,
    Division: String,
    Pago: String
});

const EstudianteModel = mongoose.model('Estudiante', estudianteSchema, 'estudiantesba');
module.exports = EstudianteModel;
