// Core module
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
// Common
import { HttpClient } from '@angular/common/http';
// Model
import { JobDescription } from '../model';

@Component({
  selector: 'app-job-description',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './job-description.component.html',
  styleUrl: './job-description.component.css',
})
export class JobDescriptionComponent implements OnInit {
  jobDescription: JobDescription;

  /**
   * Constructor
   * @param ActivatedRoute(route)
   * @param HttpClient(http)
   */
  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  /**
   * Life cycle hook
   */
  ngOnInit(): void {
    let id = this.route.snapshot.params['id'];
    this.http.get(`/jobs/${id}`).subscribe((data: JobDescription) => {
      this.jobDescription = data;
    });
  }
}
