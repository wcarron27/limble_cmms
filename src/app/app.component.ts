import { Component, HostListener, Inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule, DOCUMENT } from '@angular/common';
import { FormsModule, NgForm, ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { AlertService } from './alert.service';

interface User {
  userID: number,
  name: string
}

interface Comment {
  created_at: number, // Using Date.now instead of new Date
  content: string
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent {
  constructor(@Inject(DOCUMENT) private document: typeof DOCUMENT, private formBuilder: FormBuilder, private alertService: AlertService) {
    this.createContactForm();
  }

  /* Component Listener
  This HostListener provides a lot of the key functionality.
  It uses keyup events to determine the state of the User dropdown
  and determine when to filter the list of users
  */
  @HostListener('window:keyup', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (this.showUserDropdown == true && event.key == "Escape") {
      this.showUserDropdown = false
      return
    }

    let comment = this.commentForm.value.comment
    let len = comment.length
    let lastChar = comment[len - 1]

    if (lastChar == '@') {
      this.showUserDropdown = true
      this.filterUserList()
    } else if (/\s$/.test(comment)) { // exit if the name is typed out (requires different alert system)
      this.showUserDropdown = false
    }  else {
      this.filterUserList()
    }
  }

  // Component Data
  title = 'Limble CMMS Project';
  showUserDropdown = false;
  comments: Comment[] = [];
  users = [
    {'userID' : 1, 'name' : 'Kevin'},
    {'userID' : 2, 'name' : 'Jeff'},
    {'userID' : 3, 'name' : 'Bryan'},
    {'userID' : 4, 'name' : 'Gabbey'},
  ];
  filteredUsers: User[] = [];
  commentForm!: FormGroup;

  // Call in constructor to initialize the form
  createContactForm() {
    this.commentForm = this.formBuilder.group({
      comment: ['']
    });
  };

  // Small abstraction. Called in onSubmit
  saveComment(content: string) {
    let comment = {
      created_at: Date.now(),
      content,
    };
    this.comments.push(comment);
  };

  // Small abstraction for visual clarity and naming
  clearForm() {
    this.commentForm.controls['comment'].setValue('');
  };

  onSubmit() {
    this.saveComment(this.commentForm.value.comment);
    this.sendAlerts();
    this.clearForm();
  };

  // Use the unfinished tag to filter the list of users in dropdown
  filterUserList() {
    let comment = this.commentForm.value.comment
    let idx = comment.lastIndexOf('@')
    let slice = comment.slice(idx + 1).trim().toLowerCase()
    if (slice.length >= 1) {
      this.filteredUsers = this.users.filter(user => {
        return user.name.toLowerCase().includes(slice)
      })
    } else {
      this.filteredUsers = this.users
    }
  }

  // Current limitations: Cannot handle insertion in middle of string
  injectUserTag(user: User) {
    this.usersToAlert.push(user); // See sendAlert method
    let tag = encodeURI(`@${user.name}`);
    let comment = this.commentForm.value.comment
    let idx = comment.lastIndexOf('@')
    let newValue = `${comment.slice(0, idx)}${tag} `;

    // Set value and close dropdown upon selection
    this.commentForm.controls['comment'].setValue(newValue);
    this.showUserDropdown = false;

    /* Could not get ViewChild (likely preferred method) to work within the timeframe
    Here we return focus to the textarea after selecting a user */
    // @ts-ignore
    document.getElementById('comment').focus() 
  }

  /* This is not an ideal way to do this, but it was a way to send the alert
  without duplicating code that parses the comment */
  usersToAlert: User[] = [];
  sendAlerts() {
    this.alertService.sendAlerts(this.usersToAlert)
    // Reset target array.
    this.usersToAlert = []
  };
};