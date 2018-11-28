
import { Component, OnInit } from '@angular/core';
//import { StudentService } from './services/student.service';
import { ToastrService } from 'ngx-toastr';
import { routerTransition } from '../services/config.service';
import { StudentService } from '../services/student.service';
import { Router } from '@angular/router';
import { LocalDataSource } from 'ng2-smart-table';
import { debug } from 'util';
import { debounce } from 'rxjs/operators/debounce';

 @Component({
 	selector: 'app-student-list',
 	templateUrl: './student-list.component.html',
 	styleUrls: ['./student-list.component.css'],
 	animations: [routerTransition()],
 	host: {'[@routerTransition]': ''}
 })

 export class StudentListComponent implements OnInit {
	 minGrade: number ;
	 maxGrade: number ;
	 avgGrade: number;
	 sumOfGrade: number;
	source: LocalDataSource;
	title = 'Student Management';  
 	studentList:any;
 	studentListData:any;
 	constructor(private studentService:StudentService,private toastr: ToastrService,private router: Router) {
		this.source = new LocalDataSource();
	  }
 	// Call student list function on page load 
 	ngOnInit() {
 		this.getStudentList();
 	}

	
 	// Get student list from services
 	getStudentList(){
 		let studentList = this.studentService.getAllStudents();
		 this.success(studentList)
		 this.updateStatistics(studentList)
	 }
	 updateStatistics(studentList) {
		this.updateMaxGrade(studentList);
		this.updateMinGrade(studentList);
		this.updateAvgGrade(studentList);
	 } 
	 updateMaxGrade(studentlst) {
		this.maxGrade = studentlst.data[0].grade;
		for (var i = 0; i < studentlst.data.length; i++) {
			if (studentlst.data[i].grade>this.maxGrade) {
				this.maxGrade=studentlst.data[i].grade;
			}
		} 		
	 }
	 updateMinGrade(studentlst) {
		this.minGrade = studentlst.data[0].grade;
		for (var i = 0; i < studentlst.data.length; i++) {
			
			if (studentlst.data[i].grade<this.minGrade) {
				this.minGrade=studentlst.data[i].grade;
			}
		} 		
	 }
	 updateAvgGrade(studentlst) {
		this.sumOfGrade = 0;
		for (var i = 0; i < studentlst.data.length; i++) {
			this.sumOfGrade += +studentlst.data[i].grade;			
		}
		this.avgGrade = this.sumOfGrade !== 0 ?    this.sumOfGrade / studentlst.data.length : 0;
	 }

 	// Get student list success
 	success(data){
		 this.studentListData = data.data;
		 debugger;
		 this.source.load(data.data);
 		for (var i = 0; i < this.studentListData.length; i++) {
 			this.studentListData[i].name = this.studentListData[i].first_name ;
 		}
 	}

 	
	 onDeleteConfirm(event) {
		if (window.confirm('Are you sure you want to delete?')) { 
			let studentDelete = this.studentService.deleteStudent(event.data.id);
			if(studentDelete) {
				event.confirm.resolve(event.newData);
				this.getStudentList();
			}
			
		}
		else {
			event.confirm.reject();
		}
	 }
	 onSaveConfirm(event) {
		if(event.newData && event.newData.first_name && event.newData.grade && this.isNumber(event.newData.grade) && this.isLessThan100(event.newData.grade) ) {
			if (window.confirm('Are you sure you want to save?')) { 
				let studentRegister = this.studentService.doRegisterStudent(event.newData, event.newData.id);
				if(studentRegister) {
					if (studentRegister.code == 200) {
						event.confirm.resolve(event.newData);
						this.getStudentList();
					}else{
						
					}
				}
			}
		 }
		 else {
			event.confirm.reject();
		  }
	 }

	 onCreateConfirm(event){
		 if(event.newData && event.newData.first_name && event.newData.grade && this.isNumber(event.newData.grade) && this.isLessThan100(event.newData.grade) ) {
			if (window.confirm('Are you sure you want to create?')) { 
				let studentRegister = this.studentService.doRegisterStudent(event.newData, null);
				if(studentRegister) {
					if (studentRegister.code == 200) {
						let studentList = this.studentService.getAllStudents();
		 				//this.success(studentList);
		 				this.updateStatistics(studentList);
						event.confirm.resolve(event.newData);
						
					}else{
						
					}
				}
			}
		 }
		 else {
			event.confirm.reject();
		  }

	 }
	 isNumber(n) {
		return !isNaN(parseFloat(n)) && isFinite(n);
	  }
	  isLessThan100(n) {
		return n <= 100;
	  }

	 settings = {
		sort: false,
		// actions: {
		//   delete: true,
		// },
		rowClassFunction: (row) => {
			
			if (row.cells[1].value < 65)  {
				return 'w3-text-red';
			} else {
				return 'w3-text-green';
			}
			
		  },
		add: {
		  confirmCreate: true,
	
		  filter: false, // use it if you want to disable the flter for every column.
		},
		edit: {
		  confirmSave: true,
		},
		delete: {
			confirmDelete: true,
		  },
		columns: {
			first_name: {
			title: 'Name',
	
		  },
		
		  grade: {
			title: 'Grade'
		  },
		  
		}
	  };
 }

