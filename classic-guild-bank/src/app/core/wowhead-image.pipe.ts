import { Pipe, PipeTransform } from '@angular/core';
import { Item } from '../models/guildbank/item';
import { IWowhead } from '../models/guildbank/wowhead.interface';

@Pipe({
  name: 'wowheadImage'
})
export class WowheadImagePipe implements PipeTransform {

  transform(value: IWowhead, args?: any): any {
      let size = 'medium';
      if (args.size)
        size = args.size;

    return `//wow.zamimg.com/images/wow/icons/${size}/${value.icon}.jpg`;
  }

}
