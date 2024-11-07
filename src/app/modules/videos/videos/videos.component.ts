import { Component, ElementRef, ViewChild } from '@angular/core';
import { Video } from '../models/video';
import { ToastrService } from 'ngx-toastr';
import { VideoService } from '../services/video.service';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html'
})
export class VideosComponent {
 
  breadCrumbItems!: Array<{}>;

  errors: any[] = [];
  videos: Video[] = [];
  video: Video;

  @ViewChild("videoPlayer", { static: false })
  videoPlayer!: ElementRef;
  files:string[];
  message:string;
  fileName:string;

  constructor(
    private videoService: VideoService,
    private toastr: ToastrService) {

      this.files = [];
      this.message = '';
      this.fileName = '';

    }

  ngOnInit(): void {
    /**
     * BreadCrumb
     */
    this.breadCrumbItems = [
      { label: 'Dashboard' },
      { label: 'Vídeos', active: true }
    ];

    this.listVideos();
  }

  listVideos() {
    this.videoService.getAll()
          .subscribe(
            response =>{
              this.videos = response;
            },
            errors => { this.handleFail(errors); }
          )
  }

  onSelectedVideo(fileName: string) {
    this.videoService.getVideo(fileName).subscribe(
      response =>{
        this.fileName = response;
        this.videoPlayer.nativeElement.src = this.fileName;
        this.videoPlayer.nativeElement.play();
      },
      errors => { this.handleFail(errors); }
    )
  }

  handleFail(fail: any) {
    console.log(fail);
    this.errors = fail.error;
    this.toastr.error('Ocorreu um erro!', 'Opa :(');
  }

  formatSize(sizeInBytes: string): string {

    const size = parseInt(sizeInBytes, 10);

    const sizeInMB = size / (1024 * 1024);
    if (sizeInMB >= 1024) {
        const sizeInGB = sizeInMB / 1024;
        return `${sizeInGB.toFixed(2)} GB`;
    }
    return `${sizeInMB.toFixed(2)} MB`;
  }

}
