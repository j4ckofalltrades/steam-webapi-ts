import { httpClient } from "./http"
import { ISteamUser } from "./usersApi"
import { WebApiKey } from "./shared"
import { ISteamApps } from "./appsApi"
import { ISteamUserStats } from "./userStatsApi"
import { ISteamNews } from "./newsApi"
import { IPlayerService } from "./playerService"

/**
 * Steam Web API wrapper
 */
export class SteamWebApi {

  private readonly _appsApi: ISteamApps
  private readonly _newsApi: ISteamNews
  private readonly _playerService: IPlayerService
  private readonly _usersApi: ISteamUser
  private readonly _userStatsApi: ISteamUserStats

  constructor(apiKey: WebApiKey) {
    this._appsApi = new ISteamApps(httpClient)
    this._newsApi = new ISteamNews(httpClient)
    this._playerService = new IPlayerService(apiKey, httpClient)
    this._usersApi = new ISteamUser(apiKey, httpClient)
    this._userStatsApi = new ISteamUserStats(apiKey, httpClient)
  }

  public get appsApi(): ISteamApps {
    return this._appsApi
  }

  public get newsApi(): ISteamNews {
    return this._newsApi
  }

  public get playerService(): IPlayerService {
    return this._playerService
  }

  public get usersApi(): ISteamUser {
    return this._usersApi
  }

  public get userStatsApi(): ISteamUserStats {
    return this._userStatsApi
  }
}
