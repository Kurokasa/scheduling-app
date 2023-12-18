import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-msg-box',
  templateUrl: './msg-box.component.html',
  styleUrls: ['./msg-box.component.css']
})
export class MsgBoxComponent {
  @Input() headline: string;
  @Input() msg: string;
  @Output() accepted = new EventEmitter();

  resolve(result: boolean){
    this.accepted.emit(result);
  }
}
