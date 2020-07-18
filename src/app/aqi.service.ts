import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

// https://docs.openaq.org/#api-Locations-GetV1Locations

export class AqiService {
  apiUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) { }

  getAqiOfCountries() {
    return this.http.get<any>(this.apiUrl + `countries`)
      .pipe(map(res => {
        return res;
      }));
  }

  getAqiOfCities() {
    return this.http.get<any>(this.apiUrl + `cities`)
      .pipe(map(res => {
        return res;
      }));
  }

  getAqiByLocation(location) {
    return this.http.get<any>(this.apiUrl + `?location[]=` + location)
      .pipe(map(res => {
        return res;
      }));
  }
}
