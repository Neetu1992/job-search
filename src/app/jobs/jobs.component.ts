// Core module
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
// Constant
import { CONSTANT } from '../../constant';
// Model
import { Job, JobDescription } from '../model';
// Common
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-jobs',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './jobs.component.html',
  styleUrl: './jobs.component.css',
})
export class JobsComponent implements OnInit {
  allData: Job[] = [];
  constant = CONSTANT;
  isParentVisible: boolean = true;
  isChildVisible = false;
  jobDescription: JobDescription;

  /**
   * Constructor
   * @param HttpClient(http)
   */
  constructor(private http: HttpClient) {
  }

  /**
   * Life cycle hook
   */
  ngOnInit(): void {
    let jobData = localStorage.getItem(this.constant.jobData);
    if (!jobData) {
      this.http.get('/jobs').subscribe((data: Array<Job>) => {
        let resData = data;
        resData.forEach((obj: Job) => {
          obj.isSelected = false; // Add a new key-value pair
        });
        this.allData = resData;
        localStorage.setItem(this.constant.jobData, JSON.stringify(this.allData));
      });
    } else {
      this.allData = JSON.parse(jobData);
    }
  }

  /**
   * On Click star icon
   * @param data
   */
  addFav(data: Job) {
    if (data.isSelected) {
      let index = this.allData.findIndex((el: Job) => el.id === data.id);
      this.allData[index].isSelected = false;
      localStorage.setItem(this.constant.jobData, JSON.stringify(this.allData));
    } else {
      let index = this.allData.findIndex((el: Job) => el.id === data.id);
      this.allData[index].isSelected = true;
      localStorage.setItem(this.constant.jobData, JSON.stringify(this.allData));
    }
  }

  /**
   * Show hide job description
   */
  gotoJobs() {
    this.isParentVisible = !this.isParentVisible;
    this.isChildVisible = !this.isChildVisible;
  }
}
