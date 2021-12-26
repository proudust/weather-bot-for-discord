/// <reference path="https://raw.githubusercontent.com/proudust/deno-gas-types/main/types/index.d.ts" />

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

export async function post(payload: DiscordWebhookPayload): Promise<void> {
  const url = Deno.env.get("WEBHOOK");
  if (!url) {
    console.log("WEBHOOK is not found.");
    return;
  }

  try {
    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;",
      },
      body: JSON.stringify(payload),
    });
  } catch (error: unknown) {
    console.log(error);
    throw error;
  }
}
