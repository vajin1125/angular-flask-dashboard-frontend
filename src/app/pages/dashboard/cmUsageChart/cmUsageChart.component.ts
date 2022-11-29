import {Component} from '@angular/core';

import {CmUsageChartService} from './cmUsageChart.service';

import {BaThemeConfigProvider, colorHelper, layoutPaths} from '../../../theme';


@Component({
  selector: 'cmusage-chart',
  templateUrl: './cmUsageChart.html',
  styleUrls: ['./cmUsageChart.scss']
})
export class CmUsageChart {

  chartData:Object;
  mainData: Object;
  isDataAvailable: boolean;
  interval: any;
  storeData = [];

  constructor(private _cmUsageChartService:CmUsageChartService, private _baConfig:BaThemeConfigProvider) {
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
    this._cmUsageChartService.getData()
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

    if (sessionStorage.cm_chartData !== '') {
      sessionStorage.cm_chartData = sessionStorage.cm_chartData + ',' + JSON.stringify(this.mainData);
    } else {
      sessionStorage.cm_chartData = sessionStorage.cm_chartData + JSON.stringify(this.mainData);
    }
    // console.log("sessionStorage:", sessionStorage.cm_chartData);
    this.storeData = JSON.parse('[' + sessionStorage.cm_chartData + ']');
    // console.log("storeData", this.storeData);

    var layoutColors = this._baConfig.get().colors;
    var graphColor = this._baConfig.get().colors.custom.dashboardLineChart;

    return {
      type: 'serial',
      theme: 'blur',
      marginTop: 15,
      marginRight: 15,
      responsive: {
        'enabled': true
      },
      dataProvider: this.storeData,
      categoryField: 'time',
      categoryAxis: {
        parseDates: false,
        gridAlpha: 0,
        labelRotation: 20,
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
          valueField: 'cpu',
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
          valueField: 'memory',
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
