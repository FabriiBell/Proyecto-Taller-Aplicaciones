import {HttpClient} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { EstudianteModel } from "../models/estudiante.model";
import { Observable } from "rxjs";

@Injectable ({
    providedIn : 'root'
})
export class EstudianteService {
    /**
     * 
     */
    private API_URL = 'http://localhost:8000/estudiantes'
    constructor (private http: HttpClient) {

    }
    getLista (): Observable<EstudianteModel[]>{
        return this.http.get<EstudianteModel[]>(`${this.API_URL}/lista`);
    }

    agregarEstudiante(estudiantes: EstudianteModel) : Observable<EstudianteModel> {
        return this.http.post<EstudianteModel>(`${this.API_URL}/anadir`, estudiantes);
    }

    editarEstudiante(estudiantes: EstudianteModel) : Observable<EstudianteModel> {
        return this.http.put<EstudianteModel>(`${this.API_URL}/editar/${estudiantes._id}`, estudiantes);
    }

    eliminarEstudiante(idEstudiante : string) : Observable<EstudianteModel> {
        console.log(idEstudiante);
        return this.http.delete<EstudianteModel>(this.API_URL+'/eliminar/'+idEstudiante);   
    }
}