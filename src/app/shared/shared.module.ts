import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorPageComponent } from './pages/error-page/error-page.component';



@NgModule({
  declarations: [
    ErrorPageComponent
  ],
  exports:[
    ErrorPageComponent
  ]
})
export class SharedModule { }
