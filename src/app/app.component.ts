import {
  Component,
  DoCheck,
  IterableChangeRecord,
  IterableChanges,
  IterableDiffer,
  IterableDiffers,
  VERSION,
} from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements DoCheck {
  employee1 = { id: 1, name: 'Test 1' };
  employee2 = { id: 2, name: 'Test 2' };
  employee3 = { id: 3, name: 'Test 3' };

  employees = [this.employee1, this.employee2];

  private differ: IterableDiffer<any> = null;

  constructor(private _iterableDiffers: IterableDiffers) {
    this.differ = this._iterableDiffers.find(this.employees).create();
  }

  ngDoCheck() {
    const changes: IterableChanges<number> = this.differ.diff(this.employees);

    if (changes) {
      changes.forEachAddedItem((item: IterableChangeRecord<number>) => {
        console.log('added ', item);
      });

      changes.forEachMovedItem((item: IterableChangeRecord<number>) => {
        console.log('moved', item);
      });

      changes.forEachRemovedItem((item: IterableChangeRecord<number>) => {
        console.log('removed', item);
      });

      changes.forEachItem((item: IterableChangeRecord<number>) => {
        console.log('item', item);
      });
    }
  }

  btnClicked() {
    this.employees = [this.employee2, this.employee3];
  }
}













/*
import { Component, OnInit } from '@angular/core';

import { Employee } from './employee';

@Component({
  selector: 'my-app',
  template: `
    <button (click)="add()">Add</button> <br/>
    <button (click)="delete()">Delete</button> <br/>
    <button (click)="update()">Update</button>
    <app-emp [empArray]="empArray"></app-emp>
  `,
})
export class AppComponent implements OnInit {
  empArray = [];
  index = 102;
  ngOnInit() {
    this.empArray.push(new Employee(100, 'Mahesh'));
    this.empArray.push(new Employee(101, 'Krishna'));
  }
  add() {
    this.empArray.push(new Employee(this.index++, 'ABCD'));
    console.log('Employee added: ' + JSON.stringify(this.empArray));
  }
  delete() {
    if (this.empArray && this.empArray.length > 2) {
      this.empArray.pop();
      console.log('Employee deleted: ' + JSON.stringify(this.empArray));
    } else {
      console.log('No further delete.');
    }
  }
  nameCount = 1;
  update() {
    this.empArray[this.empArray.length - 1].name = 'Shiva' + this.nameCount++;
  }
}
*/
