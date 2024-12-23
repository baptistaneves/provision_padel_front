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
  courtId: string;

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
    this.initializeEditForm();
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

  initializeEditForm() {
    this.editForm = this.formBuilder.group({
      id: [''],
      description: ['', [Validators.required]]
    });
  }

  fillForm(court: Court) {
      this.editForm.patchValue({
        id: court.id,
        description: court.description
      });
    }
  
  get f(){ return this.addForm.controls; }
  get e(){ return this.editForm.controls; }

  add() {
    if(this.addForm.dirty && this.addForm.valid) {
      this.court = Object.assign({}, this.court, this.addForm.value);

      this.courtService.add(this.court)
            .subscribe(
              sucesso => { this.handleSuccess('Campo adicionado com sucesso!') },
              erros => { this.handleFail(erros) }
            );
    }
  }

  edit() {
    if(this.editForm.dirty && this.editForm.valid) {
      this.court = Object.assign({}, this.court, this.editForm.value);

      this.courtService.update(this.court)
            .subscribe(
              sucesso => { this.handleSuccess('Campo actualizado com sucesso!') },
              erros => { this.handleFail(erros) }
            );
    }
  }

  markCourtToRemove(courtId: string) {
    this.courtId = courtId;
  }

  remove() {
    this.courtService.remove(this.courtId)
    .subscribe(
      sucesso => { this.handleSuccess('Câmara removida com sucesso!') },
      erros => { this.handleFail(erros) }
    );
  }

  handleSuccess(message: string) {
    this.addForm.reset();
    this.toastr.success(message, 'Sucesso ):');
    this.listCourts();
  }

  handleFail(fail: any) {
    this.errors = fail.error;
    this.toastr.error('Ocorreu um erro!', 'Opa :(');
  }

}