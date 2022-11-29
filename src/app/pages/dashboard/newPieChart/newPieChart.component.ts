import {Component} from '@angular/core';

import {NewPieChartService} from './newPieChart.service';
import {BaThemeConfigProvider, colorHelper} from '../../../theme';

import 'easy-pie-chart/dist/jquery.easypiechart.js';

@Component({
    selector: 'new-pie-chart',
    templateUrl: './newPieChart.html',
    styleUrls: ['./newPieChart.scss']
})

export class NewPieChart {

  public charts: any;
  private _init = false;
  mainData: Array<Object>;
  defaultChart: any;
  changed:boolean;
  
  constructor(private _newPieChartService: NewPieChartService, private _baConfig:BaThemeConfigProvider) {
    this.changed = false;
  }

  ngOnInit() {
    this._newPieChartService.getData()
    .subscribe(
      data => {
        this.mainData = data;
        this.charts = this.makeChartValue();
        this.changed = true;
      },
      error => console.log(error)
    );
  }

  makeChartValue() {
    let pieColor = this._baConfig.get().colors.custom.dashboardPieChart;
    return [
      {
        color: pieColor,
        description: 'Total',
        stats: this.mainData['total_count'],
        icon: 'refresh',
      }, {
        color: pieColor,
        description: 'Uploads',
        stats: this.mainData['upload_count'],
        icon: 'upload',
      }, {
        color: pieColor,
        description: 'Downloads',
        stats: this.mainData['download_count'],
        icon: 'download',
      }, {
        color: pieColor,
        description: 'Logged Users',
        stats: this.mainData['user_count'],
        icon: 'person',
      }
    ];
  }

  ngAfterViewChecked()	
  {
    if(this.changed){
      this._loadNewPieCharts();
      this._updateNewPieCharts();
      this.changed = false;
    }
  }

  ngAfterViewInit() {
    if (!this._init) {
      console.log("ng after view init");
      this._init = true;
    }
  }
  
  private _loadNewPieCharts() {

    jQuery('.chart').each(function () {
      let chart = jQuery(this);
      chart.easyPieChart({
        easing: 'easeOutBounce',
        onStep: function (from, to, percent) {
          jQuery(this.el).find('.percent').text(Math.round(percent));
        },
        barColor: jQuery(this).attr('data-rel'),
        trackColor: 'rgba(0,0,0,0)',
        size: 84,
        scaleLength: 0,
        animation: 2000,
        lineWidth: 9,
        lineCap: 'round',
      });
    });
  }
  
  private _updateNewPieCharts() {
    let getRandomArbitrary = (min, max) => { return Math.random() * (max - min) + min; };

    jQuery('.pie-charts .chart').each(function(index, chart) {
      jQuery(chart).data('easyPieChart').update(getRandomArbitrary(55, 90));
    });
  }
}
