import {Component} from '@angular/core';

import {NewLineChartService} from './newLineChart.service';

import {BaThemeConfigProvider, colorHelper, layoutPaths} from '../../../theme';

@Component({
  selector: 'new-line-chart',
  templateUrl: './newLineChart.html',
  styleUrls: ['./newLineChart.scss']
})

export class NewLineChart {

  chartData: Object;
  mainData: Array<Object>;
  isDataAvailable: boolean;

  constructor(private _newLineChartService:NewLineChartService, private _baConfig:BaThemeConfigProvider) {
    this.chartData = {}
    this.isDataAvailable = false;
  }

  ngOnInit() {
    this._newLineChartService.getData()
    .subscribe(
      data => {
        this.mainData = data;
        this.chartData = this.makeObject();
        this.isDataAvailable = true;
      },
      error => console.log(error)
    );
  }

  makeObject() {
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
      dataProvider: this.mainData,
      categoryField: 'time',
      categoryAxis: {
        parseDates: false,
        gridAlpha: 0,
        labelRotation: 20,
        color: layoutColors.defaultText,
        axisColor: layoutColors.defaultText
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

  // initChart(chart:any) {
  //   let zoomChart = () => {
  //     chart.zoomToDates(new Date(2013, 3), new Date(2014, 0));
  //   };

  //   chart.addListener('rendered', zoomChart);
  //   zoomChart();

  //   if (chart.zoomChart) {
  //     chart.zoomChart();
  //   }
  // }
}