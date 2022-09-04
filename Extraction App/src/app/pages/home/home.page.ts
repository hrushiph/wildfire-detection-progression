import { Component } from '@angular/core';
import { ThemeList, ThemeService } from '@core/services/theme';
import { ROUTER_UTILS } from '@core/utils/router.utils';

@Component({
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.css'],
})
export class HomePage {
  path = ROUTER_UTILS.config;
  theme = ThemeList;
  public src:any;

  constructor(private themeService: ThemeService) {}

  onClickChangeTheme(theme: ThemeList, fromDate:any, toDate:any, regionSelection:any, satelliteImageType:any): void {
    console.log(regionSelection)
    this.themeService.setTheme(theme);
    console.log(fromDate)
    var currentDate = new Date(fromDate);
    var endDate = new Date(toDate);

    while(currentDate <= endDate) {
        currentDate = new Date(currentDate.setDate(currentDate.getDate()+1));
        console.log(currentDate.toISOString().split('T')[0]);
        this.src="./image.jpg"
        var url = 'https://wvs.earthdata.nasa.gov/api/v1/snapshot?REQUEST=GetSnapshot&&CRS=EPSG:4326&WRAP=DAY&LAYERS='
        var height = 800
        url += 'MODIS_Terra_CorrectedReflectance_Bands721' // Future integration with various satellite image type.
        url += '&FORMAT=image/jpeg&HEIGHT='+height+'&WIDTH='+height+'&BBOX='
        if(regionSelection == 'San Diego'){
          url += '36,-122,37,-121&TIME='
        } else {
          url += '34,-125,41,-120&TIME='
        }
        url += currentDate.toISOString().split('T')[0]
        var link;
        link = document.createElement('img');
        link.src = url;
        console.log(document.getElementsByClassName('image-container')[0])
        document.getElementsByClassName('image-container')[0].appendChild(link)
    }
  }


}
