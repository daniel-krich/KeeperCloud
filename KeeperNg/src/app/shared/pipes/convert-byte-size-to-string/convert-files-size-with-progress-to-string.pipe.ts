import { Pipe, PipeTransform } from '@angular/core';
import { RepoFileInterface } from '../../interfaces/repo-file.interface';
import formatBytes from './utills/formatBytes.util';

@Pipe({
    name: 'convertFilesSizeWithProgressToString'
})
export class ConvertFilesSizeWithProgressToStringPipe implements PipeTransform {

    transform(files: File[], progress: number): string {
        const filesSize = files.reduce((acc, curr) => acc + curr.size, 0);
        const overAllBytes =  formatBytes(filesSize);
        const progressBytes =  formatBytes(filesSize * progress / 100);

        return progressBytes + " / " + overAllBytes;
    }
}