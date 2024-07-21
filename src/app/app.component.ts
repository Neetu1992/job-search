// Core module
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  RouterLinkActive,
  RouterModule,
  RouterOutlet,
} from '@angular/router';
// Third party library
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
// Common
import { HttpClientModule } from '@angular/common/http';
// Constant
import { CONSTANT } from '../constant';
// Model
import { Job, JobDescription } from './model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    RouterLinkActive,
    HttpClientModule,
    FontAwesomeModule,
    RouterOutlet,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  constant = CONSTANT;
  curDiv: string = '';
  favItem: Job[] = [];
  resData: Job[] = [];

  /**
   * Constructor
   */
  constructor() {
  }

  /**
   * Life cycle hook
   */
  ngOnInit(): void {
    this.curDiv = CONSTANT.Jobs;
  }

  /**
   * On click Tabs
   * @param data
   */
  openTab(data: string) {
    this.curDiv = data;
    this.favItem = [];
    if (this.curDiv === this.constant.Favorites) {
      let allData = JSON.parse(localStorage.getItem('jobData'));
      this.favItem = allData.filter((el) => el.isSelected);
    }
  }
}
