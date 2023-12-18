import { Component, OnInit } from '@angular/core';
import { DataService } from '../shared/data.service';

@Component({
  selector: 'app-date-list',
  templateUrl: './date-list.component.html',
  styleUrls: ['./date-list.component.css']
})
export class DateListComponent implements OnInit{
  today: Date;

  constructor(public dataService: DataService){
    this.today = new Date();
    this.today.setDate(this.today.getDate() + 1);
  }

  ngOnInit(): void {
    this.dataService.update();
  }
}
