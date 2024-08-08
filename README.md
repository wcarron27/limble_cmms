# LimbleCmms

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.1.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

---

## Evaluation
I had not worked with Angular before, so this was a bit of a challenge to simultaneously produce code and learn the framework. That said, I'd like to preemptively make some notes and explain decisions I made during the process.

- I chose to write a service to notify users that a comment 'tagged' them. Seeing as there is no login/session functionality, it simply logs out a sentence in the browser console, detailing to whom the alert would be sent to. In a more robust application, I would add a real logging system/service and more metadata (e.g. The Task ID, user ID, timestamps, etc.). A websocket based approach would be among my top choices for this functionality, as would a Job service (e.g Sidekiq in the Rails ecosystem).
- Again re: the alert service, I would have preferred to write a more elegant solution than an array in the component data, but I felt that the data structures I had written made this a more effective use of time.
- I left the CSS fairly simple, instead choosing to focus on the core functionality than tinkering with the UI. I decided to keep it mostly consistent with the screenshot provided, but not a complete replication.
- Due to my limited experience with Angular and again in the interest of time, I chose to keep almost everything in the `app.component.ts` file. There are obvious areas of the code that should be extracted into their own components (the comment form, mostly), which I would consider the highest priority, in terms of refactoring, if this were a ticket I were assigned at work.
