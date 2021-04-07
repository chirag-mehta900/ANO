import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddAddressComponent } from './add-address/add-address.component';
import { AddressComponent } from './address/address.component';
import { CommentComponent } from './comment/comment.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { MyServiceComponent } from './my-service/my-service.component';
import { ProfileComponent } from './profile.component';

const routes: Routes = [
  { path: '', component: ProfileComponent },
  { path: 'address', component: AddressComponent },
  { path: 'edit-user', component: EditUserComponent },
  { path: 'add-address', component: AddAddressComponent },
  { path: 'comment', component: CommentComponent },
  { path: 'service', component: MyServiceComponent },
  { path: 'profile/service', component: MyServiceComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {}
