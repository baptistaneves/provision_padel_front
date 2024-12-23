import { Component, ElementRef, ViewChild } from '@angular/core';
import { Video } from '../models/video';
import { ToastrService } from 'ngx-toastr';

import {VgApiService} from '@videogular/ngx-videogular/core';
import { NgTinyUrlService } from 'ng-tiny-url';

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

  preload: string = 'auto';
  api: VgApiService = new VgApiService();

  fileName:string;
  onlyFileName:string;

  shortenedUrl: string;

  constructor(
    private videoService: VideoService,
    private toastr: ToastrService,
    private tinyUrl: NgTinyUrlService) {
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

  onPlayerReady(source: VgApiService) {
    this.api = source;
    this.api.getDefaultMedia().subscriptions.loadedMetadata.subscribe(
      this.autoplay.bind(this)
    )
  }

  autoplay() {
    this.api.play();
  }

  rewindVideo(seconds: number) {
    this.api.playbackRate = 2;
  }

  onSelectedVideo(fileName: string) {
    this.onlyFileName = fileName;
    this.fileName = `${this.videoService.UrlServiceV1}video/get-video/${fileName}`;
  }

  closeVideo() {
    this.fileName = '';
  }

  extractTheLast30Seconds(fileName: string): void {
    this.videoService.extractTheLast30Seconds(fileName).subscribe();
  }

  handleFail(fail: any) {
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

  getTinyUrl(originalUrl: string) {
    this.tinyUrl.shorten(originalUrl).subscribe(
      (res) => {
        this.shortenedUrl = res != '' && res != null ? res : '';
        this.copyToClipboard(this.shortenedUrl)
      },
      (err) => console.log
    );
  }

  private copyToClipboard(url: string): void {
    navigator.clipboard.writeText(url).then(
      () => this.toastr.success('URL copiada para a área de transferência!'),
      (err) => this.toastr.error('Erro ao copiar a URL: ')
    );
  }

}