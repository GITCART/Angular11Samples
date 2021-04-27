import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Mail} from '../../models/mail.interface';
import {MailService} from '../../mail.service';
import {Observable} from 'rxjs';

@Injectable()
export class MailFolderResolve implements Resolve<Mail[]>{
  constructor(private mailService: MailService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Mail[]>{
    return this.mailService.getFolder('route.params.name');
  }
}
