import { httpClient, HttpClient } from "./http"
import { AppList, UpToDateCheck } from "./types"
import { GET_APP_LIST, UP_TO_DATE_CHECK } from "./url"

/**
 * Methods relating to Steam Apps in general.
 */
export class ISteamApps {

  private readonly http: HttpClient

  constructor(http: HttpClient = httpClient) {
    this.http = http
  }

  /**
   * Full list of every publicly facing program in the store/library.
   */
  async getAppList(): Promise<AppList> {
    return await this.http.get<AppList>(GET_APP_LIST)
  }

  /**
   * Check if a given app version is the most current available.
   *
   * @param appid AppID of game
   * @param version The installed version of the game
   */
  async upToDateCheck(appid: number, version: string): Promise<UpToDateCheck> {
    return await this.http.get<UpToDateCheck>(
      UP_TO_DATE_CHECK,
      {
        params: {
          appid,
          version,
        }
      }
    )
  }
}
