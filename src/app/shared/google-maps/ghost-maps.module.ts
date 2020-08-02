import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GhostMapsComponent } from './ghost-maps.component';

@NgModule({
  declarations: [ GhostMapsComponent ],
  imports: [
    CommonModule
  ],
  exports: [ GhostMapsComponent ]
})
export class GhostGoogleMapsModule { }
