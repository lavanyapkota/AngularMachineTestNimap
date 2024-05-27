import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { CommonModule, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { userdata } from '../usermodel';


@Component({
  selector: 'app-userdata',
  standalone: true,
  imports: [CommonModule,RouterLink,RouterOutlet],
  
  templateUrl: './userdata.component.html',
  styleUrl: './userdata.component.css'
})
export class UserdataComponent {
  user: any;
  imageSrc: any;
  lastRecord:any;
  url: any; 
  msg = "";
  photoError: string | null = null;
  // photo1:any;
  // Image
  photo1:string='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png';

  constructor( private api:UserService, private http:HttpClient) {}

  // ngOnInit() {
  //   this.user = this.userService.getUser();
  // }
 

  ngOnInit():void {
    // this.getUser();
    this.api.getUser().subscribe(data => {
      if (Array.isArray(data) && data.length > 0) {
        this.user = data[data.length - 1];
      }
    });
  }
  // selectFile(event: any):void { 
	// 	if(!event.target.files[0] || event.target.files[0].length == 0) {
	// 		// this.msg = 'You must select an image';
	// 		return;
	// 	}
  //   const file = (event.target as HTMLInputElement).files?.[0];
  //   if (file) {
  //     const img = new Image();
  //     img.src = URL.createObjectURL(file);

  //     img.onload = () => {
  //       if (img.width === 310 && img.height === 310) {
  //         const reader = new FileReader();
  //         reader.onload = () => {
  //           this.photo1 = reader.result;
  //           this.photoError = null;
  //         };
  //         reader.readAsDataURL(file);
  //       } else {
  //         this.photoError = 'Photo must be 310x325 pixels';
  //         this.photo1 = null;
  //       }
  //     };   
  //   }
    
	// 	var reader = new FileReader();
	// 	reader.readAsDataURL(event.target.files[0]);
		
	// 	reader.onload = (_event) => {
	// 		this.msg = "";
	// 		this.url = reader.result; 
  //     		}
          
  //     this.photo1=event.target.files[0]

  // }
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.user.photo1 = e.target.result;  // Assuming base64 string for simplicity
        this.api.setUser(this.user);  // Update the user data in the service
      };
      reader.readAsDataURL(file);
    }
  }
}