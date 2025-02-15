import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private url = environment.API_URL;
  private apiKey = environment.API_KEY;

  constructor(private http: HttpClient) { }

  getWeather(locationName: string): Promise<any> {
    return lastValueFrom(this.http.get<any>(`${this.url}weather?q=${locationName}&appid=${this.apiKey}&units=metric`));
  }

  getWeatherForecast(lat: any, long: any) {
    return lastValueFrom(this.http.get<any>(`${this.url}forecast?lat=${lat}&lon=${long}&appid=${this.apiKey}`));
  }
}
