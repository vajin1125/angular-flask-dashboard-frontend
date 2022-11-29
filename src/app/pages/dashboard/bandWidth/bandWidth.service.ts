import {Injectable} from '@angular/core';
import { Http } from '@angular/http';
import {BaThemeConfigProvider, colorHelper, layoutPaths} from '../../../theme';
import 'rxjs/add/operator/map';

@Injectable()
export class BandWidthService {
  storeData = [];

  constructor(private _baConfig:BaThemeConfigProvider, private _http: Http) {
  }
  
  getData() {

    return this._http.get("http://localhost:5000/bandwidth")
      .map(response => response.json())


    // let item = [];
    

    // let nowtime = new Date().toISOString();
    // let ran1 = Math.round( Math.random() * 40) - 20;
    // let ran2 = Math.round( Math.random() * 40) - 20;
    // item.push(
    //   {
    //     "time": nowtime,
    //     "download": ran1,
    //     "upload": ran2
    //   }
    // );
    // return item;

    
  }
}
