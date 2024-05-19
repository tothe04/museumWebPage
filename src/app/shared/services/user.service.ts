import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from '../models/User';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  collectionName = 'Users';

  constructor(
    private afs: AngularFirestore,
    private authService: AuthService
  ) { }

  create(user: User) {
    return this.afs.collection<User>(this.collectionName).doc(user.id).set(user);

  }

  getAll() {
    return this.afs.collection<User>(this.collectionName).valueChanges();
  }

  getById(id: string) {
    return this.afs.collection<User>(this.collectionName, ref => ref.where('id', '==', id as string)).valueChanges();
  }

  update(user: User) {
    if (user) {
      return this.afs.collection<User>(this.collectionName).doc(user.id).set(user);
    }
    else {
      return Promise.resolve();
    }
  }

  delete(id: string) {
    this.authService.deleteUser();
    return this.afs.collection<User>(this.collectionName).doc(id).delete();
  }


}
