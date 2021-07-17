import { httpClient, HttpClient } from "./http"
import { GET_APP_LIST, UP_TO_DATE_CHECK } from "./url"
import { AppId } from "./shared"

/**
 * @property apps A list of objects containing the title and app ID of each program available in the store.
 */
export type AppList = {
  applist: {
    apps: App[]
  }
}

/**
 * @property appid An integer containing the program's ID.
 * @property name A string containing the program's publicly facing title.
 */
export type App = {
  appid: AppId
  name: string
}

/**
 * @property success Boolean indicating if request was successful.
 * @property up_to_date Boolean indicating if the given version number is the most current version.
 * @property version_is_listable Boolean indicating if the given version can be listed in public changelogs.
 * @property required_version (Optional) Integer of the most current version of the app available.
 * @property message (Optional) A string giving the status message if applicable.
 */
export type UpToDateCheck = {
  response: {
    success: boolean
    up_to_date: boolean
    version_is_listable: boolean
    required_version?: number
    message?: string
  }
}

/**
 * Methods relating to Steam Apps in general.
 */
export class ISteamApps {
  private readonly http: HttpClient

  /* istanbul ignore next */
  /**
   * @param http HTTP client.
   */
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
   * @param appid AppID of game.
   * @param version The installed version of the game.
   */
  async upToDateCheck(appid: AppId, version: string): Promise<UpToDateCheck> {
    return await this.http.get<UpToDateCheck>(UP_TO_DATE_CHECK, {
      params: {
        appid,
        version,
      },
    })
  }
}
