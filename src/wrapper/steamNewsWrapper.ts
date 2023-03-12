import { defaultWebApiClient, WebApiClient } from "../core/webApiClient"
import { AppId } from "../core/steamWebApi"
import { AppNews, NewsForAppParams } from "./steamNewsWrapper.types."

export const GET_NEWS_FOR_APP = "/ISteamNews/GetNewsForApp/v2"

/**
 * Provides access to the Steam News functionality.
 */
export class ISteamNewsWrapper {
  private readonly webApiClient: WebApiClient

  /* istanbul ignore next */
  /**
   * @param webApiClient HTTP client.
   */
  constructor(webApiClient: WebApiClient = defaultWebApiClient) {
    this.webApiClient = webApiClient
  }

  /**
   * Get the news for the specified app.
   *
   * @param appid AppID to retrieve news for.
   * @param request (Optional) Additional request parameters.
   */
  async getNewsForApp(appid: AppId, request?: NewsForAppParams): Promise<AppNews> {
    const maxlength = request?.maxlength !== undefined ? { maxlength: request.maxlength } : undefined
    const enddate = request?.enddate !== undefined ? { enddate: request.enddate } : undefined
    const count = request?.count !== undefined ? { count: request.count } : { count: 20 }
    const feeds = request?.feeds !== undefined ? { feeds: request.feeds } : undefined

    return await this.webApiClient.get<AppNews>(GET_NEWS_FOR_APP, {
      params: {
        appid,
        ...maxlength,
        ...enddate,
        ...count,
        ...feeds,
      },
    })
  }
}
