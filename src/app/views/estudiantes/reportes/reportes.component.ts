import { NgStyle } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonDirective, CardBodyComponent, CardComponent, CardHeaderComponent, ColComponent, FormControlDirective, FormDirective, FormLabelDirective, FormSelectDirective, RowComponent, TableActiveDirective, TableColorDirective, TableDirective, TextColorDirective } from '@coreui/angular';
import { DocsExampleComponent } from '@docs-components/public-api';

@Component({
  selector: 'app-reportes',
  standalone: true,
  imports: [ButtonDirective, TextColorDirective, RowComponent, ColComponent, CardComponent, CardHeaderComponent, CardBodyComponent, DocsExampleComponent, FormDirective, FormLabelDirective, FormControlDirective, FormSelectDirective, NgStyle, TableDirective, TableColorDirective, TableActiveDirective],
  templateUrl: './reportes.component.html',
  styleUrl: './reportes.component.scss'
})
export class ReportesComponent {

}
