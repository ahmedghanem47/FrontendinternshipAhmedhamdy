import { Component, OnInit } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Event } from '@angular/router';


class Registration {
  constructor(
    public name: string = '',
    public image: string='',
    public categories: string = '',
    public price: string = '',
    public country: string = 'Select country',
    public date: NgbDateStruct = null,
  ) {}
}

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  // It maintains list of Registrations
  registrations: Registration[] = [];
  // It maintains registration Model
  regModel: Registration;
  // It maintains registration form display status. By default it will be false.
  showNew: Boolean = false;
  // It will be either 'Save' or 'Update' based on operation.
  submitType: string = 'Save';
  // It maintains table row index based on selection.
  selectedRow: number;
  // It maintains Array of countries.
  countries: string[] = ['US', 'UK', 'India', 'UAE'];
  imageSrc: any;


  constructor() {
    // Add default registration data.
    this.registrations.push(new Registration('BMW', 'https://static.dezeen.com/uploads/2017/10/bmw-concept-x7-iperformance-car_dezeen_2364_sq-300x300.jpg', 'car','20000$', 'UK',{year: 2018, month: 4, day: 12}));
    this.registrations.push(new Registration('mercedes', 'https://www.daimler.com/bilder/produkte/pkw/mercedes-benz/neuer-cls/neuer-cls-w300xh300-cutout.jpg', 'car', '150000$', 'UAE',{year: 2018, month: 10, day: 3}));
    this.registrations.push(new Registration('nissan','https://www.motorbeam.com/wp-content/uploads/2014-Nissan-Sunny-Test-Drive-Review.jpg', 'nissan', '180000$', 'UK',{year: 2018, month: 10, day: 15}));

  }

  ngOnInit() {}

  // This method associate to New Button.
  onNew() {
    // Initiate new registration.
    this.regModel = new Registration();
    // Change submitType to 'Save'.
    this.submitType = 'Save';
    // display registration entry section.
    this.showNew = true;
  }

  // This method associate to Save Button.
  onSave() {
    if (this.submitType === 'Save') {
      // Push registration model object into registration list.
      this.registrations.push(this.regModel);
      this.regModel.image = this.imageSrc;
      console.log(this.regModel);
    } else {
      // Update the existing properties values based on model.
      this.registrations[this.selectedRow].name = this.regModel.name;
      this.registrations[this.selectedRow].image = this.regModel.image;
      this.registrations[this.selectedRow].categories = this.regModel.categories;
      this.registrations[this.selectedRow].price = this.regModel.price;
      this.registrations[this.selectedRow].country = this.regModel.country;
      this.registrations[this.selectedRow].date = this.regModel.date;
      this.registrations[this.selectedRow].image = this.imageSrc;
    }
    // Hide registration entry section.
    this.showNew = false;
  }

  // This method associate to Edit Button.
  onEdit(index: number) {
    // Assign selected table row index.
    this.selectedRow = index;
    // Initiate new registration.
    this.regModel = new Registration();
    // Retrieve selected registration from list and assign to model.
    this.regModel = Object.assign({}, this.registrations[this.selectedRow]);
    // Change submitType to Update.
    this.submitType = 'Update';
    
    // Display registration entry section.
    this.showNew = true;
  

  }

  // This method associate to Delete Button.
  onDelete(index: number) {
    // Delete the corresponding registration entry from the list.
    this.registrations.splice(index, 1);
    alert("Delete Done");
  }

  // This method associate toCancel Button.
  onCancel() {
    // Hide registration entry section.
    this.showNew = false;
  }

  // This method associate to Bootstrap dropdown selection change.
  onChangeCountry(country: string) {
    // Assign corresponding selected country to model.
    this.regModel.country = country;
  }



  readURL(event: Event): void {
  
    if ( event['target'].files &&  event['target'].files[0]) {
      
        const file =  event['target'].files[0];

        const reader = new FileReader();
        reader.onload = e => this.imageSrc = reader.result;

        reader.readAsDataURL(file);
    }
}
}
