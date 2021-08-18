import { Injectable , OnInit} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PeopleService   {
  people=[];  //people array setup to hold data from people DB
  valid: any;
  constructor() {
      /* ====LOCALSTORAGE========
    Local storage stores data as key-value pairs, and the values are stored as "strings". 
    So, if we must JSON.stringify when we put them into LocalStorage and we must 'parse' the string into a valid object. when we retrieve it.

    This inictial checks to see if the peopleDB in local storage exsits, if it doen;t it creates a blanck db in lcoal storage called peopleDB
    */
    if (localStorage.peopleDB == null ) {
        localStorage.setItem('peopleDB', JSON.stringify(this.people));
    }

  } //end constructor

  //this function extacts data from the peopleDB and puts it in the array people
  getPeople() {
    let people = JSON.parse(localStorage.getItem('peopleDB'));
    return people;
  }

  // this FUNCTION accepts 'one' parameter 'person' which as an object
  // and pushes this parameter into the peole array
  addPerson(person): void {
    let people = JSON.parse(localStorage.getItem('peopleDB'));
    people.push(person);  //add the object to the end of the array
    localStorage.setItem('peopleDB', JSON.stringify(people));
  }

// this function edits the data in the peopleDB
  editPerson(person, id): void {
    let people = JSON.parse(localStorage.getItem('peopleDB'));
    people[id] = person; //change the objects at array position id
    localStorage.setItem('peopleDB', JSON.stringify(people));
  }

  deletePerson(id): void {
    let people = this.getPeople()
    people.splice(id, 1);  //remove the person at position ID in the array
    localStorage.setItem('peopleDB', JSON.stringify(people));
  }

  checkAdd(addValues): void {
    //check if inputs in the add are valid
    this.valid = "pass";
    if (typeof addValues.fName === 'undefined' || addValues.fName == null || addValues.fName == "") {
      this.valid = "frnameFail";
    }
    if (typeof addValues.phone === 'undefined' || addValues.phone == null || addValues.phone == "") {
      this.valid = "frnameFail";
    }
    console.log("fName is " + addValues.fName); //debugging output
    console.log("valid is inside check " + this.valid); //debugging output

    return this.valid;
  } // end checkadd


}  // end class




