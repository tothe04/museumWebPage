import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FakeLoadingService } from '../../shared/services/fake-loading.service';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit, OnDestroy {

  email = new FormControl('');
  password = new FormControl('');

  loginForm = this.fb.group({
    email: [],
    password: []
  });

  loadingSubscription?: Subscription;
  loadingObservation?: Observable<boolean>;

  loading: boolean = false;

  constructor(private router: Router, private fb: FormBuilder,
    private loadingService: FakeLoadingService,
    private authService: AuthService) { }

  ngOnInit(): void { }

  async login() {
    if (this.loginForm.valid) {
      this.loading = true;
      //this.authService.login(this.loginForm.get('email')?.value as unknown as string, this.loginForm.get('password')?.value as unknown as string).then((cred) => {
      this.authService.login(this.email.value as string, this.password.value as string).then((cred) => {
        this.router.navigateByUrl('/main');
        this.loading = false;
      }).catch((error) => {
        console.error(error);
        this.loading = false;
      });
      /*
      //promise
      this.loadingService.loadingWithPromise(this.email.value as string, this.password.value as string).then((_: boolean) => {
        console.log('this is executed second.');
        this.router.navigateByUrl('/main');
      }).catch(error => {
        console.error(error, 'Incorrect email or password');
      }).finally(() => {
        console.log('this is executed finally');
      });*/


      /* //async await
       try {
         //then
         const _ = await this.loadingService.loadingWithPromise(this.email.value as string, this.password.value as string)
         console.log('this is executed second.');
         this.router.navigateByUrl('/main');
       }
       //catch
       catch (error) {
         console.error(error, 'Incorrect email or password');
       } //finally
       finally {
         console.log('this is executed finally');
       }*/

      /*
            //observable
            this.loadingSubscription = this.loadingService.loadingWithObservable(this.email.value as string, this.password.value as string)
              .subscribe(
                {
                  next: (data: boolean) => {
                    // console.log(data);
                    //subscription.unsubscribe();
                    this.router.navigateByUrl('/main');
                  }, error: (error) => {
                    console.log(error);
                    this.loading = false;
                  }, complete: () => {
                    console.log('finally');
                    this.loading = false;
                  }
                });*/
    }
  }

  ngOnDestroy(): void {
    this.loadingSubscription?.unsubscribe();
  }


}
