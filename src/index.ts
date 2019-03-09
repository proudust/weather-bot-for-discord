import * as Discord from './discord';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare var global: any;

global.PostWearherToDiscord = (): void => {
  // access darksky api
  const key = PropertiesService.getScriptProperties().getProperty('SECRETKEY');
  const latitude = 36.366503;
  const longitude = 140.470997;
  const exclude = ['currently', 'minutely', 'hourly', 'flags'].join(',');
  const lang = 'ja';
  const units = 'si';
  const apiurl = `https://api.darksky.net/forecast/${key}/${latitude},${longitude}?exclude=${exclude}&lang=${lang}&units=${units}`;

  let response;
  try {
    response = UrlFetchApp.fetch(apiurl);
  } catch (error) {
    Logger.log(JSON.stringify(error));
    return;
  }

  const content: DarkSkyApiResponse = JSON.parse(response.getContentText('UTF-8'));
  const daily = content.daily.data.filter(x => {
    const now = new Date();
    const noon = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    return x.time >= noon.getTime() / 1000;
  })[0];
  const date = new Date(daily.time * 1000);

  interface DarkSkyApiResponse {
    daily: {
      data: DarkSkyDataPointObject[];
    };
  }
  interface DarkSkyDataPointObject {
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
  }

  // post to discord
  const payload: Discord.DiscordWebhookPayload = {
    embeds: [
      {
        title: `${date.getMonth() + 1}月${date.getDate()}日の天気`,
        description: `**${daily.summary}**`,
        fields: [
          {
            name: '最高気温',
            value: `${daily.temperatureMax}℃`,
            inline: true
          },
          {
            name: '最低気温',
            value: `${daily.temperatureMin} ℃`,
            inline: true
          },
          {
            name: '湿度',
            value: `${Math.round(daily.humidity * 100)}% `,
            inline: true
          }
        ]
      }
    ]
  };
  Discord.PostToDiscord(payload);
};
