// tslint:disable
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActionSequence } from 'protractor';
import { AqiService } from '../aqi.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-aqi',
  templateUrl: './aqi.component.html',
  styleUrls: ['./aqi.component.css']
})
export class AqiComponent implements OnInit {
  aqiForm: FormGroup;
  result;
  result2;
  date;
  good = false;
  satisfactory = false;
  moderate = false;
  poor = false;
  veryPoor = false;
  severe = false;
  dailyForecast = [];
  dailyForecastArray = [];
  url;
  weather;
  isDataAvailable = false;

  constructor(private formBuilder: FormBuilder, private aqiService: AqiService, private toastrService: ToastrService) { }

  ngOnInit() {
      this.createForm();
      this.getLocation();
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const coords = [];
        const coords2 = [];
        const newCoords = [];
        coords.push(position['coords']['latitude'])
        coords.push(position['coords']['longitude'])
        coords2.push({'lat' : position['coords']['latitude'], 'long' : position['coords']['longitude']})
        coords2.forEach((element, key) => {
          newCoords.push(element.lat + ';' + element.long);
        })
        this.aqiService.getAqiByLocation(coords.toString()).subscribe(res => {
          this.result = res;
          console.log('GET AQI BY LOCATION', this.result['results'].length)
          if( this.result['results'].length > 0 ) {
            this.isDataAvailable = true;
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
          } else if(this.result['results'].length == 0) {
            console.log('The Length is zero')
            this.toastrService.error('No data for the Current Location. Please try searching your city by name.')
          }
        });
        // GET Forecast for 7 days
        this.aqiService.getAqiForecast(newCoords.toString()).subscribe(res => {
          for (let i = 0; i < 2; i++ ) {
            this.dailyForecast.push(res.data.forecast.daily.pm25[i]);
          }
          this.dailyForecastArray = this.dailyForecast.filter((item , index) => this.dailyForecast.indexOf(item) === index)
        })
      })
    }
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
      this.aqiService.getCurrentWeather(coords2).subscribe(res => {
        this.weather = res;
      })
      coords2.forEach((element, key) => {
        newCoords.push(element.lat + ';' + element.long);
      })

      this.aqiService.getAqiByLocation(coords.toString()).subscribe(res => {
      this.result = res;
      this.isDataAvailable = true;
      if (this.result['results'][0]['measurements'][0]['value'] > 0 && this.result['results'][0]['measurements'][0]['value'] <= 50) {
        this.good = true;
        document.getElementById('aqi__stats').style.background = '#009966'
        this.url = '../../assets/girl.png'

        let slides = document.getElementsByClassName('aqi__dailyForecast');
        for(let i = 0; i < slides.length; i++) {
          slides[i]['style']['background'] = '#009966'
        }

      }
      if (this.result['results'][0]['measurements'][0]['value'] > 50 && this.result['results'][0]['measurements'][0]['value'] <= 100) {
        this.satisfactory = true;
        this.good = false;
        document.getElementById('aqi__stats').style.background = '#FFDE33'
        document.getElementById('aqi__dailyForecast').style.background =  '#FFDE33';
        this.url = '../../assets/neutral.png'

        let slides = document.getElementsByClassName('aqi__dailyForecast');
        for(let i = 0; i < slides.length; i++) {
          slides[i]['style']['background'] = '#FFDE33'
        }
      }
      if (this.result['results'][0]['measurements'][0]['value'] > 100 && this.result['results'][0]['measurements'][0]['value'] <= 200) {
        this.moderate = true;
        this.satisfactory = false;
        this.good = false;
        document.getElementById('aqi__stats').style.background = '#FF9933'
        document.getElementById('aqi__dailyForecast').style.background =  '#FF9933';
        this.url = '../../assets/sad.png'

        let slides = document.getElementsByClassName('aqi__dailyForecast');
        for(let i = 0; i < slides.length; i++) {
          slides[i]['style']['background'] = '#FF9933'
        }
      }
      if (this.result['results'][0]['measurements'][0]['value'] > 200 && this.result['results'][0]['measurements'][0]['value'] <= 300) {
        this.poor = true;
        this.moderate = false;
        this.satisfactory = false;
        this.good = false;
        document.getElementById('aqi__stats').style.background = '#CC0033'
        document.getElementById('aqi__dailyForecast').style.background =  '#CC0033';
        this.url = '../../assets/face-mask.png'

        let slides = document.getElementsByClassName('aqi__dailyForecast');
        for(let i = 0; i < slides.length; i++) {
          slides[i]['style']['background'] = '#CC0033'
        }
      }
      if (this.result['results'][0]['measurements'][0]['value'] > 300 && this.result['results'][0]['measurements'][0]['value'] <= 400) {
        this.veryPoor = true;
        this.poor = false;
        this.moderate = false;
        this.satisfactory = false;
        this.good = false;
        document.getElementById('aqi__stats').style.background = '#660099'
        document.getElementById('aqi__dailyForecast').style.background =  '#660099';
        this.url = '../../assets/gas_mask.png'

        let slides = document.getElementsByClassName('aqi__dailyForecast');
        for(let i = 0; i < slides.length; i++) {
          slides[i]['style']['background'] = '#660099'
        }
      }
      if (this.result['results'][0]['measurements'][0]['value'] > 400 && this.result['results'][0]['measurements'][0]['value'] <= 500) {
        this.severe = true;
        this.veryPoor = false;
        this.poor = false;
        this.moderate = false;
        this.satisfactory = false;
        this.good = false;
        document.getElementById('aqi__stats').style.background = '#7E0023'
        document.getElementById('aqi__dailyForecast').style.background =  '#7E0023';
        this.url = '../../assets/neutral.png'

        let slides = document.getElementsByClassName('aqi__dailyForecast');
        for(let i = 0; i < slides.length; i++) {
          slides[i]['style']['background'] = '#7E0023'
        }
      }
      this.date = new Date(this.result['results'][0]['measurements'][0]['lastUpdated']).toUTCString();
    });
    // GET Forecast for 7 days
    this.aqiService.getAqiForecast(newCoords.toString()).subscribe(res => {
      this.result2 = res;
      for (let i = 0; i < 2; i++ ) {
        this.dailyForecast.push(res.data.forecast.daily.pm25[i]);
      }
      for (let i = 0; i < this.dailyForecast.length; i++) {
        if (this.dailyForecast[i].day == this.dailyForecast[i + 1].day) {
            this.dailyForecastArray.splice(this.dailyForecastArray.indexOf(this.dailyForecastArray[i]), 1)
        }
    }
    })
    });
  }
}
