import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InstanceDto } from '../models/instanceDto';
import { ConnectionsService } from '../services/connections.service';
import { ToastrService } from 'ngx-toastr';
import { CreateConnection } from '../models/createConnection';
import { QrcodeDto } from '../models/qrcode';

@Component({
  selector: 'app-connections',
  templateUrl: './connections.component.html'
})
export class ConnectionsComponent {

  breadCrumbItems!: Array<{}>;

  imagemBase64: string | null = null;

  addForm: FormGroup;
  editForm: FormGroup;
  errors: any[] = [];
  connections: InstanceDto[] = [];
  createConnection: CreateConnection;
  qrCode: QrcodeDto;

  instanceName: string;

  constructor(
    private formBuilder: FormBuilder,
    private connectionService: ConnectionsService,
    private toastr: ToastrService)
    {}

  ngOnInit(): void {
    /**
     * BreadCrumb
     */
    this.breadCrumbItems = [
      { label: 'Dashboard' },
      { label: 'Conexões', active: true }
    ];

    this.listConnections();
    this.initializeAddForm();
  }

  listConnections() {
    this.connectionService.getAll()
    .subscribe(
      response =>{
        this.connections = response;
      },
      errors => { this.handleFail(errors); }
    )
  }

  getQrCode(instanceName: string) {
    this.connectionService.getQrcode(instanceName)
    .subscribe(
      response =>{
        this.qrCode = response;
        this.imagemBase64 = this.qrCode.base64;
      },
      errors => { this.handleFail(errors); }
    )
  }

  logout(instanceName: string) {
    this.connectionService.logout(instanceName)
    .subscribe(
      response => { this.handleSuccess('Desconectado com sucesso!') },
      errors => { this.handleFail(errors); }
    )
  }

  remove() {
    this.connectionService.remove(this.instanceName)
    .subscribe(
      response => { this.handleSuccess('Conexão removida com sucesso!') },
      errors => { this.handleFail(errors); }
    )
  }

  markConnectionToRemove(instanceName: string) {
    this.instanceName = instanceName;
  }

  initializeAddForm() {
    this.addForm = this.formBuilder.group({
      instanceName: ['', [Validators.required]]
    });
  }
  
  get f(){ return this.addForm.controls; }

  add() {
    if(this.addForm.dirty && this.addForm.valid) {
      this.createConnection = Object.assign({}, this.createConnection, this.addForm.value);

      this.connectionService.add(this.createConnection)
            .subscribe(
              sucesso => { this.handleSuccess('Conexão adicionada com sucesso!') },
              erros => { this.handleFail(erros) }
            );
    }
  }

  handleSuccess(message: string) {
    this.addForm.reset();
    this.toastr.success(message, 'Sucesso ):');
    this.listConnections();
  }

  handleFail(fail: any) {
    this.errors = fail.error;
    this.toastr.error('Ocorreu um erro!', 'Opa :(');
  }

}
