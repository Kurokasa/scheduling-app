import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Group } from '../../shared/group.model';
import { DataService } from '../../shared/data.service';

@Component({
  selector: 'app-group-edit',
  templateUrl: './group-edit.component.html',
  styleUrls: ['./group-edit.component.css']
})
export class GroupEditComponent implements OnInit{

  group: Group;

  constructor(private dataService: DataService, private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.group = this.dataService.getGroup(this.route.snapshot.params['grp']);
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
}
