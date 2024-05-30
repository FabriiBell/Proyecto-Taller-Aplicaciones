const express = require ('express');
const mongoose = require ('mongoose');
const request = require ('supertest');
const estudiantesRutas = require ('../../rutas/estudiantesRutas');
const EstudianteModel = require ('../../models/Estudiante');
const app = express();
app.use(express.json());
app.use('/estudiantes', estudiantesRutas);

describe('Pruebas unitarias para estudiantes',() =>{
    //se ejecuta antes de iniciar las pruebas
    beforeEach(async() => {
       await mongoose.connect('mongodb://localhost:27017/ClubUniveristario',{
            useNewUrlParser : true,
       });
       await EstudianteModel.deleteMany({});
    });
    //al finalizar las pruebas
    afterAll(() => {
        return mongoose.connection.close();
    });

    //primer test
    test('Deberia traer a todos los estudiantes del club metodo: GET: lista', async() => {
        await EstudianteModel.create({Nombre: 'Joaquin', Apellido: 'Lara', Division: 'sub15', Pago: 'no' });
        await EstudianteModel.create({Nombre: 'Antoni', Apellido: 'Bellido', Division: 'sub11', Pago: 'si' });
        //solicitudes - request
        const res = await request(app).get('/estudiantes/lista');
        console.log(res);
        //verificar la respuesta
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveLength(2);
    }, 10000);  
    
    test('Deberia agregar un nuevo Estudiante: POST: /anadir', async() => {
        const nuevoEstudiante = {
            Nombre:'Joaquin',
            Apellido: 'Lara',
            Division:'sub21',
            Pago: 'si'
        };
        const res =  await request(app)
                            .post('/estudiantes/anadir')
                            .send(nuevoEstudiante);
        expect(res.statusCode).toEqual(201);
        expect(res.body.Nombre).toEqual(nuevoEstudiante.Nombre);
    });

    test('Deberia actualizar una tarea que ya existe: PUT /editar/:id', async()=>{
        const estudianteCreado = await EstudianteModel.create(
                                  { Nombre:'Joaquin',
                                  Apellido: 'Lara',
                                  Division:'sub21',
                                  Pago: 'si' });
        const estudianteActualizar = {
            Nombre:'Joaquin(edit)',
            Apellido: 'Lara(edit)',
            Division:'sub21(edit)',
            Pago: 'si(edit)'
        };
        const res =  await request(app)
                            .put('/estudiantes/editar/'+estudianteCreado._id)
                            .send(estudianteActualizar);
        expect(res.statusCode).toEqual(200);
        expect(res.body.Nombre).toEqual(estudianteActualizar.Nombre);                   
        });
    test('Deberia eliminar una tarea existente : DELETE /eliminar/:id', async() =>{
        const estudianteCreado = await EstudianteModel.create(
            { Nombre:'Joaquin(edit)',
            Apellido: 'Lara(edit)',
            Division:'sub21(edit)',
            Pago: 'si(edit)' });

        const res =  await request(app)
                                .delete('/estudiantes/eliminar/'+estudianteCreado._id);n
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual({mensaje :  'Estudiante eliminado'});
    });
});