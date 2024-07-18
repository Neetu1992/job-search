import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-job-description',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './job-description.component.html',
  styleUrl: './job-description.component.css',
})
export class JobDescriptionComponent implements OnInit {
  title: string = '';
  @Input('data') data: any;

  constructor() {}

  ngOnInit(): void {

  }
}
