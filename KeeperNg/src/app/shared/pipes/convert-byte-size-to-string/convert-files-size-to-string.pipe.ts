import { Pipe, PipeTransform } from '@angular/core';
import { RepoFileInterface } from '../../interfaces/repo-file.interface';
import formatBytes from './utills/formatBytes.util';

@Pipe({
  name: 'convertFilesSizeToString'
})
export class ConvertFilesSizeToStringPipe implements PipeTransform {

    transform(files: RepoFileInterface[]): string {
        return formatBytes(files.reduce((acc, curr) => acc + curr.fileSize ,0));
    }
}
