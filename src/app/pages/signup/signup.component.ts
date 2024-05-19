import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { User } from '../../shared/models/User';
import { AuthService } from '../../shared/services/auth.service';
import { UserService } from '../../shared/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent implements OnInit {

  // signUpForm = new FormGroup({
  //   email: new FormControl(''),
  //   password: new FormControl(''),
  //   rePassword: new FormControl(''),
  //   name: new FormGroup({
  //     firstname: new FormControl(''),
  //     lastname: new FormControl('')
  //   })
  // });

  signUpForm = this.createForm({
    id: '',
    email: '',
    // password: '',
    name: { firstname: '', lastname: '' }
  })

  passwordsMatch: boolean = true;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private location: Location,
    private authService: AuthService, private userService: UserService,
    private router: Router) { }

  ngOnInit(): void { }

  createForm(model: User) {
    // return this.fb.group(model);
    return this.fb.group({
      email: [model.email, Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rePassword: ['', Validators.required],
      name: this.fb.group({
        firstname: [model.name.firstname, Validators.required],
        lastname: [model.name.lastname, Validators.required]
      })
    });
  }

  goBack() {
    this.location.back();
  }


  onSubmit() {
    if (!this.signUpForm.valid) {
      this.errorMessage = "Fill all cells!"
    }
    if (this.signUpForm.valid && this.signUpForm.value.password === this.signUpForm.value.rePassword) {
      this.authService.signup(this.signUpForm.get('email')?.value as string, this.signUpForm.get('password')?.value as string)
        .then(cred => {
          const user: User = {
            id: cred.user?.uid as string,
            email: this.signUpForm.get('email')?.value as string,
            name: {
              firstname: this.signUpForm.get('name.firstname')?.value as string,
              lastname: this.signUpForm.get('name.lastname')?.value as string
            }
          };
          this.userService.create(user).then(_ => {
            console.log('User added successfully');
            this.router.navigateByUrl('/main');
          }).catch(error => {
            console.error(error);
          })


        })
        .catch(error => {
          console.error(error);
        });
    } else {
      this.passwordsMatch = false;
    }
  }
}
