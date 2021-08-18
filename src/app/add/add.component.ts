import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, ValidatorFn, ValidationErrors, AbstractControl, FormGroup, FormControl } from '@angular/forms';
import { PeopleService } from '../services/people.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
// Note to add this component into ANY other component you just need to..
// add the selector tags eg <app-add> </app-add>

export class AddComponent implements OnInit {
  // Define my Form name "peopleForm" as a FORMGROUP
  peopleForm: FormGroup;
  valid: any;
  errorMessage: any;

  // Create instances of FormBuilder (fb) and PeopleServices (ps)
  constructor(
    private fb: FormBuilder,
    private ps: PeopleService
  ) { }


  ngOnInit(): void {
    // INITIALFORM FUNCTION  (bottom of page)
    // This will create our HTML form "peopleForm" as a FormGroup
    // and define our forms Controls. Later we can access validation functions
    // from the FormBuilder helper class. eg validate an email...
    // this validation can be real time
    this.peopleForm = this.fb.group(
      {
        fName: [null],
        lName: [null],
        phone: [null]
      }
    );

    // ------------VALIDATION USING 'OBSERVABLE -------------------//
    // Here our poeopleForm formgroup has an Observable method called 'valueChanges'
    // this will map to any of our form fields in real time.  So we can validate the data 
    // entered into the form field by the user in real time and give then feedback 
    this.peopleForm.valueChanges 
      .subscribe((formData) => {
          // formData represents all of the form field elements
          // Look in the console and look at specific fields as you enter data
          console.log(formData.fName);
      })  // END OF "OSERVABLE "VALIDATIONS

  }   // end ngOnInit

  // ---------- VALIDATION WHEN SUBMITTING FORM---------------//
  submit(): void {  
    this.errorMessage = "";
    this.valid = this.ps.checkAdd(this.peopleForm.value);
    if (this.valid == "pass") {
      this.ps.addPerson(this.peopleForm.value);
      alert("Data added to database" ) ;
      this.peopleForm.reset();

    }
    if (this.valid == "frnameFail") {
      this.errorMessage = "Firstname entry has an error";
    }    
  if (this.valid == "frFail") {
    this.errorMessage = "Phone number entry has an error";
  }  
  }

}