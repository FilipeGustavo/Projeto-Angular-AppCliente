import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Cliente } from 'src/model/cliente';
import { analyzeAndValidateNgModules } from '@angular/compiler';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

const apiUrl = '/api';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  dataSource: Cliente[];

  constructor(private http: HttpClient) { }

  getClientes (): Observable<Cliente[]>{
    return this.http.get<Cliente[]>(apiUrl + "/cliente/ListarCliente")
    .pipe(
      tap(clientes => console.log('leu os cliente')),
      catchError(this.handleError('getProdutos', []))
    );
  }

  getCliente(codigo: number): Observable<Cliente>{
    //const url = '${apiUrl}/${id}';
    return this.http.get<Cliente>(apiUrl + "/cliente/BuscaClientePorId?id=" + codigo).pipe(
      tap(_ => console.log('Leu o cliente id=${id}')),
      catchError(this.handleError<Cliente>('getCliente id=${id}'))
    );
  }

  addCliente(cliente): Observable<Cliente>{
    return this.http.post<Cliente>(apiUrl + "/cliente/inserirCliente", cliente, httpOptions).pipe(
      tap((cliente : Cliente) => console.log('adicionou o cliente com w/ id=${cliente._id}')),
      catchError(this.handleError<Cliente>('addCliente'))
    );
  }

  updateCliente(id, cliente): Observable<any>{
    return this.http.put(apiUrl + "/cliente/alterarCliente?id=" + id, cliente, httpOptions).pipe(
      tap(_ => console.log('atualiza o cliente com id=${id}')),
      catchError(this.handleError<any>('updateCliente'))
    );
  }

  deleteCliente(id) : Observable<Cliente>{
    const url = '${apiUrl}/delete/${id}';

    return this.http.delete<Cliente>(url, httpOptions).pipe(
      tap(_ => console.log('remove o produto com id=${id}')),
      catchError(this.handleError<Cliente>('deleteProduto'))
    );
  }


  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);

      return of(result as T);
    };
  }
}

