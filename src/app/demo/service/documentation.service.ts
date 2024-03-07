import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DocumentationService {
    private baseUrl="http://localhost:8080/";

  constructor(private http:HttpClient) { }
    deleteDocumentation(idLabel:any,idDoc:any)
    {
        return this.http.delete(`${this.baseUrl}api/documentation/${idLabel}/${idDoc}`,{responseType:'text'})
    }
    affecterdocumentation(doc:any ,id:any)
    {
        return this.http.post(`${this.baseUrl}api/documentation/affecter/${id}`,doc,{responseType:'text'})
    }

    updateDocumentation(document: any,documentId:any) {
      return this.http.put(`${this.baseUrl}api/documentation/${documentId}`,document);

    }
}
