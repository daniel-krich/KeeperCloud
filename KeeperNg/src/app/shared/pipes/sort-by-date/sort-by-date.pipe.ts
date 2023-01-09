import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortByDate',
})
export class SortByDatePipe implements PipeTransform {

  transform(items: any[] | null, dateProp: string): any[] | null {
    if (!items || !dateProp) {
      return items;
    }
    let itemsCopy = [...items];
    return itemsCopy.sort((a, b) => {
      const dateA = new Date(a[dateProp]).getTime();
      const dateB = new Date(b[dateProp]).getTime();
      return dateA - dateB;
    });
  }
  
}