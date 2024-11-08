import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';
import { BaseService } from 'src/app/core/services/base.service';

@Injectable({
  providedIn: 'root'
})
export class VideoService extends BaseService {

  constructor(private http: HttpClient) { super();  }

  getAll() : Observable<any>{
    return this.http
          .get<any>(this.UrlServiceV1 + "video/get-all", this.GetAuthHeaderJson())
          .pipe(catchError(super.serviceError));
  }

  getVideo(fileName: string) : Observable<any>{
    return this.http
          .get<any>(this.UrlServiceV1 + "video/get-video/" + fileName, this.GetAuthHeaderJson())
          .pipe(catchError(super.serviceError));
  }

  extractTheLast30Seconds(fileName: string) : Observable<Blob>{
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.GetAuthHeaderJson());

    return this.http
          .get(`${this.UrlServiceV1}video/extract-last-30-seconds/${fileName}`, {
             responseType:'blob', 
             headers: headers })
          .pipe(catchError(this.serviceError));
  }
  
}