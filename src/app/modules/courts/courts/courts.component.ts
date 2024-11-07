import { Component } from '@angular/core';
import { Court } from '../models/court';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CourtService } from '../services/court.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-courts',
  templateUrl: './courts.component.html'
})
export class CourtsComponent {

  breadCrumbItems!: Array<{}>;

  addForm: FormGroup;
  editForm: FormGroup;
  errors: any[] = [];
  courts: Court[] = [];
  court: Court;

  constructor(
    private formBuilder: FormBuilder,
    private courtService: CourtService,
    private toastr: ToastrService) {}

  ngOnInit(): void {
    /**
     * BreadCrumb
     */
    this.breadCrumbItems = [
      { label: 'Dashboard' },
      { label: 'Campos', active: true }
    ];

    this.listCourts();
    this.initializeAddForm();
  }

  listCourts() {
    this.courtService.getAll()
          .subscribe(
            response =>{
              console.log(response);
              this.courts = response.courts;
            },
            errors => { this.handleFail(errors); }
          )
  }

  initializeAddForm() {
    this.addForm = this.formBuilder.group({
      description: ['', [Validators.required]]
    });
  }
  
  get f(){ return this.addForm.controls; }

  add() {
    if(this.addForm.dirty && this.addForm.valid) {
      this.court = Object.assign({}, this.court, this.addForm.value);

      this.courtService.add(this.court)
            .subscribe(
              sucesso => { this.handleSuccess() },
              erros => { this.handleFail(erros) }
            );
    }
  }

  handleSuccess() {
    this.addForm.reset();
    this.toastr.success('Campo adicionado com sucesso!', 'Sucesso ):');
    this.listCourts();
  }

  handleFail(fail: any) {
    this.errors = fail.error;
    this.toastr.error('Ocorreu um erro!', 'Opa :(');
  }

}