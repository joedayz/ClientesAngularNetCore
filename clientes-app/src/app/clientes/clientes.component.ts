

import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './clientes.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
    selector: 'app-clientes',
    templateUrl: './clientes.component.html'
})

export class ClientesComponent implements OnInit {

    clientes: Cliente[];

    constructor(private clienteService : ClienteService) { }

    ngOnInit() { 

        this.clienteService.getClientes().subscribe(
            clientes => this.clientes = clientes
        );

    }


    delete(cliente: Cliente): void{
        Swal.fire({
            title: 'Are you sure want to remove?',
            text: 'You will not be able to recover this file!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it'
          }).then((result) => {
            if (result.value) {
              Swal.fire(
                'Deleted!',
                'Your imaginary file has been deleted.',
                'success'
              )
            } else if (result.dismiss === Swal.DismissReason.cancel) {
              Swal.fire(
                'Cancelled',
                'Your imaginary file is safe :)',
                'error'
              )
            }
          })
       
    }
}