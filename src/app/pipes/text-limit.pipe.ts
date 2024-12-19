import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'textLimit'
})
export class TextLimitPipe implements PipeTransform {

  transform(value: string | undefined, limit: number): string {
    if (!value) {
      return '';
    }
    return value.length > limit ? value.substring(0, limit) + '...' : value;
  }
}
