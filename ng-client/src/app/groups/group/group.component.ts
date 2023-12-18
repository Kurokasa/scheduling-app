import { Component, Input } from '@angular/core';
import { Group } from '../../shared/group.model';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent {
  @Input() group: Group;
}
