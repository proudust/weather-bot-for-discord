import "./gas-deno.ts";
import { fetchOverviewForecast } from "./jma.ts";
import { post } from "./discord.ts";

declare let global: { [key: string]: () => void };

global.post = () =>
  (async () => {
    const areaCode = Deno.env.get("AREA_CODE") || "130000";
    const overview = await fetchOverviewForecast(areaCode);
    await post({
      content: overview.overview,
    });
  })();
