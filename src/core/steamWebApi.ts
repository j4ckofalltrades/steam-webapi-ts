/* istanbul ignore file */

import { defaultWebApiClient } from "./webApiClient"
import { ISteamUserWrapper } from "../wrapper/steamUserWrapper"
import { ISteamAppsWrapper } from "../wrapper/steamAppsWrapper"
import { ISteamUserStatsWrapper } from "../wrapper/steamUserStatsWrapper"
import { ISteamNewsWrapper } from "../wrapper/steamNewsWrapper"
import { IPlayerServiceWrapper } from "../wrapper/playerServiceWrapper"
import { ISteamWebAPIUtilWrapper } from "../wrapper/steamWebApiUtilWrapper"

/**
 * Game ID.
 */
export type AppId = number

/**
 * User's 64-bit ID.
 */
export type SteamId = string

/**
 * Steam Web API key. Without this, the server will return an HTTP 403 (forbidden) error.
 * A key can be generated at {@link https://steamcommunity.com/dev/apikey}.
 */
export type WebApiKey = string

/**
 * 1 if successful, 42 if there was no match.
 */
export type Result = 1 | 42

/**
 * Steam WebAPI wrapper.
 */
export class SteamWebApi {
  private readonly _appsApi: ISteamAppsWrapper
  private readonly _newsApi: ISteamNewsWrapper
  private readonly _playerService: IPlayerServiceWrapper
  private readonly _usersApi: ISteamUserWrapper
  private readonly _userStatsApi: ISteamUserStatsWrapper
  private readonly _webApiUtil: ISteamWebAPIUtilWrapper

  constructor(apiKey: WebApiKey) {
    this._appsApi = new ISteamAppsWrapper(defaultWebApiClient)
    this._newsApi = new ISteamNewsWrapper(defaultWebApiClient)
    this._playerService = new IPlayerServiceWrapper(apiKey, defaultWebApiClient)
    this._usersApi = new ISteamUserWrapper(apiKey, defaultWebApiClient)
    this._userStatsApi = new ISteamUserStatsWrapper(apiKey, defaultWebApiClient)
    this._webApiUtil = new ISteamWebAPIUtilWrapper(defaultWebApiClient)
  }

  public get appsApi(): ISteamAppsWrapper {
    return this._appsApi
  }

  public get newsApi(): ISteamNewsWrapper {
    return this._newsApi
  }

  public get playerService(): IPlayerServiceWrapper {
    return this._playerService
  }

  public get usersApi(): ISteamUserWrapper {
    return this._usersApi
  }

  public get userStatsApi(): ISteamUserStatsWrapper {
    return this._userStatsApi
  }

  public get webApiUtil(): ISteamWebAPIUtilWrapper {
    return this._webApiUtil
  }
}
