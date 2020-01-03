import { Pipe, PipeTransform } from '@angular/core';
import { IWowhead } from '../models/guildbank/wowhead.interface';
import * as config from '../../config/appconfig.json';
import { LANGUAGE_PREFERENCE } from '../shared/constants';

@Pipe({
  name: 'wowheadUrl'
})
export class WowheadUrlPipe implements PipeTransform {

  transform(value: IWowhead, args?: any): any {
    let lang = localStorage.getItem(LANGUAGE_PREFERENCE);
    if(!lang)
      lang = "en";
    
      if( !value.id )
        return "_blank";
        
    return `//${config.wowhead[lang]}/item=${value.id}`;
  }

}
