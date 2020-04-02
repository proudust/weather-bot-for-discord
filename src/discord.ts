import type { WeatherForecast } from './WeatherForecastSource';

interface DiscordWebhookPayload {
  username?: string;
  avatar_url?: string;
  content?: string;
  embeds?: [
    {
      title?: string;
      description?: string;
      url?: string;
      timestamp?: string;
      color?: number;
      footer?: {
        text?: string;
        icon_url?: string;
      };
      image?: {
        url?: string;
      };
      thumbnail?: {
        url?: string;
      };
      author?: {
        name?: string;
        url?: string;
        icon_url?: string;
      };
      fields?: {
        name?: string;
        value?: string;
        inline?: boolean;
      }[];
    },
  ];
}

export function convert(forecast: WeatherForecast): DiscordWebhookPayload {
  const month = forecast.date.getMonth() + 1;
  const day = forecast.date.getDate();

  return {
    // eslint-disable-next-line @typescript-eslint/camelcase
    avatar_url: forecast.avatar,
    embeds: [
      {
        title: `${month}月${day}日の天気`,
        description: `**${forecast.summary}**`,
        url: forecast.url,
        fields: [
          {
            name: '最高気温',
            value: `${forecast.temperatureMax}℃`,
            inline: true,
          },
          {
            name: '最低気温',
            value: `${forecast.temperatureMin} ℃`,
            inline: true,
          },
          {
            name: '湿度',
            value: `${forecast.humidity}% `,
            inline: true,
          },
          {
            name: '降水確率',
            value: `${forecast.precipProbability}% `,
            inline: true,
          },
        ],
      },
    ],
  };
}

export function post(payload: DiscordWebhookPayload): void {
  const url = PropertiesService.getScriptProperties().getProperty('WEBHOOK');
  if (!url) {
    throw new Error('WEBHOOK is not found.');
  }
  // eslint-disable-next-line @typescript-eslint/camelcase
  const options: GoogleAppsScript.URL_Fetch.URLFetchRequestOptions = {
    method: 'post',
    contentType: 'application/json;multipart/form-data;application/x-www-form-urlencoded',
    payload: JSON.stringify(payload),
  };
  UrlFetchApp.fetch(url, options);
}
