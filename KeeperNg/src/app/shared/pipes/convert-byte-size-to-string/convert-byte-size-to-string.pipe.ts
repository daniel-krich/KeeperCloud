import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertByteSizeToString'
})
export class ConvertByteSizeToStringPipe implements PipeTransform {

    transform(bytes: number): string {
        return this.formatBytes(bytes);
    }

    private formatBytes(bytes: number, decimals = 2): string {
        if (!+bytes) return '0 Bytes';
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
    }

}
