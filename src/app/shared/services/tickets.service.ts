import { Injectable, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Ticket } from '../models/Ticket';
import { AuthService } from './auth.service';
import { Observable, firstValueFrom } from 'rxjs';
import { UserService } from './user.service';
import { User } from '../models/User';
import { tick } from '@angular/core/testing';


@Injectable({
  providedIn: 'root'
})
export class TicketsService implements OnInit {

  collectionName = 'Tickets'
  user?: User | null;
  email = '';



  constructor(
    private afs: AngularFirestore,
    private userService: UserService) {

    const user = JSON.parse(localStorage.getItem('user') as string) as firebase.default.User;
    if (user) {
      this.userService.getById(user.uid).subscribe(data => {
        this.user = data[0];
      }, error => {
        console.error(error);
      });
    } else {
      this.user = (null);
    }
  }

  ngOnInit(): void { }

  create(ticket: Ticket) {
    ticket.id = this.afs.createId();
    return this.afs.collection<Ticket>(this.collectionName).doc(ticket.id).set(ticket);
    // return this.afs.collection<Ticket>(this.collectionName).add(ticket);
  }

  getAll() {
    return this.afs.collection<Ticket>(this.collectionName).valueChanges();
  }

  async update(ticket: Ticket) {
    return this.afs.collection<Ticket>(this.collectionName).doc(ticket.id).set(ticket);
    /*const querySnapshot = await firstValueFrom(
      this.afs.collection<Ticket>(this.collectionName, ref =>
        ref.where('email', '==', ticket.email)
          .where('exhibitId', '==', ticket.exhibitId)
      ).get()
    );
    if (!querySnapshot.empty) {
      const docId = querySnapshot.docs[0].id;
      await this.afs.collection<Ticket>(this.collectionName).doc(docId).update({
        quantity: ticket.quantity + 1
      });
      console.log('ExhibitItem updated successfully!');
    } else {
      console.log('No matching ExhibitItem found to update.');
    }*/
  } catch(error: any) {
    console.error('Error updating ExhibitItem:', error);
  }

  delete(id: string) {
    return this.afs.collection<Ticket>(this.collectionName).doc(id).delete();
  }

  getTicketsByEmail(email: string) {
    return this.afs.collection<Ticket>(this.collectionName, ref => ref.where('email', '==', email as string)).valueChanges();
  }

}
