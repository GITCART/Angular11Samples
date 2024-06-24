import {
  AfterContentInit,
  AfterViewInit, ChangeDetectorRef,
  Component,
  ContentChild,
  ContentChildren, ElementRef,
  EventEmitter,
  Output,
  QueryList, Renderer2,
  ViewChild, ViewChildren
} from '@angular/core';
import {User} from './auth-form.interface';
import {AuthRememberComponent} from './auth-remember.component';
import {AuthMessageComponent} from './auth-message.component';


@Component({
  selector: 'auth-form',
  styles: [`
    .email {
      border-color: #9f72e6
    }
  `
  ],
  template: `
    <div>
      <form (ngSubmit)="onSubmit(form.value)" #form="ngForm">
        <h3>{{ title }}</h3>
        <label>
          Email Address
          <input type="email" name="email" ngModel #email>
        </label>
        <label>
          Password
          <input type="password" name="password" ngModel>
        </label>
        <button type="submit">
          {{ title }}
        </button>
      </form>
    </div>
  `

})
export class AuthFormComponent implements AfterContentInit, AfterViewInit {

  title =  'Login';

  showMessage: boolean;

  @ViewChild('email') email: ElementRef;

  @ViewChildren(AuthMessageComponent) message: QueryList<AuthMessageComponent>;

  @ContentChildren(AuthRememberComponent) remember: QueryList<AuthRememberComponent>;

  @Output() submitted: EventEmitter<User> = new EventEmitter<User>();

  constructor(private cd: ChangeDetectorRef, private renderer: Renderer2) {
  }

  onSubmit(value: User) {
    this.submitted.emit(value);
  }

  ngAfterContentInit(): void {
    if (this.remember) {
      this.remember.forEach((item) => {
        item.checked.subscribe((checked: boolean) =>
          this.showMessage = checked);
      });
    }
  }

  ngAfterViewInit(): void {

    // this.email.nativeElement.setAttribute('placeholder', 'Enter your email address');
    // this.email.nativeElement.classList.add('email');
    // this.email.nativeElement.focus();

    this.renderer.setAttribute(this.email.nativeElement, 'placeholder', 'Enter your email address');
    this.renderer.addClass(this.email.nativeElement, 'email');
    this.renderer.selectRootElement(this.email.nativeElement).focus();

    if (this.message) {
      this.message.forEach((message) => {
        message.days = 30;
      });
      this.cd.detectChanges();
    }
  }
}
