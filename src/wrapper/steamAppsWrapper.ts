import { defaultWebApiClient, WebApiClient } from "../core/webApiClient"
import { AppId } from "../core/steamWebApi"
import { AppList, UpToDateCheck } from "./steamAppsWrapper.types"

export const GET_APP_LIST = "/ISteamApps/GetAppList/v2"
export const UP_TO_DATE_CHECK = "/ISteamApps/UpToDateCheck/v1"

/**
 * Used to access data about applications on Steam.
 */
export class ISteamAppsWrapper {
  private readonly webApiClient: WebApiClient

  /* istanbul ignore next */
  /**
   * @param webApiClient HTTP client.
   */
  constructor(webApiClient: WebApiClient = defaultWebApiClient) {
    this.webApiClient = webApiClient
  }

  /**
   * Full list of every publicly facing program in the store/library.
   */
  async getAppList(): Promise<AppList> {
    return await this.webApiClient.get<AppList>(GET_APP_LIST)
  }

  /**
   * Check if a given app version is the most current available.
   *
   * @param appid AppID of game.
   * @param version The installed version of the game.
   */
  async upToDateCheck(appid: AppId, version: string): Promise<UpToDateCheck> {
    return await this.webApiClient.get<UpToDateCheck>(UP_TO_DATE_CHECK, {
      params: {
        appid,
        version,
      },
    })
  }
}
