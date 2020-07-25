// tslint:disable
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActionSequence } from 'protractor';
import { AqiService } from '../aqi.service';

@Component({
  selector: 'app-aqi',
  templateUrl: './aqi.component.html',
  styleUrls: ['./aqi.component.css']
})
export class AqiComponent implements OnInit {
  aqiForm: FormGroup;
  result;
  date;
  good = false;
  satisfactory = false;
  moderate = false;
  poor = false;
  veryPoor = false;
  severe = false;
  dailyForecast = [];

  constructor(private formBuilder: FormBuilder, private aqiService: AqiService) { }

  ngOnInit() {
      this.createForm();
  }

  createForm() {
    this.aqiForm = this.formBuilder.group({
      aqiInput: ['', Validators.required]
    });
  }

  onSubmit() {
    this.aqiService.getCoordinates(this.aqiForm.controls['aqiInput'].value).subscribe(res => {
      const coords = [];
      const coords2 = [];
      const newCoords = [];
      coords.push(res.latt);
      coords.push(res.longt);
      coords2.push({'lat' : res.latt, 'long' : res.longt})
      coords2.forEach((element, key) => {
        console.log( element.lat + ';' + element.long )
        newCoords.push(element.lat + ';' + element.long);
      })
      console.log('newCoords' , newCoords);

      this.aqiService.getAqiByLocation(coords.toString()).subscribe(res => {
      this.result = res;
      console.log(this.result);
      if (this.result['results'][0]['measurements'][0]['value'] > 0 && this.result['results'][0]['measurements'][0]['value'] <= 50) {
        this.good = true;
      }
      if (this.result['results'][0]['measurements'][0]['value'] > 50 && this.result['results'][0]['measurements'][0]['value'] <= 100) {
        this.satisfactory = true;
        this.good = false;
      }
      if (this.result['results'][0]['measurements'][0]['value'] > 100 && this.result['results'][0]['measurements'][0]['value'] <= 200) {
        this.moderate = true;
        this.satisfactory = false;
        this.good = false;
      }
      if (this.result['results'][0]['measurements'][0]['value'] > 200 && this.result['results'][0]['measurements'][0]['value'] <= 300) {
        this.poor = true;
        this.moderate = false;
        this.satisfactory = false;
        this.good = false;
      }
      if (this.result['results'][0]['measurements'][0]['value'] > 300 && this.result['results'][0]['measurements'][0]['value'] <= 400) {
        this.veryPoor = true;
        this.poor = false;
        this.moderate = false;
        this.satisfactory = false;
        this.good = false;
      }
      if (this.result['results'][0]['measurements'][0]['value'] > 400 && this.result['results'][0]['measurements'][0]['value'] <= 500) {
        this.severe = true;
        this.veryPoor = false;
        this.poor = false;
        this.moderate = false;
        this.satisfactory = false;
        this.good = false;
      }
      this.date = new Date(this.result['results'][0]['measurements'][0]['lastUpdated']).toUTCString();
    });
    // GET Forecast for 7 days
    this.aqiService.getAqiForecast(newCoords.toString()).subscribe(res => {
      console.log('FORECAST', res);
      console.log('7 DAYS', res.data.forecast.daily.pm25)
      // res.data.forecast.daily.pm25.forEach((element, key) => {
      //   console.log(element)
      //   this.dailyForecast.push(element);
      // })
      for (let i = 0; i < 2; i++ ) {
        this.dailyForecast.push(res.data.forecast.daily.pm25[i]);
      }
      this.dailyForecast = this.dailyForecast.filter((item , index) => this.dailyForecast.indexOf(item) === index)
      console.log(this.dailyForecast)
    })
    });
  }
}
