const mongoose = require ('mongoose');
//definir esquema
const estudianteSchema = new mongoose.Schema({
    //nombre:  { type : String, require: true}
    Nombre: String,
    Apellido: String,
    Division: String,
    Edad: Number,
    Pago: String,
    usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' }
});

const EstudianteModel = mongoose.model('Estudiante', estudianteSchema, 'estudiantesba');
module.exports = EstudianteModel;
