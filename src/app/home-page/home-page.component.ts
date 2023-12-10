import { Component, OnInit } from '@angular/core';
import { PredictionEvent } from '../prediction-event';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  gesture: String = "";
  selected: string = "";
  count: number = 0;
  tasks: {label: string, checked: boolean; }[] = [];
  constructor() { }

  ngOnInit(): void {
  }

  prediction(event: PredictionEvent){
    this.gesture = event.getPrediction();
    if (this.gesture == "Open Hand") {
      this.addTask();
    }
    if (this.gesture == "Hand Pointing") {
      this.selectTask();
    }
    if (this.gesture == "Hand Pinching") {
      this.checkTask();
    }
    if (this.gesture == "Closed Hand" && this.count > 0) {
      this.removeTask();
    }
    if (this.gesture == "Two Closed Hands") {
      this.clearSchedule();
    }
  }

  addTask(){
    this.count++;
    let task = { label: 'Task ' + this.count.toString(), checked: false };
    this.tasks.push(task);
    this.selected = task.label;
  }

  selectTask(){
    let index = this.tasks.findIndex(task => task.label == this.selected);
    if (index + 1 == this.count) {
      this.selected = this.tasks[0].label;
    }
    else {
      this.selected = this.tasks[index + 1].label;
    }
  }

  checkTask() {
    let task = this.tasks.find(task => task.label == this.selected);
    if (task) {
      if (task.checked) {
        task.checked = false;
      }
      else {
        task.checked = true;
      }
    }
  }

  removeTask() {
    let index = this.tasks.findIndex(task => task.label == this.selected);
    this.count--;
    if (this.count == 0) {
      this.selected = "";
    }
    else {
      if (index == 0) {
        this.selected = this.tasks[index + 1].label;
      }
      else {
        this.selected = this.tasks[index - 1].label;
      }
    }
    this.tasks.splice(index, 1);
  }

  clearSchedule() {
    this.count = 0;
    this.tasks = [];
    this.selected = "";
  }

}
