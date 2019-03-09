export interface DarkSkyApiResponse {
  daily: {
    data: {
      /** 日付 */
      time: number;
      /** 要約 */
      summary: string;
      /** 最低気温 */
      temperatureMin: number;
      /** 最高気温 */
      temperatureMax: number;
      /** 湿度 */
      humidity: number;
    }[];
  };
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
