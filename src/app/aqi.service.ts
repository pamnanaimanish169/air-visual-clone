// tslint:disable
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
  waqiApiUrl = `${environment.waqAPIUrl}`;
  waqiApiKey = `${environment.waqAPIKey}`;

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

  getAqiByLocation(coord) {
    return this.http.get<any>(this.apiUrl + `latest?coordinates=` + coord)
      .pipe(map(res => {
        return res;
      }));
  }

  getCoordinates(cityName) {
    return this.http.get<any>('https://cors-anywhere.herokuapp.com/https://geocode.xyz/' + cityName + '?json=1')
      .pipe(map(res => {
        return res;
      }));
  }

  getAqiForecast(coord) {
    // https://api.waqi.info/feed/geo:10.3;20.7/?token=demo
    console.log(this.waqiApiUrl + 'geo:' + coord + '/?token=' + this.waqiApiKey)
    return this.http.get<any>(this.waqiApiUrl + 'geo:' + coord + '/?token=' + this.waqiApiKey)
      .pipe(map(res => {
        return res;
      }));
  }
}
