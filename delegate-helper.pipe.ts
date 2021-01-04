import { Pipe, PipeTransform } from '@angular/core';

@Pipe( {
    name: 'delegateHelper'
} )
export class DelegateHelperPipe implements PipeTransform {
    /**
     * Use this pipe to get value from helper function call and bind this value in template
     * If functions are called directly from template, the functions will be called every time angular runs change detection. This causes bad performance.
     */
    transform<T, R>( value: T, fn: ( data: T ) => R ): R | null {
        return fn( value );
    }
}
