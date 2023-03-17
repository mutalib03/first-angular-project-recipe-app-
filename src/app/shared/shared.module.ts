import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AlertComponent } from './alert/alert.component';
import { DropdownDirective } from './dropdown.directive';
import { LoadingComponentsComponent } from './loading-components/loading-components.component';
import { PlaceholderDirective } from './placeholder/placeholder.directive';

@NgModule({
  declarations: [
    AlertComponent,
    DropdownDirective,
    LoadingComponentsComponent,
    PlaceholderDirective,
  ],

  imports: [CommonModule],
  exports: [
    AlertComponent,
    DropdownDirective,
    LoadingComponentsComponent,
    PlaceholderDirective,
    CommonModule,
  ],

  entryComponents: [AlertComponent],
})
export class SharedModule {}
