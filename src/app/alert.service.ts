import { Injectable } from '@angular/core';
interface User {
    userID: number,
    name: string
}

@Injectable({
    providedIn: 'root'
})

export class AlertService {
    async sendAlerts(users: User[]) {
        const result = await fetch('127.0.0.1')
        users.forEach((user: User) => {
            // MAKE API CALL HERE
            console.log(`Action: Alerting ${user.name} that a comment referencing them has been created`);
        });
        return result
    }
}