import {Injectable} from '@angular/core';
import { Http } from '@angular/http';
import {BaThemeConfigProvider, colorHelper} from '../../../theme';
import 'rxjs/add/operator/map';

@Injectable()
export class NewPieChartService {

  constructor(private _baConfig:BaThemeConfigProvider, private _http: Http) {
  }

  getData() {
    let pieColor = this._baConfig.get().colors.custom.dashboardPieChart;
    let date = new Date();
    let time1 = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " +  date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    let time2 = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + (date.getDate() - 1) + " " +  date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

    return this._http.post("http://localhost:5000/total_upload_download_counts", {'now_time': time1, "last_time": time2})
                          .map(response => response.json())
  }
}