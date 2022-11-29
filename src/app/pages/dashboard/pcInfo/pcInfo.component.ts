import {Component} from '@angular/core';

import {PcInfoService} from './pcInfo.service';
import {BaThemeConfigProvider, colorHelper} from '../../../theme';

import 'easy-pie-chart/dist/jquery.easypiechart.js';

@Component({
    selector: 'pc-info',
    templateUrl: './pcInfo.html',
    styleUrls: ['./pcInfo.scss']
})

export class PcInfo {

  public charts: any;
  private _init = false;
  mainData: Array<Object>;
  defaultChart: any;
  changed:boolean;
  
  constructor(private _pcInfoService: PcInfoService, private _baConfig:BaThemeConfigProvider) {
    this.changed = false;
  }

  ngOnInit() {
    this._pcInfoService.getData()
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
        description: 'CPU',
        stats: this.mainData['cpu_usage'],
        icon: 'person',
      }, {
        color: pieColor,
        description: 'MEM',
        stats: this.mainData['memory_usage'],
        icon: 'money',
      }, {
        color: pieColor,
        description: 'HDD',
        stats: this.mainData['hd_free_percent'],
        icon: 'face',
      }
    ];
  }

  ngAfterViewChecked()	
  {
    if(this.changed){
      console.log("ng view after init")
      this._loadPcPieCharts();
      this._updatePcPieCharts();
      this.changed = false;
    }
  }

  ngAfterViewInit() {
    if (!this._init) {
      console.log("ng view init");
      this._init = true;
    }
  }
  
  private _loadPcPieCharts() {

    jQuery('.chart-pc').each(function () {
      let chart = jQuery(this);
      chart.easyPieChart({
        easing: 'easeOutBounce',
        onStep: function (from, to, percent) {
          jQuery(this.el).find('.percent-pc').text();
        },
        barColor: jQuery(this).attr('data-rel-pc'),
        trackColor: 'rgba(0,0,0,0)',
        size: 84,
        scaleLength: 0,
        animation: 2000,
        lineWidth: 9,
        lineCap: 'round',
      });
    });
  }
  
  private _updatePcPieCharts() {;
    let stateValue = []  
    let i = 0;
    jQuery('.description-stats-pc').each(function() {
      stateValue.push(jQuery(this).text());
    });
    jQuery('.pie-charts-pc .chart-pc').each(function(index, chart) {
      jQuery(chart).data('easyPieChart').update(stateValue[i]);
      i ++;
    });
  }
}
