export interface Video {
    id: string;
    name: string;
    startTime: Date;
    endTime: Date;
    size: string;
    isRecording: boolean;
    cameraChannel: number;
    videoDownloadUrl: string;
}