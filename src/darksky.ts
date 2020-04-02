import { retry } from './util';
import type { WeatherForecastSource } from './WeatherForecastSource';

type DarkSkyIcon =
  | 'clear-day'
  | 'clear-night'
  | 'rain'
  | 'snow'
  | 'sleet'
  | 'wind'
  | 'fog'
  | 'cloudy'
  | 'partly-cloudy-day'
  | 'partly-cloudy-night';

interface DarkSkyApiResponse {
  latitude: number;
  longitude: number;
  timezone: string;
  daily: {
    summary: string;
    icon: DarkSkyIcon;
    data: {
      time: number;
      summary: string;
      icon: DarkSkyIcon;
      sunriseTime: number;
      sunsetTime: number;
      moonPhase: number;
      precipIntensity: number;
      precipIntensityMax: number;
      precipIntensityMaxTime: number;
      precipProbability: number;
      temperatureHigh: number;
      temperatureHighTime: number;
      temperatureLow: number;
      temperatureLowTime: number;
      apparentTemperatureHigh: number;
      apparentTemperatureHighTime: number;
      apparentTemperatureLow: number;
      apparentTemperatureLowTime: number;
      dewPoint: number;
      humidity: number;
      pressure: number;
      windSpeed: number;
      windGust: number;
      windGustTime: number;
      windBearing: number;
      cloudCover: number;
      uvIndex: number;
      uvIndexTime: number;
      visibility: number;
      ozone: number;
      temperatureMin: number;
      temperatureMinTime: number;
      temperatureMax: number;
      temperatureMaxTime: number;
      apparentTemperatureMin: number;
      apparentTemperatureMinTime: number;
      apparentTemperatureMax: number;
      apparentTemperatureMaxTime: number;
      precipType?: 'rain' | 'snow' | 'sleet';
    }[];
  };
  offset: number;
}

function GetWearherForecastToDarkSkyApi(latitude: number, longitude: number): DarkSkyApiResponse {
  const key = PropertiesService.getScriptProperties().getProperty('SECRETKEY');
  const exclude = ['currently', 'minutely', 'hourly', 'flags'].join(',');
  const lang = 'ja';
  const units = 'si';
  const apiurl = `https://api.darksky.net/forecast/${key}/${latitude},${longitude}?exclude=${exclude}&lang=${lang}&units=${units}`;

  return retry(3, () => {
    const responseJson = UrlFetchApp.fetch(apiurl).getContentText('UTF-8');
    const response: DarkSkyApiResponse = JSON.parse(responseJson);
    return response;
  });
}

const wearherIconUrl: { [key in DarkSkyIcon]: string } = {
  'clear-day':
    'https://1.bp.blogspot.com/-kcV5lUNVWjk/U9y_l53j6tI/AAAAAAAAjfc/ksZGpirKWfM/s150/tenki_mark01_hare.png',
  'clear-night':
    'https://2.bp.blogspot.com/-G0CvtIOQG3E/U9y_quu2IvI/AAAAAAAAjgs/VSRUWB4o9CQ/s150/tenki_mark12_tsuki.png',
  rain:
    'https://2.bp.blogspot.com/-120u1M2QEG8/U9y_mbeQkyI/AAAAAAAAjfk/St-jEzWtD4I/s150/tenki_mark02_ame.png',
  snow:
    'https://4.bp.blogspot.com/-K6V3exUfXFk/U9y_pCc1rKI/AAAAAAAAjgQ/IfF_XxmCEy0/s150/tenki_mark08_yuki.png',
  sleet:
    'https://2.bp.blogspot.com/-120u1M2QEG8/U9y_mbeQkyI/AAAAAAAAjfk/St-jEzWtD4I/s150/tenki_mark02_ame.png',
  wind:
    'https://4.bp.blogspot.com/-22AkJ4RfDx8/U9y_noGiRSI/AAAAAAAAjf4/SeSbXunubXQ/s150/tenki_mark05_kumori.png',
  fog:
    'https://3.bp.blogspot.com/-cxYF1nh7jgQ/WOdEAeCvVEI/AAAAAAABDng/JSPTXndnhJEL5qh67Zq5N9Tz12X6svdMQCLcB/s400/yama_kiri.png',
  cloudy:
    'https://4.bp.blogspot.com/-22AkJ4RfDx8/U9y_noGiRSI/AAAAAAAAjf4/SeSbXunubXQ/s150/tenki_mark05_kumori.png',
  'partly-cloudy-day':
    'https://4.bp.blogspot.com/-22AkJ4RfDx8/U9y_noGiRSI/AAAAAAAAjf4/SeSbXunubXQ/s150/tenki_mark05_kumori.png',
  'partly-cloudy-night':
    'https://4.bp.blogspot.com/-22AkJ4RfDx8/U9y_noGiRSI/AAAAAAAAjf4/SeSbXunubXQ/s150/tenki_mark05_kumori.png',
};

export const getForecast: WeatherForecastSource = day => {
  const forecast = GetWearherForecastToDarkSkyApi(36.366503, 140.470997);
  const daily = forecast.daily.data[day === 'today' ? 0 : 1];
  const date = new Date(daily.time * 1000);
  return {
    date,
    avatar: wearherIconUrl[daily.icon],
    summary: daily.summary,
    url: `https://darksky.net/forecast/${forecast.latitude},${forecast.longitude}/si12/ja`,
    temperatureMax: daily.temperatureMax,
    temperatureMin: daily.temperatureMin,
    humidity: Math.round(daily.humidity * 100),
    precipProbability: Math.round(daily.precipProbability * 100),
  };
};
