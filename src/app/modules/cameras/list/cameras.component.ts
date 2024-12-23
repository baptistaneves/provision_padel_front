import { Component } from '@angular/core';
import { Camera } from '../models/camera';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CameraService } from '../services/camera.service';
import { ToastrService } from 'ngx-toastr';
import { Court } from '../../courts/models/court';
import { CourtService } from '../../courts/services/court.service';
import { StartRecording } from '../models/startRecording';
import { StopRecording } from '../models/stopRecording';

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
  courts: Court[] = [];
  camera: Camera;
  cameraId: string;

  startRecordingModel: StartRecording;
  stopRecordingModel: StopRecording;

  selectedCourt: any = 'Seleccione o campo';

  constructor(
    private formBuilder: FormBuilder,
    private cameraService: CameraService,
    private courtService: CourtService,
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
    this.listCourts();
    this.initializeAddForm();
    this.initializeEditForm();

    this.startRecordingModel = { channelId: 0 };
    this.stopRecordingModel = { channelId: 0 };
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

  listCourts() {
    this.courtService.getAll()
          .subscribe(
            response =>{
              this.courts = response.courts;
            },
            errors => { this.handleFail(errors); }
          )
  }

  initializeAddForm() {
    this.addForm = this.formBuilder.group({
      channel: ['', [Validators.required]],
      courtId: ['', [Validators.required]]
    });
  }

  initializeEditForm() {
    this.editForm = this.formBuilder.group({
      id: [''],
      channel: ['', [Validators.required]],
      courtId: ['', [Validators.required]]
    });
  }

  fillForm(camera: Camera) {
    this.editForm.patchValue({
      id: camera.id,
      channel: camera.channel,
      courtId: camera.courtId
    });
  }
  
  get f(){ return this.addForm.controls; }

  get e(){ return this.editForm.controls; }

  add() {
    if(this.addForm.dirty && this.addForm.valid) {
      this.camera = Object.assign({}, this.camera, this.addForm.value);

      this.cameraService.add(this.camera)
            .subscribe(
              sucesso => { this.handleSuccess('Câmara adicionada com sucesso!') },
              erros => { this.handleFail(erros) }
            );
    }
  }

  
  edit() {
    if(this.editForm.dirty && this.editForm.valid) {
      this.camera = Object.assign({}, this.camera, this.editForm.value);

      this.cameraService.update(this.camera)
            .subscribe(
              sucesso => { this.handleSuccess('Câmara actualizada com sucesso!') },
              erros => { this.handleFail(erros) }
            );
    }
  }

  remove() {
    this.cameraService.remove(this.cameraId)
    .subscribe(
      sucesso => { this.handleSuccess('Câmara removida com sucesso!') },
      erros => { this.handleFail(erros) }
    );
  }

  markCameraToRemove(cameraId: string) {
    this.cameraId = cameraId;
  }

  startRecording(channelId: number) {
    this.startRecordingModel.channelId = channelId;

    this.cameraService.start(this.startRecordingModel)
          .subscribe(
            sucesso => { this.handleSuccess('Gravação iniciada com sucesso') },
            erros => { this.handleFail(erros) }
          );
  }

  stopRecording(channelId: number) {
    this.stopRecordingModel.channelId = channelId;

    this.cameraService.stop(this.stopRecordingModel)
          .subscribe(
            sucesso => { this.handleSuccess('Gravação parada com sucesso') },
            erros => { this.handleFail(erros) }
          );
  }

  handleSuccess(message: string) {
    this.addForm.reset();
    this.toastr.success(message, 'Sucesso ):');
    this.listCameras();
  }

  handleFail(fail: any) {
    this.errors = fail.error;
    this.toastr.error('Ocorreu um erro!', 'Opa :(');
  }

}
