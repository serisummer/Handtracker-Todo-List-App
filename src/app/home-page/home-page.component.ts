import { Component, OnInit } from '@angular/core';
import { PredictionEvent } from '../prediction-event';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  gesture: String = "";
  selected: number | null;
  count: number = 0;
  id: number = 0;
  tasks: {label: string, checked: boolean, id: number; }[] = [];
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
    if (this.gesture == "Open Close") {
      this.sortById();
    }
    if (this.gesture == "Open Point") {
      this.sortByCompletionStatus();
    }
  }

  addTask(){
    this.count++;
    this.id++;
    let task = { label: 'Task ' + this.id.toString(), checked: false, id: this.id };
    this.tasks.push(task);
    this.selected = task.id;
  }

  selectTask(){
    let index = this.tasks.findIndex(task => task.id == this.selected);
    if (index + 1 == this.count) {
      this.selected = this.tasks[0].id;
    }
    else {
      this.selected = this.tasks[index + 1].id;
    }
  }

  checkTask() {
    let task = this.tasks.find(task => task.id == this.selected);
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
    let index = this.tasks.findIndex(task => task.id == this.selected);
    this.count--;
    if (this.count == 0) {
      this.selected = null;
    }
    else {
      if (index == 0) {
        this.selected = this.tasks[index + 1].id;
      }
      else {
        this.selected = this.tasks[index - 1].id;
      }
    }
    this.tasks.splice(index, 1);
  }

  clearSchedule() {
    this.count = 0;
    this.tasks = [];
    this.selected = null;
  }

  sortById() {
    this.tasks.sort((a, b) => a.id - b.id);
    this.selected = this.tasks[0].id;
  }

  sortByCompletionStatus() {
    this.tasks.sort((a, b) => (a.checked === b.checked) ? 0 : (a.checked ? 1 : -1));
    this.selected = this.tasks[0].id;
  }

}
