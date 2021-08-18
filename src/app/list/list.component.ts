import { Component, OnInit } from '@angular/core';
import { PeopleService } from '../services/people.service';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})

export class ListComponent implements OnInit {

// Create Instance of PeopleService(ps) and MatDialog (dialog)
  constructor(private ps: PeopleService, public dialog: MatDialog) {
  }

  // People Variable to hold all people
  people: any;

  ngOnInit(): void {
    // Call PeopleService Method "getPeople" and assign all data to 'people'
    this.people = this.ps.getPeople() 
    
  } //end ngOnInit()


  // ------ DIALOG BOX --------------//
  // openDialog() FUNCTION
  // When the user clicks the "DELETE" button on the Form 
  // a dialog box will open and
  // the "id" of that person is passed to it as a parameter.
  openDialog(id: number): void {
    // --- dialogConfig -----//
    // The dialog box is given a width and height and the "id"
    // is passed to the dialog box as a varaibel called "data"
    const dialogConfig: MatDialogConfig = {
      // NC: changed how this is instantiated slightly
      width: '500px',
      height: '250px',
      // IMPORTANT: this 'id' will be passed to the Dialog box as variable named "data"  
      data: id,    
    };  //end dialogConfig

     // --- OPENS DIALOG  -----//
    this.dialog.open(DialogComponent, dialogConfig)
      .afterClosed()
      .subscribe(value => {
        if (value) {
          //not accessed
        } else {
          this.people = this.ps.getPeople();
        }
      }
    ); // end this.dialog.open
  } // end openDialog Fuction


} // end class
