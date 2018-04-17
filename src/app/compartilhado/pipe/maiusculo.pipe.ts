import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'maiusculoPipe'
})
export class MaiusculoPipe implements PipeTransform {

  transform(value: string): string {
    if (value) {
      return value.charAt(0)
        .toUpperCase()
        .concat(value.slice(1));
    }
    return value;
  }

}
