import {Component} from '@angular/core';

import {LogviewService} from '../../logview.service';

@Component({
  selector: 'hover-table',
  templateUrl: './hoverTable.html'
})
export class HoverTable {

  metricsTableData: any;

  constructor(private _basicTablesService: LogviewService) {   
  }

  ngOnInit() {
    this._basicTablesService.getData()
      .subscribe(
        data => this.metricsTableData = data,
        error => console.log(error),
        //() => console.log("TableData!:", this.metricsTableData)
      );
  }
}
