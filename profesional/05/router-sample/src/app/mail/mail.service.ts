import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Mail} from './models/mail.interface';
import {map} from 'rxjs/operators';


@Injectable()
export class MailService {

  constructor(private http: HttpClient) {
  }

  getFolder(folder: string): Observable<Mail[]> {
    return this.http.get(`http://localhost:3000/messages?folder=${folder}`, {responseType: 'json'})
      .pipe(
        map((response: Mail[]) => response)
      );
  }

  getMessage(id: string): Observable<Mail> {
    return this.http.get(`http://localhost:3000/messages/${id}`, {responseType: 'json'})
      .pipe(
        map((response: Mail) => response)
      );
  }
}
