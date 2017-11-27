import { Component, OnInit } from '@angular/core';
import { PersonModel } from './models/person.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public title = 'Smart Full Name';

  public person: PersonModel;

  constructor() {}

  ngOnInit() {
    this.person = new PersonModel({
      name: '',
      prefix: '',
      firstName: '',
      middleName: '',
      lastName: '',
      suffix: ''
    });
  }
}
