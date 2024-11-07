import { Component } from '@angular/core';
import { Camera } from '../models/camera';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CameraService } from '../services/camera.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cameras',
  templateUrl: './cameras.component.html'
})
export class CamerasComponent {

  breadCrumbItems!: Array<{}>;

  addForm: FormGroup;
  editForm: FormGroup;
  errors: any[] = [];
  cameras: Camera[] = [];
  camera: Camera;

  constructor(
    private formBuilder: FormBuilder,
    private cameraService: CameraService,
    private toastr: ToastrService)
    {}

  ngOnInit(): void {
    /**
     * BreadCrumb
     */
    this.breadCrumbItems = [
      { label: 'Dashboard' },
      { label: 'Câmaras', active: true }
    ];

    this.listCameras();
    this.initializeAddForm();
  }

  listCameras() {
    this.cameraService.getAll()
          .subscribe(
            response =>{
              this.cameras = response;
            },
            errors => { this.handleFail(errors); }
          )
  }

  initializeAddForm() {
    this.addForm = this.formBuilder.group({
      channel: ['', [Validators.required]]
    });
  }
  
  get f(){ return this.addForm.controls; }

  add() {
    if(this.addForm.dirty && this.addForm.valid) {
      this.camera = Object.assign({}, this.camera, this.addForm.value);

      console.log(this.camera);
      this.cameraService.add(this.camera)
            .subscribe(
              sucesso => { this.handleSuccess() },
              erros => { this.handleFail(erros) }
            );
    }
  }

  handleSuccess() {
    this.addForm.reset();
    this.toastr.success('Câmara adicionada com sucesso!', 'Sucesso ):');
    this.listCameras();
  }

  handleFail(fail: any) {
    this.errors = fail.error;
    this.toastr.error('Ocorreu um erro!', 'Opa :(');
  }

}
