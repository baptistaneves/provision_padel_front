export interface Video {
    id: string;
    name: string;
    channel: number;
    startTime: Date;
    endTime: Date;
    size: string;
    isRecording: boolean;
}