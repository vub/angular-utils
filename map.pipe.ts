import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'map'
})
export class MapPipe implements PipeTransform {
  public transform(value: string, mapFn: (input: any) => any): any {
    return mapFn(value);
  }
}
