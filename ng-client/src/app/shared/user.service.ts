import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

    // ToDo: delete defaults
    public id:        string
    public username:  string
    public email:     string
    public jwt:       string
    
    constructor(private http: HttpClient){}

    login(email: string, password: string): void {
        this.http.post(environment.SERVER + '/auth/login', {email, password})
            .subscribe( (resp) => {
                this.jwt = resp['access_token']
                console.log(this.jwt)
                this.http.get(environment.SERVER + '/data/user').subscribe( (user) => {
                    this.id = user['id'];
                    this.username = resp['username'];
                    this.email = resp['email'];
                })
            })
    }
    register(username: string, email: string, password: string): void {
        this.http.post(environment.SERVER + '/auth/signup', {username, email, password})
            .subscribe( (resp) => {
                this.jwt = resp['access_token']
                this.http.get(environment.SERVER + '/data/user').subscribe( (user) => {
                    this.id = user['id']
                    this.username = resp['username']
                    this.email = resp['email']
                })
            })
    }
}
