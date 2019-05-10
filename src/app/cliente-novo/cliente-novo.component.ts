import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ApiService } from 'src/service/api.service';

@Component({
  selector: 'app-cliente-novo',
  templateUrl: './cliente-novo.component.html',
  styleUrls: ['./cliente-novo.component.scss']
})
export class ClienteNovoComponent implements OnInit {

  clientForm : FormGroup;
  isLoadingResults = false;

  constructor(private router: Router, private api: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.clientForm = this.formBuilder.group({
      'nome_cliente': [null, Validators.required],
      'cpf': [null, Validators.required],
      'email': [null, Validators.required],
      'data_nascimento': [null, Validators.required],
      'end': [null, Validators.required],
      'bairro': [null, Validators.required],
      'cidade': [null, Validators.required]
    })
  }

  addCliente(form: NgForm) {
    this.isLoadingResults = true;
    this.api.addCliente(form)
      .subscribe(res => {
          const id = res['_id'];
          this.isLoadingResults = false;
          this.router.navigate(['/clientes']);
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        });
  }

}
