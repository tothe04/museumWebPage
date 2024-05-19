import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Exhibit } from '../models/Exhibit';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
//import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class ExhibitsService {

  collectionName = 'Exhibits'

  constructor(private http: HttpClient,
    private afs: AngularFirestore,
    private storage: AngularFireStorage
  ) { }

  loadExhibitMeta(metaUrl: string): Observable<Array<Exhibit>> {
    return this.afs.collection<Exhibit>(this.collectionName).valueChanges();
  }

  loadExhibit(imageUrl: string) {
    return this.storage.ref(imageUrl).getDownloadURL();
  }
}
