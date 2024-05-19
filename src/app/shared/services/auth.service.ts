import { Injectable } from '@angular/core';
import { user } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: AngularFireAuth) { }

  login(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  signup(email: string, password: string) {
    return this.auth.createUserWithEmailAndPassword(email, password);
  }

  isUserLoggedIn() {
    return this.auth.user;
  }

  logout() {
    return this.auth.signOut();
  }

  deleteUser() {
    this.auth.currentUser.then(user => {
      if (user) {
        user.delete().then(() => {
          console.log('User deleted successfully from Firebase Authentication');
        }).catch(error => {
          console.error('Error deleting user from Firebase Authentication:', error);
        });
      } else {
        console.error('No user signed in');
      }
    }).catch(error => {
      console.error('Error getting current user:', error);
    });
  }

}
