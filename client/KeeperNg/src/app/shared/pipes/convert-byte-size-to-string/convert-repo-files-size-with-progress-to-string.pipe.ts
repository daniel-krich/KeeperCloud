import { Pipe, PipeTransform } from '@angular/core';
import { RepoFileInterface } from '../../interfaces/repo-file.interface';
import formatBytes from './utills/formatBytes.util';

@Pipe({
    name: 'convertRepoFilesSizeWithProgressToString'
})
export class ConvertRepoFilesSizeWithProgressToStringPipe implements PipeTransform {

    transform(files: RepoFileInterface[], progress: number): string {
        const filesSize = files.reduce((acc, curr) => acc + curr.fileSize, 0);
        const overAllBytes =  formatBytes(filesSize);
        const progressBytes =  formatBytes(filesSize * progress / 100);

        return progressBytes + " / " + overAllBytes;
    }
}