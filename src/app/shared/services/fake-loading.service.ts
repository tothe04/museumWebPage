import { Injectable } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FakeLoadingService {

  constructor() { }



  loadingWithPromise(email: string, password: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      let i = 0;
      setTimeout(() => {
        if (email === 'test@gmail.com' && password === 'jelszo') {
          resolve(true);
        } else {
          reject(false);
        }
      }, 1000);
    });
  }

  loadingWithObservable(email: string, password: string): Observable<boolean> {
    // data stream
    return new Observable((subscriber: Subscriber<boolean>) => {
      let i = 0;
      const interval = setInterval(() => {
        i++;
        if (i === 1) {
          if (email === 'test@gmail.com' && password === 'jelszo') {
            subscriber.next(true);
            subscriber.complete();
          } else {
            subscriber.error(false);
          }
        }
      }, 1000)
    })


  }



}
