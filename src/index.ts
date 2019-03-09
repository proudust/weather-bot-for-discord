import * as DarkSky from './darksky';
import * as Discord from './discord';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare var global: any;

function GenelateDiscordPayload(
  numberOfDays: number,
  forecast: DarkSky.DarkSkyApiResponse
): Discord.DiscordWebhookPayload {
  const daily = forecast.daily.data[numberOfDays];
  const date = new Date(daily.time * 1000);

  return {
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
}

global.PostToDayWearherToDiscord = (): void => {
  const forecast = DarkSky.GetWearherForecastToDarkSkyApi(36.366503, 140.470997);
  const payload = GenelateDiscordPayload(0, forecast);
  Discord.PostToDiscord(payload);
};

global.PostNextDayWearherToDiscord = (): void => {
  const forecast = DarkSky.GetWearherForecastToDarkSkyApi(36.366503, 140.470997);
  const payload = GenelateDiscordPayload(1, forecast);
  Discord.PostToDiscord(payload);
};
