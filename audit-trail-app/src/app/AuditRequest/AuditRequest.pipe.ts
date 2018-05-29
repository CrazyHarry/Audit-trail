import { Pipe, PipeTransform } from '@angular/core';
/*
 * Maps a few english words to their dutch equivalents
 * 
 * Usage:
 *   value | StateToDutch
 * Example:
 *   {{ UNDERREVISION | StateToDutch }}
 *   formats to: 'Onder Revisie'
*/
@Pipe({name: 'AuditRequestTranslatePipe'})
export class AuditRequestTranslatePipe implements PipeTransform {
  transform(value: string): string {
    
    let mapping = {
        'REQUESTED': 'Aangevraagd',
        'UNDERREVISION': 'Onder Revisie',
        'DONE': 'Afgerond'
    };

    return mapping[value];
  }
}