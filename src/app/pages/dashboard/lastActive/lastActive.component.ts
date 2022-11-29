import { Component } from '@angular/core';

import { LastActiveService } from './lastActive.service';


@Component({
    selector: 'last-active',
    templateUrl: './lastActive.html',
    styleUrls: ['./lastActive.scss']
})
export class LastActive {

  metricsTableData: any;

  constructor(private _basicTablesService: LastActiveService) {   
  }

  ngOnInit() {
    this._basicTablesService.getData()
      .subscribe(
        data => this.metricsTableData = data,
        error => console.log(error)
      );
  }
  }