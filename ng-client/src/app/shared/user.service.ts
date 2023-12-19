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
    
    constructor(private http: HttpClient){
        this.jwt = localStorage.getItem('jwt');
        this.id = localStorage.getItem('id');
        this.username = localStorage.getItem('username');
        this.email = localStorage.getItem('email');
    }

    login(email: string, password: string): void {
        this.http.post(environment.SERVER + '/auth/login', {email, password})
            .subscribe( (resp) => {
                this.jwt = resp['access_token']
                localStorage.setItem('jwt', this.jwt);
                localStorage.setItem('username', resp['username']);
                localStorage.setItem('email', resp['email']);
                localStorage.setItem('id', resp['id']);
                console.log(this.jwt)
                this.http.get(environment.SERVER + '/data/user').subscribe( (user) => {
                    this.id = user['id'];
                    this.username = resp['username'];
                    this.email = resp['email'];
                })
            })
    }

    logout(): void {
        localStorage.removeItem('jwt');
        localStorage.removeItem('username');
        localStorage.removeItem('email');
        localStorage.removeItem('id');
        this.id = null;
        this.username = null;
        this.email = null;
        this.jwt = null;
    }

    register(username: string, email: string, password: string): void {
        this.http.post(environment.SERVER + '/auth/signup', {username, email, password})
            .subscribe( (resp) => {
                this.jwt = resp['access_token']
                localStorage.setItem('jwt', this.jwt);
                localStorage.setItem('username', resp['username']);
                localStorage.setItem('email', resp['email']);
                localStorage.setItem('id', resp['id']);
                this.http.get(environment.SERVER + '/data/user').subscribe( (user) => {
                    this.id = user['id']
                    this.username = resp['username']
                    this.email = resp['email']
                })
            })
    }
}
