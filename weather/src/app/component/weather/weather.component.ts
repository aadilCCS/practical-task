import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { WeatherService } from '../../service/weather.service';

@Component({
  selector: 'app-weather',
  imports: [FormsModule, CommonModule],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.scss'
})
export class WeatherComponent implements OnInit {

  locationName: string = 'Jakarta';
  weatherData: any;
  forecastData: any[] = [];
  iconUrl: string = '';
  currentDate: any = '';
  loading: boolean = false;
  error = false;

  constructor(
    private _weatherService: WeatherService
  ) { }

  ngOnInit(): void {
    this.getWeather()
  }

  // get weather data
  async getWeather() {
    this.loading = true;

    try {
      const response = await this._weatherService.getWeather(this.locationName);
      this.weatherData = response;
      if (response) {
        try {
          const result = await this._weatherService.getWeatherForecast(response?.coord?.lat, response?.coord?.lon);
          this.processForecastData(result?.list);
          this.loading = false;
          this.error = false;
        } catch (error) {
          this.error = true;
        }
      }
    } catch (error) {
      this.error = true;
    }

  }

  // convert kelvin to celcius
  private convertKelvinToCelsius(kelvin: number): number {
    return parseFloat((kelvin - 273.15).toFixed(2));
  }

  //  Process forecast data
  processForecastData(forecastList: any[]) {
    const dailyData = new Map<string, any>();

    forecastList.forEach(item => {
      const date = item.dt_txt.split(' ')[0];
      if (!dailyData.has(date)) {
        dailyData.set(date, {
          date: date,
          temp_min: this.convertKelvinToCelsius(item.main.temp_min),
          temp_max: this.convertKelvinToCelsius(item.main.temp_max),
          weather: item.weather[0],
          humidity: item.main.humidity,
          wind: item.wind.speed
        });
      } else {
        const existing = dailyData.get(date);
        if (item.main.temp_min < existing.temp_min) {
          existing.temp_min = this.convertKelvinToCelsius(item.main.temp_min);
        }
        if (item.main.temp_max > existing.temp_max) {
          existing.temp_max = this.convertKelvinToCelsius(item.main.temp_max);
        }
      }
    });

    // Convert Map to array and take next 5 days
    this.forecastData = Array.from(dailyData.values()).slice(0, 5);
  }
}
