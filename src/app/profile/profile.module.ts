import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { AddressComponent } from './address/address.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { AddAddressComponent } from './add-address/add-address.component';
import { MyServiceComponent } from './my-service/my-service.component';
import { CommentComponent } from './comment/comment.component';
import { SharedModule } from 'src/@theme/shared.module';


@NgModule({
  declarations: [ProfileComponent, AddressComponent, EditUserComponent, AddAddressComponent, MyServiceComponent, CommentComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    SharedModule
  ]
})
export class ProfileModule { }
