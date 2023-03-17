import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { AuthComponent } from './auth.component';

@NgModule({
  declarations: [AuthComponent],
  imports: [
    SharedModule,
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([{ path: '', component: AuthComponent }]),
  ],
  exports: [AuthComponent],
})
export class AuthModule {}
