import {Component, EventEmitter, Output} from '@angular/core';


@Component({
  selector: 'auth-message',
  template: `
    <div>
        You will be logged if for {{ days }} days
    </div>
    `

})
export class AuthMessageComponent {

  days: number = 7;

}
