import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Group } from '../../shared/group.model';
import { DataService } from '../../shared/data.service';
import { environment } from '../../../environments/environment';
import { UserService } from '../../shared/user.service';

@Component({
  selector: 'app-group-edit',
  templateUrl: './group-edit.component.html',
  styleUrls: ['./group-edit.component.css']
})
export class GroupEditComponent implements OnInit{

  @Input() group: Group;
  isAdmin = false;
  joinLink = environment.FRONTEND + '/group/join/';

  constructor(private dataService: DataService, private user: UserService) {}

  ngOnInit(): void {
    this.joinLink = this.joinLink + this.group.id;
    this.group.members.forEach(member => {
      if (member.status === 'admin' && member.id === this.user.id)
        this.isAdmin = true;
    });
  }

  copyLink(text){
    console.log(text);
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
  }

  leaveGroup(){
    this.dataService.leaveGroup(this.group.id);
  }

  save(){
    console.log('saving: ', this.group);
    if (this.group.name !== '' && this.group.id)
      this.dataService.updateGroup(this.group);
  }
}
