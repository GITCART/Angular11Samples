import {AfterContentInit, Component, ComponentFactoryResolver, ComponentRef, TemplateRef, ViewChild, ViewContainerRef} from '@angular/core';
import {User} from './auth-form/auth-form.interface';
import {AuthFormComponent} from './auth-form/auth-form.component';

@Component({
  selector: 'app-root',
  template: `
   <div>
    <div #entry></div>
     <ng-template #tmpl let-name let-location="location">
       {{ name }} : {{ location }}
     </ng-template>
   </div>
  `
})
export class AppComponent implements AfterContentInit{

  @ViewChild('entry', { read: ViewContainerRef, static: true}) entry: ViewContainerRef;

  @ViewChild('tmpl', { read: TemplateRef, static: true}) tmpl: TemplateRef<any>;

  ngAfterContentInit(): void {
    this.entry.createEmbeddedView(this.tmpl, {
      $implicit: 'Jose Diaz',
      location: 'Lima, PE'
    });
  }


}
