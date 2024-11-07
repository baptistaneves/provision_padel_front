import { HttpHeaders, HttpErrorResponse, HttpClient, HttpParams } from "@angular/common/http";
import { throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { LocalStorageUtils } from "../utils/localStorage";


export abstract class BaseService {

    protected UrlServiceV1: string = environment.apiUrlv1;
    public LocalStorage = new LocalStorageUtils();

    constructor() { }

    protected GetHeaderJson() {
        return {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
    }

    protected GetHeaderFormData() {
        return {
            headers: new HttpHeaders({
                'Content-Disposition': 'form-data; name="files"',
                'Authorization': `Bearer ${this.LocalStorage.getToken()}`
            })
        };
    }


    protected GetAuthHeaderJson() {
        return {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.LocalStorage.getToken()}`
            })
        };
    }    

    protected getPaginationHeaders(pageNumber: number, pageSize: number) {
        let params = new HttpParams(); 
    
        params = params.append("pageNumber", pageNumber.toString());
        params = params.append("pageSize", pageSize.toString());
    
        return params;
      }

    protected extractData(response: any) {
        return response.data || {};
    }

    protected serviceError(response: Response | any) {
        let customError: string[] = [];
        let customResponse = { error: { errors: [] }}

        if (response instanceof HttpErrorResponse) {

            if (response.statusText === "Unknown Error") {
                customError.push("Ocorreu um erro desconhecido");
                response.error.errors = customError;
            }
        }
        if (response.status === 500) {
            customError.push("Ocorreu um erro no processamento, tente novamente mais tarde ou contate o nosso suporte.");          
            customResponse.error.errors = customError;
            return throwError(customResponse);
        }

        return throwError(response);
    }
}