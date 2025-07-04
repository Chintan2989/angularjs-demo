import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'status'
})
export class StatusPipe implements PipeTransform {
  transform(value: boolean): string {
    return value ? '✔️ Available' : '❌ Unavailable';
  }
}
