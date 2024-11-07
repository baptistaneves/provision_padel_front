import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';
import { BaseService } from 'src/app/core/services/base.service';
import { Court } from '../models/court';

@Injectable({
  providedIn: 'root'
})
export class CourtService extends BaseService {

  constructor(private http: HttpClient) { super();  }

  getAll() : Observable<any>{
    return this.http
          .get<any>(this.UrlServiceV1 + "court/get-all", this.GetAuthHeaderJson())
          .pipe(catchError(super.serviceError));
  }

  getById(id:string) : Observable<any>{
    return this.http
      .get<any>(this.UrlServiceV1 + "court/" + id, this.GetAuthHeaderJson())
      .pipe(catchError(super.serviceError));
  }

  add(court: Court) : Observable<any>{
    let response = this.http
        .post<Court>(this.UrlServiceV1 + "court/create", court, this.GetHeaderFormData())
        .pipe((
          map(this.extractData),
          catchError(this.serviceError)));

    return response;
  }

  update(court: Court) : Observable<any>{
    let response = this.http
        .put<Court>(this.UrlServiceV1 + "court/", court, this.GetHeaderFormData())
        .pipe((
          map(this.extractData),
          catchError(this.serviceError)));

    return response;
  }

  remove(id:string) : Observable<any>{
    return this.http
      .delete<any>(this.UrlServiceV1 + "court/" + id, this.GetAuthHeaderJson())
      .pipe(catchError(super.serviceError));
  }
  
}
