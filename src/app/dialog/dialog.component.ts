import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from "@angular/material";
import { PeopleService } from '../services/people.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  constructor(private ps: PeopleService,
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  // THis array will hold the people data 
  people: [];
  // "data" is what is PASSED to this component via the LIST component
  // assign to variable "id"
  id = this.data;
  // Varaible to display name
  displayName:string;

  ngOnInit() {
    // Call PeopleService instance "ps" and asign to variable "people"
    this.people = this.ps.getPeople();
    // set variable "displatNme" to the peoople array at ID send to  
    this.displayName = this.people[this.id].fName  + "  " + this.people[this.id].lName;

  }


  delete(data) {
    console.log("in delete :" + data)
    this.ps.deletePerson(this.data);
  }

  close() {
    this.dialogRef.close();
    this.dialogRef.afterClosed().subscribe(value => {
    });
  }


}