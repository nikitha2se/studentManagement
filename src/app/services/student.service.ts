
 import { Injectable } from '@angular/core';
import { debug } from 'util';

 @Injectable()
 export class StudentService {

   constructor() { }

   // Get all students list via API or any data storage
   getAllStudents(){
     let studentList:any;
     if(localStorage.getItem('students') && localStorage.getItem('students') != '') {
       studentList = {
         code : 200,
         message : "Students List Fetched Successfully",
         data : JSON.parse(localStorage.getItem('students'))
       }
     }
     else{
        this.getStudentData();
       studentList = {
         code : 200,
         message : "Students List Fetched Successfully",
         data : JSON.parse(localStorage.getItem('students'))
       }
     }
     return studentList;
   }
   getStudentData(){
    localStorage.setItem('students', JSON.stringify(this.studentsList));
   }


   doRegisterStudent(data, index){
     let studentList = JSON.parse(localStorage.getItem('students'));
     let returnData;
     console.log("index", index);
     if(index != null) {
      studentList.find(x => x.id === index).first_name = data.first_name;
      studentList.find(x => x.id === index).grade = data.grade;
       localStorage.setItem('students',JSON.stringify(studentList));
       returnData = {
         code : 200,
         message : "Student Successfully Updated",
         data : JSON.parse(localStorage.getItem('students'))
       }    
     }else{      
       data.id = this.generateRandomID();
       
       studentList.unshift(data);

       localStorage.setItem('students',JSON.stringify(studentList));

       returnData = {
         code : 200,
         message : "Student Successfully Added",
         data : JSON.parse(localStorage.getItem('students'))
       }    
     }
     return returnData;
   }

   deleteStudent(index:number){
     let studentList = JSON.parse(localStorage.getItem('students'));

     //studentList.splice(index, 1);
    studentList =  this._removeValue(studentList,index);
     localStorage.setItem('students',JSON.stringify(studentList));

     let returnData = {
       code : 200,
       message : "Student Successfully Deleted",
       data : JSON.parse(localStorage.getItem('students'))
     }

     return returnData;
   }
   _removeValue = function(arr, x) {
    return arr.filter(function(n){ return n.id !==x });    
  }


   getStudentDetails(index:number){
     let studentList = JSON.parse(localStorage.getItem('students'));

     let returnData = {
       code : 200,
       message : "Student Details Fetched",
       studentData : studentList[index]
     }

     return returnData;
   }


   generateRandomID() {
     var x = Math.floor((Math.random() * Math.random() * 9999));
     return x;
   }

   studentsList = [
	{	
		id : 1,
		first_name : "Neelima",
		grade : 90
	},
	{
		id : 2,
		first_name : "Nimish",
		grade : 80
	},
	{
		id : 3,
		first_name : "Tina",
		grade : 80
	},
	{
		id : 4,
		first_name : "John",
		grade : 70
	},
	{
		id : 5,
		first_name : "Peter",
		grade : 50
	}
	];
 }