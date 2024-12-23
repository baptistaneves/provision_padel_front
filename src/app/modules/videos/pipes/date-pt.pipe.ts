import { Pipe, PipeTransform } from '@angular/core';
import { formatDate } from '@angular/common';

@Pipe({
  name: 'datePt'
})
export class DatePtPipe implements PipeTransform {
  transform(value: any, format: string = 'short'): string {
    if (!value) return '';

    return formatDate(value, format, 'pt-PT');
  }
}