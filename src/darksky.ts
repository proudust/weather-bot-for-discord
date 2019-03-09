export type DarkSkyIcon =
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

export interface DarkSkyApiResponse {
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

export function GetWearherForecastToDarkSkyApi(
  latitude: number,
  longitude: number
): DarkSkyApiResponse {
  const key = PropertiesService.getScriptProperties().getProperty('SECRETKEY');
  const exclude = ['currently', 'minutely', 'hourly', 'flags'].join(',');
  const lang = 'ja';
  const units = 'si';
  const apiurl = `https://api.darksky.net/forecast/${key}/${latitude},${longitude}?exclude=${exclude}&lang=${lang}&units=${units}`;

  try {
    const responseJson = UrlFetchApp.fetch(apiurl).getContentText('UTF-8');
    const response: DarkSkyApiResponse = JSON.parse(responseJson);
    return response;
  } catch (error) {
    Logger.log(JSON.stringify(error));
    throw error;
  }
}
