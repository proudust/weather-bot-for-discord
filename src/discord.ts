export interface DiscordWebhookPayload {
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

export function PostToDiscord(payload: DiscordWebhookPayload): void {
  const url = PropertiesService.getScriptProperties().getProperty('WEBHOOK');
  if (!url) {
    Logger.log('WEBHOOK is not found.');
    return;
  }
  // eslint-disable-next-line @typescript-eslint/camelcase
  const options: GoogleAppsScript.URL_Fetch.URLFetchRequestOptions = {
    method: 'post',
    contentType: 'application/json;multipart/form-data;application/x-www-form-urlencoded',
    payload: JSON.stringify(payload),
  };
  try {
    UrlFetchApp.fetch(url, options);
  } catch (error) {
    Logger.log(JSON.stringify(error));
    return;
  }
}
