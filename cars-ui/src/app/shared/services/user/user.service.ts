import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

declare var localStorage : any;

@Injectable()
export class UserService {
    subject = new Subject<any>();

    updateUser() {
        let loggedInUser = localStorage.getItem("user");
        console.log(loggedInUser, "loggedInUser");
        this.subject.next(loggedInUser);
    }

    clearMessage() {
        this.subject.next();
    }

    getUpdatedUser(): Observable<any> {
        console.log(this.subject, "this.subject");
        return this.subject.asObservable();
    }
}