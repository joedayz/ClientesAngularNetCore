

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
import { Cliente } from './cliente';

@Injectable({providedIn: 'root'})
export class ClienteService {

    private urlEndPoint: string = 'http://localhost:5000/api/clientes';

    private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

    constructor(private http: HttpClient) { }

    getClientes(): Observable<Cliente[]>{
        return this.http.get(this.urlEndPoint).pipe(
            tap(response => {
                let clientes = response as Cliente[];
                console.log('ClienteService: tap 1');
                clientes.forEach(cliente =>{
                    console.log(cliente.nombre);
                });
            }),
            map( response=>{
                let clientes = response as Cliente[];
                return clientes.map(cliente =>{
                    cliente.nombre = cliente.nombre.toUpperCase();
                    return cliente;
                })
            }),
            tap( response=> {
                console.log('ClienteService: tap 2');
                response.forEach(cliente =>{
                     console.log(cliente.nombre);   
                });
            })
        );
    }

    getCliente(id): Observable<Cliente>{
        return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`)
    }
    
    
    update(cliente: Cliente) : Observable<Cliente> {
        return this.http.put<Cliente>(`${this.urlEndPoint}/${cliente.id}`, cliente, {headers: this.httpHeaders});
      }
    
      delete(id: number): Observable<Cliente> {
        return this.http.delete<Cliente>(`${this.urlEndPoint}/${id}`, { headers: this.httpHeaders });
      }
}


