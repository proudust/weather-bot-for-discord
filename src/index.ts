import * as DarkSky from './darksky';
import * as Discord from './discord';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare var global: any;

const wearherIconUrl: { [index in DarkSky.DarkSkyIcon]: string } = {
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
    'https://4.bp.blogspot.com/-22AkJ4RfDx8/U9y_noGiRSI/AAAAAAAAjf4/SeSbXunubXQ/s150/tenki_mark05_kumori.png'
};

function GenelateDiscordPayload(
  numberOfDays: number,
  forecast: DarkSky.DarkSkyApiResponse
): Discord.DiscordWebhookPayload {
  const daily = forecast.daily.data[numberOfDays];
  const date = new Date(daily.time * 1000);

  return {
    // eslint-disable-next-line @typescript-eslint/camelcase
    avatar_url: wearherIconUrl[daily.icon],
    embeds: [
      {
        title: `${date.getMonth() + 1}月${date.getDate()}日の天気`,
        description: `**${daily.summary}**`,
        url: `https://darksky.net/forecast/${forecast.latitude},${forecast.longitude}/si12/ja`,
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
          },
          {
            name: '降水確率',
            value: `${Math.round(daily.precipProbability * 100)}% `,
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
