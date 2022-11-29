import {Injectable} from '@angular/core';
import { Http } from '@angular/http';
import {BaThemeConfigProvider, colorHelper} from '../../../theme';
import 'rxjs/add/operator/map';

@Injectable()
export class PcInfoService {

  constructor(private _baConfig:BaThemeConfigProvider, private _http: Http) {
  }

  getData() {
    let pieColor = this._baConfig.get().colors.custom.dashboardPieChart;
    let date = new Date();
    let time1 = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " +  date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    let time2 = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + (date.getDate() - 1) + " " +  date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

    return this._http.get("http://localhost:5000/machine_info")
                          .map(response => response.json())
  }
}