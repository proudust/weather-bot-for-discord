interface WeatherForecast {
  date: Date;
  /** アイコン */
  avatar: string;
  /** 概要 */
  summary: string;
  /** 情報源 */
  url: string;
  /** 最高気温 (摂氏度) */
  temperatureMax: number;
  /** 最低気温 (摂氏度) */
  temperatureMin: number;
  /** 湿度 (百分率) */
  humidity: number;
  /** 降水確率 (百分率) */
  precipProbability: number;
}

export type WeatherForecastSource = (day: 'today' | 'nextday') => WeatherForecast;
