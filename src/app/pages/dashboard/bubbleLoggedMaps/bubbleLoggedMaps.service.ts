import {Injectable} from '@angular/core';
import { Http } from '@angular/http';
import {BaThemeConfigProvider, layoutPaths} from '../../../theme';
import 'rxjs/add/operator/map';

@Injectable()
export class BubbleLoggedMapsService {

  constructor(private _baConfig:BaThemeConfigProvider, private _http: Http) {
  }

  getData() {
    return this._http.get("http://localhost:5000/logged_users_counts_per_country")
      .map(response => response.json())
  }
}
