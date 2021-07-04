import { httpClient, HttpClient } from "./http"
import { AppId } from "./shared"
import { GET_NEWS_FOR_APP } from "./url"

/**
 * @property gid The unique identifier of the news item.
 * @property title Title of the news item.
 * @property url Permanent link to the item
 * @property is_external_url true if the url given links to an external website. false if it links to the Steam store.
 * @property author The author of the news item.
 * @property contents The article body with a length equal to the given length with an appended ellipsis if it is
 *           exceeded.
 * @property feedlabel The category label of the news item.
 * @property date A unix timestamp of the date the item was posted.
 * @property feedname An internal tag that describes the source of the news item.
 * @property appid AppID where the news item belong to.
 */
export type NewsItem = {
  gid: string,
  title: string,
  url: string,
  is_external_url: boolean,
  author: string,
  contents: string,
  feedlabel: string,
  date: number,
  feedname: string,
  feed_type: number,
  appid: AppId,
}

/**
 * @property appid AppID to retrieve news for.
 * @property newsitems A list of objects describing each news item.
 */
export type AppNews = {
  appnews: {
    appid: AppId,
    newsitems: NewsItem[],
  }
}

/**
 * @property maxlength Maximum length for the content to return, if this is 0 the full content is returned, if it's less
 *           then a blurb is generated to fit.
 * @property enddate (Optional) Retrieve posts earlier than this date (unix epoch timestamp).
 * @property count (Optional) Number of posts to retrieve (default 20).
 * @property feeds (Optional) Comma-seperated list of feed names to return news for.
 */
export type NewsForAppParams = {
  maxlength?: number,
  enddate?: number,
  count?: number,
  feeds?: string,
}

/**
 * Methods relating to Steam News.
 */
export class ISteamNews {

  private readonly http: HttpClient

  /**
   * @param http HTTP client.
   */
  constructor(http: HttpClient = httpClient) {
    this.http = http
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

    return await this.http.get<AppNews>(
      GET_NEWS_FOR_APP,
      {
        params: {
          appid,
          ...maxlength,
          ...enddate,
          ...count,
          ...feeds,
        }
      }
    )
  }
}
