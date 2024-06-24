import { Component, OnInit, Input } from '@angular/core';
import { Passenger } from '../../models/passenger.interface';

@Component({
    selector: 'passenger-count',
    template:`
    
        <div>
            Todal de checkin {{  checkedInCount() }} / {{ items?.length }}
        </div>
    `
})

export class PassengerCountComponent implements OnInit {

    @Input()
    items: Passenger[];

    constructor() { }

    ngOnInit() { }


    checkedInCount(): number {

        if(!this.items) return;
        return this.items.filter( (passenger: Passenger) => passenger.checkedIn).length;
    }
}