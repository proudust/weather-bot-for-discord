/// <reference path="https://raw.githubusercontent.com/proudust/deno-gas-types/main/types/index.d.ts" />

type URLFetchRequestOptions = GoogleAppsScript.URL_Fetch.URLFetchRequestOptions;

function gasFetch(resource: string, init?: RequestInit): Promise<GasFetchResponse> {
  if (!init) {
    const response = UrlFetchApp.fetch(resource);
    return Promise.resolve(new GasFetchResponse(response));
  } else {
    const params: URLFetchRequestOptions = {
      method: init.method as unknown as URLFetchRequestOptions["method"],
      contentType: (init.headers as Record<string, string>)?.["Content-Type"],
      payload: init.body || undefined,
    };
    const response = UrlFetchApp.fetch(resource, params);
    return Promise.resolve(new GasFetchResponse(response));
  }
}

class GasFetchResponse {
  constructor(private readonly response: GoogleAppsScript.URL_Fetch.HTTPResponse) {}

  async json() {
    return Promise.resolve(JSON.parse(await this.text()));
  }

  text() {
    return Promise.resolve(this.response.getContentText("UTF-8"));
  }
}

globalThis.fetch = gasFetch as unknown as typeof fetch;

// --

const gasDeno = Object.freeze({
  env: {
    get(key: string): string | undefined {
      return PropertiesService.getScriptProperties().getProperty(key) || undefined;
    },
  },
});

globalThis.Deno = gasDeno as unknown as typeof Deno;
