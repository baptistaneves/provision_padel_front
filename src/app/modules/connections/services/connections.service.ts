import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';
import { BaseService } from 'src/app/core/services/base.service';
import { InstanceDto } from '../models/instanceDto';
import { CreateConnection } from '../models/createConnection';
import { QrcodeDto } from '../models/qrcode';

@Injectable({
  providedIn: 'root'
})
export class ConnectionsService extends BaseService {

  constructor(private http: HttpClient) { super();  }

  getAll() : Observable<any>{
    return this.http
          .get<any>(this.UrlServiceV1 + "connection/get-all", this.GetAuthHeaderJson())
          .pipe(catchError(super.serviceError));
  }

  getById(instanceId:string) : Observable<InstanceDto>{
    return this.http
      .get<InstanceDto>(this.UrlServiceV1 + "connection/get-by-id/" + instanceId, this.GetAuthHeaderJson())
      .pipe(catchError(super.serviceError));
  }

  getQrcode(instanceName:string) : Observable<QrcodeDto>{
    return this.http
      .get<QrcodeDto>(this.UrlServiceV1 + "connection/get-qrcode/" + instanceName, this.GetAuthHeaderJson())
      .pipe(catchError(super.serviceError));
  }

  logout(instanceName:string) : Observable<boolean>{
    return this.http
      .get<boolean>(this.UrlServiceV1 + "connection/logout/" + instanceName, this.GetAuthHeaderJson())
      .pipe(catchError(super.serviceError));
  }

  add(createConnection: CreateConnection) : Observable<any>{
    let response = this.http
        .post<any>(this.UrlServiceV1 + "connection/create", createConnection, this.GetHeaderFormData())
        .pipe((
          map(this.extractData),
          catchError(this.serviceError)));

    return response;
  }


  remove(instanceName:string) : Observable<any>{
    return this.http
      .delete<any>(this.UrlServiceV1 + "connection/remove/" + instanceName, this.GetAuthHeaderJson())
      .pipe(catchError(super.serviceError));
  }
  
}
