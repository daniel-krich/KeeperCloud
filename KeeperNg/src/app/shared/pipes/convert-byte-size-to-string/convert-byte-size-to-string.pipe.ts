import { Pipe, PipeTransform } from '@angular/core';
import formatBytes from './utills/formatBytes.util';

@Pipe({
  name: 'convertByteSizeToString'
})
export class ConvertByteSizeToStringPipe implements PipeTransform {

    transform(bytes: number): string {
        return formatBytes(bytes);
    }
}
