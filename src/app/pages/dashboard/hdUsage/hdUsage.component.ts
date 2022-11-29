import {Component} from '@angular/core';

import {HdUsageService} from './hdUsage.service';
import {BaThemeConfigProvider, colorHelper} from '../../../theme';

import * as Chart from 'chart.js';

@Component({
  selector: 'hd-usage',
  templateUrl: './hdUsage.html',
  styleUrls: ['./hdUsage.scss']
})

// TODO: move chart.js to it's own component
export class HdUsage {

  public doughnutData: Array<Object>;
  changed:boolean;
  mainData: Array<Object>;

  constructor(private hdUsageService:HdUsageService, private _baConfig:BaThemeConfigProvider) {
    // this.doughnutData = hdUsageService.getData();
    this.changed = false;
  }

  ngOnInit() {
    this.hdUsageService.getData()
    .subscribe(
      data => {
        this.mainData = data;
        // console.log("hdData:", this.mainData);
        this.doughnutData = this.makeChartValue();
        this.changed = true;
      },
      error => console.log(error)
    );
  }

  // ngAfterViewInit() {
  //   this._loadDoughnutCharts();
  // }

  makeChartValue() {
    let dashboardColors = this._baConfig.get().colors.dashboard;
    let colors = [
      'white', 
      'gossip', 
      'silverTree', 
      'silverTree', 
      'surfieGreen', 
      'blueStone'
    ];
    let finalData = [];
    let i = 0;
    this.mainData.forEach(drive => {
      let color = colors[i];
      // console.log('colors', color)
      let drive_item = {
        value: drive['total'],
        color: dashboardColors[color],
        highlight: colorHelper.shade(dashboardColors[color], 15),
        label: drive['device'],
        percentage: drive['percent'],
      }
      i ++;
      // console.log("drive_item", drive_item)
      finalData.push(drive_item);
    });
    // console.log("finalData", finalData);
    return finalData;
  }

  // private _loadDoughnutCharts() {
  //   let el = jQuery('.chart-area').get(0) as HTMLCanvasElement;
  //   new Chart(el.getContext('2d')).Doughnut(this.doughnutData, {
  //     segmentShowStroke: false,
  //     percentageInnerCutout : 64,
  //     responsive: true
  //   });
  // }
}
