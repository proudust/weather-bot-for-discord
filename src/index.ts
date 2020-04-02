import * as DarkSky from './darksky';
import * as Discord from './discord';

declare let global: { [key: string]: Function };

global.PostToDayWearherToDiscord = (): void => {
  const forecast = DarkSky.getForecast('today');
  const payload = Discord.convert(forecast);
  Discord.post(payload);
};

global.PostNextDayWearherToDiscord = (): void => {
  const forecast = DarkSky.getForecast('nextday');
  const payload = Discord.convert(forecast);
  Discord.post(payload);
};
