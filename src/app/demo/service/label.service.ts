import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable, Subject} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class LabelService {
    private baseUrl="http://localhost:8089/";


  constructor(private http :HttpClient) { }
    getAll()
    {
        return this.http.get(`${this.baseUrl}api/label`)
    }
    createLabel(label:any)
    {
        return this.http.post(`${this.baseUrl}api/label`,label);
    }

     deleteLabel(id:any)
     {
        return this.http.delete(`${this.baseUrl}api/label/${id}`,{responseType:'text'})
     }
    getLabelStatistics(): Observable<any> {
        return this.http.get<any>(`${this.baseUrl}api/label/statistics`);
    }
    getStat()
    {

        return this.http.get<any>(`${this.baseUrl}api/label/average-description-length-per-label`);

    }
    getLinearChart()
    {
        return this.http.get<any>(`${this.baseUrl}api/label/linear`);
    }
    fetchCountryNames()
    {
        return this.http.get('https://restcountries.com/v3.1/all') .pipe(map((response :any [])=>{
            return response.map(countryData => countryData.name.common.toLowerCase());
    }));

    }
    getLabelById(id:any)
    {
        return this.http.get<any>(`${this.baseUrl}api/label/${id}`);

    }


    getPrompt(request: { prompt: string, regulation: string }): Observable<any> {
        console.log(request.prompt)
        return this.http.post(`${this.baseUrl}api/label/getPrompt`, request)
    } 

}
