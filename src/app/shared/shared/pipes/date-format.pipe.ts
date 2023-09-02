import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {

  transform(date: Date): string {
    const day = date.getDay()<10?'0'+date.getDay():date.getDay();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return (day + '-' + (month + 1) + '-' + year);
  }

}
