import { Component, HostListener, Inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule, DOCUMENT } from '@angular/common';
import { FormsModule, NgForm, ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(@Inject(DOCUMENT) private document: HTMLDocument, private formBuilder: FormBuilder) {
    this.createContactForm();
  }

  // Component Listeners
  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key == "@" && !this.showUserDropdown) {
      this.toggleUserDropdown()
    }

    if (this.showUserDropdown == true) {
      // only toggle on 'Escape' if dropdown is already open
      event.key == "Escape"
        ? this.toggleUserDropdown()
        : null // filter results by slice of comment eventually
    }
    console.log('Key pressed:', event.key);
  }

  // Component Data
  title = 'limble_cmms';
  showUserDropdown = false;
  // @ts-ignore
  comments: any[] = [];
  users = [
    {'userID' : 1, 'name' : 'Kevin'},
    {'userID' : 2, 'name' : 'Jeff'},
    {'userID' : 3, 'name' : 'Bryan'},
    {'userID' : 4, 'name' : 'Gabbey'},
  ];
  filteredUsers: any = [];
  commentForm!: FormGroup;
  targetCommentUsers: any[] = []; // This is not ideal, but it was a way to send the alert
  // without duplicating code that parses the comment

  // Call in constructor to initialize the form
  createContactForm() {
    this.commentForm = this.formBuilder.group({
      message: ['']
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
    this.commentForm.controls['message'].setValue('');
  };

  onSubmit() {
    this.saveComment(this.commentForm.value.message);
    this.sendAlerts();
    this.clearForm();
  };

  toggleUserDropdown() {
    this.showUserDropdown = !this.showUserDropdown;
  };

  // Clone value (to be safe) and insert a 'tag' into the field
  // Current limitations: Cannot handle multiple tags
  injectUserTag(user: any) {
    this.targetCommentUsers.push(user);
    let tag = encodeURI(`@${user.name}`);
    let clonedForm = structuredClone(this.commentForm.value);
    let newValue = clonedForm.message.replace('@', tag); // adjust to lastIndexOf
    this.commentForm.controls['message'].setValue(`${newValue} `);
    this.toggleUserDropdown();

    // Could not figure out how to use ViewChild in short amount of time
    setTimeout(() => {
      // @ts-ignore
      document.getElementById('message').focus()
    }, 0)
  }

  sendAlerts() {
    this.targetCommentUsers.forEach(user => {
      // MAKE API CALL HERE
      console.log(`Action: Alerting ${user.name} that a comment referencing them has been created`);
    });
  };
};