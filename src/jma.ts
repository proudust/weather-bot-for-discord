interface OverviewForecastJson {
  /** 発表者 */
  publishingOffice: string;
  /** 報告日時 */
  reportDatetime: string;
  /** 対象日時 */
  targetArea: string;
  /** ヘッドライン */
  headlineText: string;
  /** 詳細 */
  text: string;
}

interface OverviewForecast {
  reportDatetime: Date;
  overview: string;
}

/**
 * 気象予測の概要を取得します。
 * @param areaCode 地域コード (offices)
 * @returns 気象予測の概要
 */
export async function fetchOverviewForecast(areaCode: string): Promise<OverviewForecast> {
  const url = `https://www.jma.go.jp/bosai/forecast/data/overview_forecast/${areaCode}.json`;
  const json: OverviewForecastJson = await fetch(url).then((r) => r.json());
  const reportDatetime = new Date(json.reportDatetime);
  const overview = [json.headlineText, json.text]
    .filter(Boolean)
    .join("\n\n")
    .replaceAll("　", "")
    .replaceAll("\n\n", "\n");
  return { reportDatetime, overview };
}
