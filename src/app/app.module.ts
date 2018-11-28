import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { StudentService } from './services/student.service';
import { ToastrModule } from 'ngx-toastr';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StudentListComponent } from './list/student-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Ng2SmartTableModule } from 'ng2-smart-table';

const routes : Routes = [
  {
    path: '',
    redirectTo: '/list', pathMatch: 'full' 
  },
  {
    path: 'list',
    component: StudentListComponent
  },
  
  
  
  ];

@NgModule({
  declarations: [
    AppComponent,StudentListComponent
  ],
  imports: [
    RouterModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    BrowserModule,ToastrModule.forRoot({ 
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
    Ng2SmartTableModule
    
  ],
  providers: [StudentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
