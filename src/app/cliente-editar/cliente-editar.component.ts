import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ApiService } from 'src/service/api.service';

@Component({
  selector: 'app-cliente-editar',
  templateUrl: './cliente-editar.component.html',
  styleUrls: ['./cliente-editar.component.scss']
})
export class ClienteEditarComponent implements OnInit {
  _id: string = '';
  clientForm: FormGroup;
  nome_cliente: string = '';
  cpf: string = '';
  data_nascimento: string = '';
  email: string = '';
  end: string = '';
  bairro: string = '';
  cidade: string = '';
  isLoadingResults = false;

  constructor(private router: Router, private route: ActivatedRoute, private api: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getCliente(this.route.snapshot.params['id']);
    this.clientForm = this.formBuilder.group({
      'nome_cliente': [null, Validators.required],
      'cpf': [null, Validators.required],
      'data_nascimento': [null, Validators.required],      
      'email': [null, Validators.required],
      'end': [null, Validators.required],
      'bairro': [null, Validators.required],
      'cidade': [null, Validators.required]      
    })
  }

  getCliente(id) {
    this.api.getCliente(id).subscribe(data => {
      this._id = data.id_cliente;
      this.clientForm.setValue({
        nome_cliente: data.nome_cliente,
        cpf: data.cpf,
        data_nascimento: data.data_nascimento,
        email: data.email,
        end: data.end,
        bairro: data.bairro,
        cidade: data.cidade
      });
    });
  }
  
  updateCliente(form: NgForm) {
    this.isLoadingResults = true;
    this.api.updateCliente(this._id, form)
      .subscribe(res => {
          this.isLoadingResults = false;
          this.router.navigate(['/cliente-detalhe/' + this._id]);
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        }
      );
  }

}
