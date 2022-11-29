import {Component} from '@angular/core';

import {BandWidthService} from './bandWidth.service';

import {BaThemeConfigProvider, colorHelper, layoutPaths} from '../../../theme';

@Component({
  selector: 'bandwidth',
  templateUrl: './bandwidth.html',
  styleUrls: ['./bandwidth.scss']
})

export class BandWidth {

  chartData: Object;
  mainData: Object;
  isDataAvailable: boolean;
  interval: any;
  storeData = [];

  constructor(private _bandWidthService:BandWidthService, private _baConfig:BaThemeConfigProvider) {
    this.chartData = {}
    this.isDataAvailable = false;
  }

  ngOnInit() {
    this.interval = setInterval(() => {
      this.isDataAvailable = false;
      this.checkUpdate();
    }, 5*1000);
  }

  checkUpdate() {
    this._bandWidthService.getData()
    .subscribe(
      data => {
        this.mainData = data;
        // console.log("mainData:", this.mainData);
        this.chartData = this.makeObject();
        this.isDataAvailable = true;
      },
      error => console.log(error)
    );
  }

  makeObject() {
    
    if (sessionStorage.bw_chartData !== '') {
      sessionStorage.bw_chartData = sessionStorage.bw_chartData + ',' + JSON.stringify(this.mainData);
    } else {
      sessionStorage.bw_chartData = sessionStorage.bw_chartData + JSON.stringify(this.mainData);
    }
    // console.log("sessionStorage:", sessionStorage.bw_chartData);
    this.storeData = JSON.parse('[' + sessionStorage.bw_chartData + ']');
    // console.log("storeData", this.storeData);
    var layoutColors = this._baConfig.get().colors;
    var graphColor = this._baConfig.get().colors.custom.dashboardLineChart;

    return {
      type: 'serial',
      theme: 'blur',
      marginTop: 15,
      marginRight: 0,
      responsive: {
        'enabled': true
      },
      dataProvider: this.storeData,
      categoryField: 'time',
      categoryAxis: {
        parseDates: false,
        gridAlpha: 0,
        labelRotation: 10,
        color: layoutColors.defaultText,
        axisColor: layoutColors.defaultText,
        labelsEnabled: false
      },
      valueAxes: [
        {
          minVerticalGap: 50,
          gridAlpha: 0,
          color: layoutColors.defaultText,
          axisColor: layoutColors.defaultText
        }
      ],
      graphs: [
        {
          id: 'g0',
          bullet: 'none',
          useLineColorForBulletBorder: true,
          lineColor: colorHelper.hexToRgbA(graphColor, 0.3),
          lineThickness: 1,
          negativeLineColor: layoutColors.danger,
          type: 'smoothedLine',
          valueField: 'upload',
          fillAlphas: 1,
          fillColorsField: 'lineColor'
        },
        {
          id: 'g1',
          bullet: 'none',
          useLineColorForBulletBorder: true,
          lineColor: colorHelper.hexToRgbA(graphColor, 0.15),
          lineThickness: 1,
          negativeLineColor: layoutColors.danger,
          type: 'smoothedLine',
          valueField: 'download',
          fillAlphas: 1,
          fillColorsField: 'lineColor'
        }
      ],
      chartCursor: {
        categoryBalloonEnabled: false,
        categoryBalloonDateFormat: 'YYYY-MM-DD HH:mm:ss',
        categoryBalloonColor: '#4285F4',
        categoryBalloonAlpha: 0.7,
        cursorAlpha: 0,
        valueLineEnabled: true,
        valueLineBalloonEnabled: true,
        valueLineAlpha: 0.5
      },
      dataDateFormat: 'YYYY-MM-DD HH:mm:ss',
      export: {
        enabled: true
      },
      creditsPosition: 'bottom-right',
      zoomOutButton: {
        backgroundColor: '#fff',
        backgroundAlpha: 0
      },
      zoomOutText: '',
      pathToImages: layoutPaths.images.amChart
    };         
  }
}