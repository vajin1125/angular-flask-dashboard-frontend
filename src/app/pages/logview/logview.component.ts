import { Component } from '@angular/core';

import { LogviewService } from './logview.service';

@Component({
    selector: 'logview',
    templateUrl: './logview.html',
    styleUrls: ['./logview.scss'],
    providers: [LogviewService]
})
export class LogviewComponent {

  getData: Array<Object>;

  constructor(private _logviewService:LogviewService) {}

  ngOnInit() {
    this._loadLogData();
  }

  private _loadLogData() {
    this._logviewService.getData()
      .subscribe(
        data => this.getData = data,
        error => console.log(error)
      );
  }
}