// Angular core
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
import { HttpClient, HttpClientModule } from '@angular/common/http';
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
  allData: Job[] = [];
  constant = CONSTANT;
  curDiv: string = '';
  favItem: Job[] = [];
  jobDescription: JobDescription;
  resData: Job[] = [];

  /**
   * Constructor
   * @param HttpClient(http)
   */
  constructor(private http: HttpClient) {}

  /**
   * Life cycle hook
   */
  ngOnInit(): void {
    this.curDiv = CONSTANT.Jobs;

    let jobData = localStorage.getItem('jobData');

    if (!jobData) {
      this.http.get('/jobs').subscribe((data: Array<Job>) => {
        this.resData = data;
        this.resData.forEach((obj: Job) => {
          obj.isSelected = false; // Add a new key-value pair
        });
        this.allData = this.resData;
        localStorage.setItem('jobData', JSON.stringify(this.allData));
      });
    } else {
      this.allData = JSON.parse(jobData);
    }
  }

  /**
   * Convert string to boolean
   * @param value
   * @returns
   */
  parseBoolean(value: string): boolean {
    if (value) {
      return value.toLowerCase() === 'true';
    }
    return false;
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
