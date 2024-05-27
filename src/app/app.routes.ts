import { Routes } from '@angular/router';
import { MainpageComponent } from './mainpage/mainpage.component';
import { AboutComponent } from './about/about.component';
import { JobsComponent } from './jobs/jobs.component';
import { ClientsComponent } from './clients/clients.component';
import { EmployersComponent } from './employers/employers.component';
import { ContactComponent } from './contact/contact.component';

import { ErrorsComponent } from './errors/errors.component';
import { userdata } from './usermodel';
import { UserdataComponent } from './userdata/userdata.component';
import { UpdateComponent } from './update/update.component';



export const routes: Routes = [

    {path:'home', component:MainpageComponent},
    {path:'about', component:AboutComponent},
    {path:'job', component:JobsComponent},
    {path:'client', component:ClientsComponent},
    {path:'contact', component:ContactComponent},
    {path:'employee', component:EmployersComponent},
    {path:'userdata', component:UserdataComponent},
    {path:'', component:MainpageComponent},
    {path:'update/:id',component:UpdateComponent},
    {path:'error', component:ErrorsComponent},
    {path:'**', component:ErrorsComponent}

];
