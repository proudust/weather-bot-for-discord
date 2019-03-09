import * as DarkSky from './darksky';
import * as Discord from './discord';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare var global: any;

global.PostWearherToDiscord = (): void => {
  // access darksky api
  const content = DarkSky.GetWearherForecastToDarkSkyApi(36.366503, 140.470997);

  const daily = content.daily.data.filter(x => {
    const now = new Date();
    const noon = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    return x.time >= noon.getTime() / 1000;
  })[0];
  const date = new Date(daily.time * 1000);

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
