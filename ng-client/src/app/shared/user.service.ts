import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

    // ToDo: delete defaults
    public id:        string
    public username:  string
    public email:     string
    public jwt:       string
    
    constructor(){}

    login(username: string, password: string): void {
        console.log(`login(${username}, ${password})`)
    }
    register(username: string, email: string, password: string): void {
        console.log(`register(${username}, ${email}, ${password})`)
    }
}
