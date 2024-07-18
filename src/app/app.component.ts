// Angular core
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';
// Component
import { JobDescriptionComponent } from './job-description/job-description.component';
// Constant
import { CONSTANT } from '../constant';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    RouterModule,
    RouterLinkActive,
    HttpClientModule,
    FontAwesomeModule,
    JobDescriptionComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  allData: any;
  constant = CONSTANT;
  curDiv: string = '';
  favItem: any = [];
  isClicked: string = '';
  isParentVisible = true;
  isChildVisible = false;
  jobDescription: any = [];
  resData: any = [];

  /**
   * Constructor
   * Router(route)
   */
  constructor(private http: HttpClient) {}

  /**
   * Life cycle hook
   */
  ngOnInit(): void {
    this.http.get('/jobs').subscribe((data) => {
      this.resData = data;
      this.resData.forEach((obj: any) => {
        obj.isSelected = false; // Add a new key-value pair
      });
      this.allData = this.resData;
    });
    this.curDiv = CONSTANT.Jobs;
    localStorage.setItem(CONSTANT.FavItem, JSON.stringify(this.favItem));
  }

  /**
   * On click Tabs
   * @param data
   */
  openTab(data: string) {
    this.curDiv = data;
  }

  /**
   * On Click star icon
   * @param data
   */
  addFav(data: any) {
    if (data.isSelected) {
      data.isSelected = false;
      let item = this.favItem.findIndex((el: any) => el.id === data.id);
      this.favItem.splice(item, 1);
      localStorage.setItem(CONSTANT.FavItem, JSON.stringify(this.favItem));
    } else {
      data.isSelected = true;
      let favItems = localStorage.getItem(CONSTANT.FavItem) ?? '';
      this.favItem = JSON.parse(favItems);
      this.favItem.push(data);
      localStorage.setItem(CONSTANT.FavItem, JSON.stringify(this.favItem));
    }
  }

  /**
   * On click get job id
   * @param data
   */
  getJobId(id: any) {
    this.isParentVisible = false;
    this.isChildVisible = true;
    this.http.get(`/jobs/${id}`).subscribe((data: any) => {
      this.jobDescription = data;
    });
  }

  /**
   * Show hide job description
   */
  gotoJobs() {
    this.isParentVisible = true;
    this.isChildVisible = false;
  }
}
