import { Component } from '@angular/core';
import { DataService } from '../shared/data.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {

  constructor(private dataService: DataService){}
  updateMeetings(){
    this.dataService.updateMeetings();
  }
  update(){
    this.dataService.update()
  }
}
