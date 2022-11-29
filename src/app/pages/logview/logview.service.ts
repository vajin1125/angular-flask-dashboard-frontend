import {Injectable} from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class LogviewService {

  constructor(private _http: Http) {}

  getData() {
    return this._http.get("http://localhost:5000/activity")
                      .map(response => response.json());
  }
}