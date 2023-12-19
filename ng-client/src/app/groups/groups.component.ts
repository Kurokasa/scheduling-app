import { Component } from '@angular/core';
import { DataService } from '../shared/data.service';
import { Group } from '../shared/group.model';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent {
    
    constructor(public dataService: DataService, private user: UserService) {}

    createEmptyGroup() {
        this.dataService.groups.push(new Group('','','',[{id: this.user.id, name: this.user.username, status: 'admin'}],[],[]));
        console.log(this.dataService.groups);
    }
}
