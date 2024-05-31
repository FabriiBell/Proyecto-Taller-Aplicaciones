import { NgStyle } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonDirective, CardBodyComponent, CardComponent, CardHeaderComponent, ColComponent, FormControlDirective, FormDirective, FormLabelDirective, FormSelectDirective, RowComponent,  TableActiveDirective,  TableColorDirective,  TableDirective,  TextColorDirective } from '@coreui/angular';
import { DocsExampleComponent } from '@docs-components/public-api';
import { EstudianteModel } from '../models/estudiante.model';
import { EstudianteService } from '../services/estudiante.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-estudiante',
  standalone: true,
  imports: [ButtonDirective, TextColorDirective, RowComponent, 
      ColComponent, CardComponent, CardHeaderComponent, CardBodyComponent, 
      DocsExampleComponent, FormsModule ,FormDirective, FormLabelDirective, 
      FormControlDirective, FormSelectDirective, 
      NgStyle, TableDirective, TableColorDirective, TableActiveDirective],
  templateUrl: './estudiante.component.html',
  styleUrl: './estudiante.component.scss'
})
export class EstudianteComponent {
  listaEstudiantes : EstudianteModel[] = [];
  estudianteModelo : EstudianteModel = new EstudianteModel();

  constructor (private estudianteService: EstudianteService) {
    this.lista();
  }
  lista(){
    this.estudianteService.getLista().subscribe({
      next : (respuesta) => {
        console.log(respuesta);
        this.listaEstudiantes = respuesta;
      },
      error: (error) => {
        console.log(error);
      }
    })
  }
  guardarEstudiante(){
    console.log(this.estudianteModelo);
    if (this.estudianteModelo._id == '') {
      console.log("guardar", this.estudianteModelo);
      this.agregarEstudiante();
    } else {
      console.log("editar", this.estudianteModelo);
      this.editarEstudiante();
    }
  }
  agregarEstudiante (){
  this.estudianteService.agregarEstudiante(this.estudianteModelo).subscribe({
    next : (respuesta) => {
        console.log("Se guardo exitosamente",respuesta);
        this.lista();
        this.estudianteModelo = new EstudianteModel();
    },
    error: (error) => {
      console.log(error);
    }
  })
}

  eliminarEstudiante(estudiantes: EstudianteModel){
    console.log("item para elimminar", estudiantes);
    this.estudianteService.eliminarEstudiante(estudiantes._id).subscribe({
      next : (respuesta) => {
          console.log("Se elimino exitosamente",respuesta);
          this.lista();
      },
      error: (error) => {
        console.log(error);
      }
    })
  }
verEstudiante(estudiantes: EstudianteModel){
  this.estudianteModelo = estudiantes;
}
  editarEstudiante(){
    this.estudianteService.editarEstudiante(this.estudianteModelo).subscribe({
      next : (respuesta) => {
          console.log("Se edito exitosamente",respuesta);
          this.lista();
          this.estudianteModelo = new EstudianteModel();
      },
      error: (error) => {
        console.log(error);
      }
    })
  }
}

