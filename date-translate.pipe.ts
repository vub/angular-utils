import { Pipe, PipeTransform, ɵstringify as stringify, ChangeDetectorRef } from '@angular/core';
import * as moment from 'moment';
import { TranslateService, TranslatePipe } from '@ngx-translate/core';

@Pipe({
  name: 'datetranslate',
  pure: false
})
export class DateTranslatePipe  implements PipeTransform {

translatePipe: TranslatePipe;

constructor(private translate: TranslateService, private _ref: ChangeDetectorRef) {
  this.translatePipe = new TranslatePipe(translate, _ref);
 }

  transform(value: Date, query: string, ...args: any[]): any {
    const format = this.translatePipe.transform(query, args);
    return moment(value).format(format);
  }
}
