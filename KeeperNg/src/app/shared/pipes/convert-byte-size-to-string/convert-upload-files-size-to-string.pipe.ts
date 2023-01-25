import { Pipe, PipeTransform } from '@angular/core';
import { RepoFileInterface } from '../../interfaces/repo-file.interface';
import formatBytes from './utills/formatBytes.util';

@Pipe({
  name: 'convertUploadFilesSizeToString'
})
export class ConvertUploadFilesSizeToStringPipe implements PipeTransform {

    transform(files: File[]): string {
        return formatBytes(files.reduce((acc, curr) => acc + curr.size ,0));
    }
}
