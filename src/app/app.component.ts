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
  }
}
