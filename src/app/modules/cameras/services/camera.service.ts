import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';
import { BaseService } from 'src/app/core/services/base.service';
import { Camera } from '../models/camera';
import { StartRecording } from '../models/startRecording';
import { StopRecording } from '../models/stopRecording';

@Injectable({
  providedIn: 'root'
})
export class CameraService extends BaseService {

  constructor(private http: HttpClient) { super();  }

  getAll() : Observable<any>{
    return this.http
          .get<any>(this.UrlServiceV1 + "camera/get-all", this.GetAuthHeaderJson())
          .pipe(catchError(super.serviceError));
  }

  getById(id:string) : Observable<any>{
    return this.http
      .get<any>(this.UrlServiceV1 + "camera/" + id, this.GetAuthHeaderJson())
      .pipe(catchError(super.serviceError));
  }

  add(camera: Camera) : Observable<any>{
    let response = this.http
        .post<Camera>(this.UrlServiceV1 + "camera/create", camera, this.GetHeaderFormData())
        .pipe((
          map(this.extractData),
          catchError(this.serviceError)));

    return response;
  }

  update(camera: Camera) : Observable<any>{
    let response = this.http
        .put<Camera>(this.UrlServiceV1 + "camera/update", camera, this.GetHeaderFormData())
        .pipe((
          map(this.extractData),
          catchError(this.serviceError)));

    return response;
  }

  remove(id:string) : Observable<any>{
    return this.http
      .delete<any>(this.UrlServiceV1 + "camera/remove/" + id, this.GetAuthHeaderJson())
      .pipe(catchError(super.serviceError));
  }

  start(startRecorgind: StartRecording) : Observable<any> {
    return this.http
      .put<StartRecording>(this.UrlServiceV1 + "nvr/start-recording", startRecorgind, this.GetAuthHeaderJson())
      .pipe((
        map(this.extractData),
        catchError(this.serviceError)));
  }

  stop(stopRecording: StopRecording) : Observable<any> {
    return this.http
      .put<StopRecording>(this.UrlServiceV1 + "nvr/stop-recording", stopRecording, this.GetAuthHeaderJson())
      .pipe((
        map(this.extractData),
        catchError(this.serviceError)));
  }
  
  
}
