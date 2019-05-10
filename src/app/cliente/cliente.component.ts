import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/service/api.service';
import { Cliente } from 'src/model/cliente';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss']
})
export class ClienteComponent implements OnInit {

  displayedColums: string[] = ['id_cliente', 'nome_cliente', 'cpf', 'end', 'bairro', 'cidade', 'data_nascimento', 'email', 'acao'];
  dataSource: Cliente[];
  isLoadingResults = true;

  constructor(private _api: ApiService) { }
  

  ngOnInit() {
    this._api.getClientes()
    .subscribe(res => {
      this.dataSource = res;
      console.log(this.dataSource);
      this.isLoadingResults = false;
    }), err => {
      console.log(err);
      this.isLoadingResults = false;
    }
  }

}
