import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { DataService } from '../../shared/data.service';
import { UserService } from '../../shared/user.service';

@Component({
  selector: 'app-group-join',
  templateUrl: './group-join.component.html',
  styleUrls: ['./group-join.component.css']
})
export class GroupJoinComponent implements OnInit{

  constructor(private user: UserService,private route: ActivatedRoute, private router: Router,  private http: HttpClient, private dataService: DataService) { }

  ngOnInit(): void {
    console.log(this.route.snapshot.params['grp']);
    this.http.post(environment.SERVER + '/data/join/' + this.route.snapshot.params['grp'], null)
      .subscribe({
        next: data => { 
          console.log(data);
          this.dataService.update();
          setTimeout(() =>{
            this.router.navigate(['/groups']);
        }, 1000);},
        error: error => {
          if(error.error.message == 'User already in Group'){
            console.log('Error: User already in Group!!');
            this.dataService.update();
            setTimeout(() =>{
                this.router.navigate(['/groups']);
            }, 1000); 
          }
          if(error.error.message == 'Unauthorized'){
            this.user.logout();
          }
          else
            console.error('There was an error!', error);
      }});
  }
}
