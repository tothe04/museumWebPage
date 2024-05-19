import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExhibitsRoutingModule } from './exhibits-routing.module';
import { ExhibitsComponent } from './exhibits.component';
import { ListComponent } from './list/list.component';
import { ViewerComponent } from './viewer/viewer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PriceFormatPipe } from '../../shared/pipes/price-format.pipe';

import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    ExhibitsComponent,
    ListComponent,
    ViewerComponent,
    PriceFormatPipe
  ],
  imports: [
    CommonModule,
    ExhibitsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatOptionModule,
    MatFormFieldModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ]
})
export class ExhibitsModule { }
