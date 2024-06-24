import {AfterContentInit, Component, ComponentFactoryResolver, ComponentRef, TemplateRef, ViewChild, ViewContainerRef} from '@angular/core';
import {User} from './auth-form/auth-form.interface';
import {AuthFormComponent} from './auth-form/auth-form.component';

@Component({
  selector: 'app-root',
  template: `
   <div>
     <ng-container [ngTemplateOutlet]="tmpl" [ngTemplateOutletContext]="ctx">
     </ng-container>
     <ng-template #tmpl  let-name let-location="location">
       {{ name }} : {{ location }}
     </ng-template>
   </div>
  `
})
export class AppComponent {

  ctx = {
    $implicit: 'Jose Diaz',
    location : 'Lima, PE'
  }

}
