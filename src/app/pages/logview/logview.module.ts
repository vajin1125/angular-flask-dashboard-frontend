import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { LogviewComponent } from './logview.component';
import { routing } from './logview.routing';
import { HoverTable } from './components/hoverTable';
import { NgaModule } from '../../theme/nga.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    routing,
    HttpModule,
    NgaModule
  ],
  declarations: [
    LogviewComponent,
    HoverTable,
  ]
})
export class LogviewModule {}