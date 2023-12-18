import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

    // ToDo: delete defaults
    public id:        string
    public username:  string
    public email:     string
    public jwt:       string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI0NDdlZmYzNy0yZDhkLTQwOTYtYjYzNy00NmVmOGFhNmIxZGIiLCJpYXQiOjE3MDI1Mzk1MjUsImV4cCI6MTcwMjYyNTkyNX0.zc5800F4E2QoXRimFxj1GOQoHye-NfHZEhD-W_ikRHo'

    constructor(){}
}
