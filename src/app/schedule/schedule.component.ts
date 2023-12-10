import { Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit{
  @Input() gesture: String;
  @Output() userInput: EventEmitter<string> = new EventEmitter<string>();

  tasks = [
    { label: 'Item 1', checked: false },
    { label: 'Item 2', checked: false },
    { label: 'Item 3', checked: false },
  ];

  ngOnInit(): void {
  }

  addTask() {
    this.tasks.push({label: 'Item 4', checked: false});
  }

  onInput() {
    this.userInput.emit(this.gesture.toString());
  }

}
