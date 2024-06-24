import { Component, OnInit } from '@angular/core';
import { Passenger } from '../models/passenger.interface';
import { PassengerDashboardService } from '../services/passenger-dashboard.service';

@Component({
    selector: 'passenger-dashboard',
    template:`
        <passenger-count [items]="passengers"></passenger-count> 
        <passenger-detail *ngFor="let passenger of passengers;" [detail]="passenger"
                    (edit)="handleEdit($event)" (remove)="handleRemove($event)" ></passenger-detail>
    `
})

export class PassengerDashboardComponent implements OnInit {

    passengers: Passenger[];

    constructor( private passengerDashboardService : PassengerDashboardService) { }

    ngOnInit() { 

        this.passengerDashboardService.getPassengers().subscribe(

            (data: Passenger[]) => this.passengers = data,
            error => console.log("Error al obtener passegers", error)

        );

    }


    handleEdit(event: Passenger) {

        this.passengerDashboardService.updatePassenger(event).subscribe(

            (data: Passenger) => {

    
                this.passengers = this.passengers.map((passenger: Passenger) => {
                  if (passenger.id === event.id) {
                    passenger = Object.assign({}, passenger, event);
                  }
                  return passenger;
                });
        
              });

            
    }

    handleRemove(event: Passenger) {

        this.passengerDashboardService.removePassenger(event).subscribe(
            (data: Passenger) => {
                this.passengers = this.passengers.filter((passenger: Passenger) => {
                  return passenger.id !== event.id;
                });
            });
    }


}