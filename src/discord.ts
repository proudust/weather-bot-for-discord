export interface DiscordWebhookPayload {
  embeds?: [
    {
      title?: string;
      description?: string;
      fields?: {
        name?: string;
        value?: string;
        inline?: boolean;
      }[];
    }
  ];
}

export function PostToDiscord(payload: DiscordWebhookPayload): void {
  const url = PropertiesService.getScriptProperties().getProperty('WEBHOOK');
  // eslint-disable-next-line @typescript-eslint/camelcase
  const options: GoogleAppsScript.URL_Fetch.URLFetchRequestOptions = {
    method: 'post',
    contentType: 'application/json;multipart/form-data;application/x-www-form-urlencoded',
    payload: JSON.stringify(payload)
  };
  try {
    UrlFetchApp.fetch(url, options);
  } catch (error) {
    Logger.log(JSON.stringify(error));
    return;
  }
}
