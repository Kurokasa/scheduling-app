import { Component } from '@angular/core';
import { DataService } from './shared/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'schedule-app';

  constructor(private dataService: DataService) {}
  onScroll(event: any){
    if (event.target.offsetHeight + event.target.scrollTop >= event.target.scrollHeight)
      this.dataService.addMeetings();
  }
}
