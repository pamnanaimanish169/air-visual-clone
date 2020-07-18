import { Component, OnInit } from '@angular/core';
import { AqiService } from './aqi.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'air-visual-clone';

  constructor(private aqiService: AqiService) {}

  ngOnInit() {
    this.aqiService.getAqiOfCountries().subscribe(res => {
      console.log('AQI BY Countries', res);
    });

    this.aqiService.getAqiOfCities().subscribe(res => {
      console.log('AQI By Cities', res);
    });

    this.aqiService.getAqiByLocation('alwar').subscribe(res => {
      console.log('AQI by City Name', res);
    })
  }
}
