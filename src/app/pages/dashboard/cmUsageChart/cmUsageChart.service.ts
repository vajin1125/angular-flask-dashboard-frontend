import {Injectable} from '@angular/core';
import { Http } from '@angular/http';
import {BaThemeConfigProvider, colorHelper, layoutPaths} from '../../../theme';
import 'rxjs/add/operator/map';

@Injectable()
export class CmUsageChartService {

  constructor(private _baConfig:BaThemeConfigProvider, private _http: Http) {
  }

  getData() {
    
    return this._http.get("http://localhost:5000/cpu_mem_usage_graph")
      .map(response => response.json())
  }
}
