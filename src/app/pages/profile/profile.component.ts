// profile.component.ts

import { Component, OnInit } from '@angular/core';
import { User } from '../../../app/shared/models/User';
import { UserService } from '../../shared/services/user.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {

  user?: User;
  updatedUser?: User;

  profileForm = new FormGroup({
    email: new FormControl(''),
    name: new FormGroup({
      firstname: new FormControl(''),
      lastname: new FormControl('')
    })
  });

  constructor(private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private authService: AuthService
  ) {

  }

  ngOnInit(): void {
    const userr = JSON.parse(localStorage.getItem('user') as string) as firebase.default.User;
    this.userService.getById(userr.uid as string).subscribe(data => {
      this.user = data[0];
      this.profileForm.patchValue({
        email: this.user?.email,
        name: {
          firstname: this.user?.name.firstname,
          lastname: this.user?.name.lastname
        }
      });
    }, error => {
      console.error(error);
    });
  }

  createForm(model: User) {
    return this.fb.group({
      id: [model.id],
      email: [model.email],
      name: this.fb.group({
        firstname: [model.name.firstname],
        lastname: [model.name.lastname]
      })
    });
  }

  /*saveProfileData() {
    console.log(this.profileForm.value);

    //this.updatedUser.name.firstname = this.profileForm.get('name.firstname')?.value as string;
    //console.log(this.updatedUser)
    if (this.profileForm.valid) {
      //const updatedUser = this.profileForm.value;
      this.updateUser(this.updatedUser as User);
    }
  }*/

  /*updateUserProfile(user: User) {
    this.userService.update(user).then(() => {
      console.log('User profile updated successfully');
      //window.location.reload();
    }).catch(error => {
      console.error('Error updating user profile:', error);
    });
  }*/

  /* updateUser(user: User): void {
     // Modify the user object here
 
     user.name.firstname = this.profileForm.get('name.firstname')?.value as string,
       //user.name.firstname = this.profileForm.get('name.firstname') as string;
       //user.name.lastname = 'New Last Name';
 
       // Call the update function
       this.userService.update(user).then(() => {
         console.log('User updated successfully!');
       }).catch(error => {
         console.error('Error updating user:', error);
       });
   }*/

  deleteProfile() {
    this.userService.delete(this.user?.id as string).then(() => {
      console.log('User profile deleted successfully');
      this.authService.logout();
      this.router.navigateByUrl('/login');
    }).catch(error => {
      console.error('Error deleting user profile:', error);
    });

  }
}
