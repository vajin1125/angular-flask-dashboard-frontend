import {Injectable} from '@angular/core';
import { Http } from '@angular/http';
import {BaThemeConfigProvider, colorHelper} from '../../../theme';
import 'rxjs/add/operator/map';

@Injectable()
export class HdUsageService {

  constructor(private _baConfig:BaThemeConfigProvider, private _http: Http) {
  }
  
  getData() {
    return this._http.get("http://localhost:5000/hdd_list")
      .map(response => response.json())
  }
}
