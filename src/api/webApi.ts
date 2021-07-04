import { httpClient } from "./http"
import { ISteamUser } from "./usersApi"
import { WebApiKey } from "./shared"
import { ISteamApps } from "./appsApi"
import { ISteamUserStats } from "./userStatsApi"

/**
 * Steam Web API wrapper
 */
export class SteamWebApi {

  private readonly _appsApi: ISteamApps
  private readonly _usersApi: ISteamUser
  private readonly _userStatsApi: ISteamUserStats

  constructor(apiKey: WebApiKey) {
    this._appsApi = new ISteamApps(httpClient)
    this._usersApi = new ISteamUser(apiKey, httpClient)
    this._userStatsApi = new ISteamUserStats(apiKey, httpClient)
  }

  public get appsApi(): ISteamApps {
    return this._appsApi
  }

  public get usersApi(): ISteamUser {
    return this._usersApi
  }

  public get userStatsApi(): ISteamUserStats {
    return this._userStatsApi
  }
}
