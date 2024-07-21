// Core modules
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
// COnstant
import { CONSTANT } from '../../constant';
// Model
import { Job, JobDescription } from '../model';
// Common
import { CommonModule } from '@angular/common';

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
   */
  constructor() {}

  /**
   * Life cycle hook
   */
  ngOnInit(): void {
    this.allData = JSON.parse(localStorage.getItem('jobData'));
  }

  /**
   * On Click star icon
   * @param data
   */
  addFav(data: Job) {
    if (data.isSelected) {
      data.isSelected = false;
      let index = this.allData.findIndex((el:Job) => el.id === data.id);
      this.allData[index].isSelected = false;
      localStorage.setItem('jobData', JSON.stringify(this.allData));

    } else {
      data.isSelected = true;
      let index = this.allData.findIndex((el:Job) => el.id === data.id);
      this.allData[index].isSelected = true;
      localStorage.setItem('jobData', JSON.stringify(this.allData));
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
