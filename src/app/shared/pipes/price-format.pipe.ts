import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'priceFormat'
})
export class PriceFormatPipe implements PipeTransform {

  transform(value: string, currencySymbol: string = '$'): string {
    if (value == null) return '';
    return currencySymbol + value;
    //value: number ..+ value.toFixed(2);
  }

}
