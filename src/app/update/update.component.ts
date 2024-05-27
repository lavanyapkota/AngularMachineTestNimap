import { Component, NgModule } from '@angular/core';
import { ActivatedRoute, Params, RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule, NgIf, NgStyle } from '@angular/common';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { userdata } from '../usermodel';


@Component({
  selector: 'app-update',
  standalone: true,
  imports: [RouterLink,NgStyle,CommonModule,ReactiveFormsModule,RouterOutlet,HttpClientModule,NgIf],
  templateUrl: './update.component.html',
  styleUrl: './update.component.css'
})
export class UpdateComponent {

  show:boolean=false;

  registrationForm: FormGroup;
  photoError: string | null = null;
  // photo1:any;
  addressType: string | null = null;
  userPhoto: string | ArrayBuffer | null = null;

  constructor(private activeRoute:ActivatedRoute, private fb: FormBuilder, private userService:UserService,private router:Router) {
    this.registrationForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: [''],
      email: [''],
      mobile: [''],
      photo1: [null],
      age: [20, [ Validators.min(20), Validators.max(60)]],
      address:[''],
      tags:[''],
      selectedOption: [''],
      selectedOption1: [''],
      addressType: [''],
      address1: [''],
      address2: [''],
      companyAddress1: [''],
      companyAddress2: ['']
    });
  }

  dataid:any;
  public users:userdata={} as userdata;

  ngOnInit():void{
    this.activeRoute.paramMap.subscribe((param:Params)=>{
      this.dataid=param['get']('id');
      console.log("id is",this.dataid);
    })
    this.userService.getUserById(this.dataid).subscribe((data:any)=>{
      this.users=data;
      console.log(this.users);
    })
  }
  
  url: any; 
  msg = "";

  usersArr:any=[]

  private changeResult=20;
  private dragResult=60;


  showForm(){
    this.show=!this.show
  }

 
    public changeFunction(event:any){
      this.changeResult=parseFloat(event.target.value);
    }
    
  

  // Image
  photo1:string='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png';

  selectFile(e:any){
    if(!e.target.files[0] || e.target.files[0].length==0){
      this.msg='Upload your profile!!';
      return;
    }
    var mimeType=e.target.files[0].type;

    if(mimeType.match(/image\/*/)==null){
      this.msg="Only images are supported!!"
      return;
    }
    if(e.target.files){
      var reader=new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload=(event:any)=>{
        this.msg=""
        this.photo1=event.target.result;
      }
    }
  }
  
  
  // Address Function

  onAddressTypeChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const addressType = selectElement.value;
    this.addressType = addressType;

    if (addressType === 'Home') {
      this.registrationForm.addControl('address1', this.fb.control(''));
      this.registrationForm.addControl('address2', this.fb.control(''));
      this.registrationForm.removeControl('companyAddress1');
      this.registrationForm.removeControl('companyAddress2');
    } else if (addressType === 'Company') {
      this.registrationForm.addControl('companyAddress1', this.fb.control(''));
      this.registrationForm.addControl('companyAddress2', this.fb.control(''));
      this.registrationForm.removeControl('address1');
      this.registrationForm.removeControl('address2');
    }
  }


  //  Hobbies to do list
  list:any[]=[];
  addTask(item:string)
  {
    this.list.push({id:this.list.length,name:item})
    console.log(this.list)
  }
  removeTask(id:number){
    console.log(id)
    this.list=this.list.filter(item=>item.id!==id)
  }

  // form update 
  update(){
    this.userService.updateUser(this.users,this.dataid).subscribe((data:any)=>{
      this.router.navigate(['/userdata']);
    })
  }
  

}

