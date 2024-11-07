import { Component, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Camera } from 'src/app/modules/cameras/models/camera';
import { ToastrService } from 'ngx-toastr';
import { CameraService } from 'src/app/modules/cameras/services/camera.service';
import { StartRecording } from 'src/app/modules/cameras/models/startRecording';
import { StopRecording } from 'src/app/modules/cameras/models/stopRecording';


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  providers: [DecimalPipe]
})
export class IndexComponent {

  // bread crumb items
  breadCrumbItems!: Array<{}>;

  errors: any[] = [];
  cameras: Camera[] = [];
  startRecordingModel: StartRecording;
  stopRecordingModel: StopRecording;

  constructor(
    private cameraService: CameraService,
    private toastr: ToastrService) {
     }

  ngOnInit(): void {
    /**
     * BreadCrumb
     */
    this.breadCrumbItems = [
      { label: 'Dashboards' },
      { label: 'Dashboard', active: true }
    ];

    this.startRecordingModel = { channelId: 0 };
    this.stopRecordingModel = { channelId: 0 };

    this.listCameras();
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
    this.toastr.success(message, 'Sucesso ):');
    this.listCameras();
  }

  handleFail(fail: any) {
    this.errors = fail.error;
    this.toastr.error('Ocorreu um erro!', 'Opa :(');
  }
  
}