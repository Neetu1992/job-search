import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { JobDescriptionComponent } from './job-description/job-description.component';
import { JobsComponent } from './jobs/jobs.component';

export const routes: Routes = [
  { path: '', redirectTo: 'jobs', pathMatch: 'full' },
  { path: 'jobs', component: JobsComponent },
  { path: 'job/:id', component: JobDescriptionComponent },
  { path: '**', redirectTo: 'jobs' },
];
