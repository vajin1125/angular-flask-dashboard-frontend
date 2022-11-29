import {Injectable} from '@angular/core';
import { Http } from '@angular/http';
import {BaThemeConfigProvider, colorHelper, layoutPaths} from '../../../theme';
import 'rxjs/add/operator/map';

@Injectable()
export class NewLineChartService {

  mainData: Array<Object>;
  resultData: Object;

  constructor(private _baConfig:BaThemeConfigProvider, private _http: Http) {
  }

  getData() {

    var layoutColors = this._baConfig.get().colors;
    var graphColor = this._baConfig.get().colors.custom.dashboardLineChart;

    let date = new Date();
    let last_time = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + (date.getDate() - 1) + " " +  date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

    return this._http.post("http://localhost:5000/upload_download_for_graph", {"last_time": last_time})
      .map(response => response.json())
  }
}
