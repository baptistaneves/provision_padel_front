import { HttpClient } from '@angular/common/http';
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
  
}