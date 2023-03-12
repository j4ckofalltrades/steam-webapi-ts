import { AppId, SteamId, WebApiKey } from "../core/steamWebApi"
import { defaultWebApiClient, WebApiClient } from "../core/webApiClient"
import {
  AchievementPercentages,
  CurrentPlayerCount,
  GameSchema,
  GameUserStats,
  GlobalStatsForGame,
  PlayerStats,
} from "./steamUserStatsWrapper.types"

export const GET_GLOBAL_ACHIEVEMENT_PERCENTAGES_FOR_APP = "/ISteamUserStats/GetGlobalAchievementPercentagesForApp/v2"
export const GET_GLOBAL_STATS_FOR_GAME = "/ISteamUserStats/GetGlobalStatsForGame/v1"
export const GET_NUMBER_OF_CURRENT_PLAYERS = "/ISteamUserStats/GetNumberOfCurrentPlayers/v1"
export const GET_PLAYER_ACHIEVEMENTS = "/ISteamUserStats/GetPlayerAchievements/v1"
export const GET_SCHEMA_FOR_GAME = "/ISteamUserStats/GetSchemaForGame/v2"
export const GET_USER_STATS_FOR_GAME = "/ISteamUserStats/GetUserStatsForGame/v2"

/**
 * Used to access information about users.
 */
export class ISteamUserStatsWrapper {
  private readonly apiKey: WebApiKey
  private readonly webApiClient: WebApiClient

  /* istanbul ignore next */
  /**
   * @param apiKey Steam Web API key.
   * @param webApiClient HTTP client.
   */
  constructor(apiKey: WebApiKey, webApiClient: WebApiClient = defaultWebApiClient) {
    this.apiKey = apiKey
    this.webApiClient = webApiClient
  }

  /**
   * Retrieves the global achievement percentages for the specified app.
   *
   * @param gameid GameID to retrieve the achievement percentages for. This can be the ID of any Steamworks game
   * with achievements available.
   */
  async getGlobalAchievementPercentagesForApp(gameid: AppId): Promise<AchievementPercentages> {
    return await this.webApiClient.get<AchievementPercentages>(GET_GLOBAL_ACHIEVEMENT_PERCENTAGES_FOR_APP, {
      params: {
        gameid,
      },
    })
  }

  /**
   * Gets the total number of players currently active in the specified app on Steam.
   *
   * @param appid AppID that we're getting user count for.
   */
  async getNumberOfCurrentPlayers(appid: AppId): Promise<CurrentPlayerCount> {
    return await this.webApiClient.get<CurrentPlayerCount>(GET_NUMBER_OF_CURRENT_PLAYERS, {
      params: {
        appid,
      },
    })
  }

  /**
   * Gets the list of achievements the specified user has unlocked in an app.
   *
   * @param steamid SteamID of user.
   * @param appid AppID to get achievements for.
   * @param lang Language to return strings for.
   */
  async getPlayerAchievements(steamid: SteamId, appid: AppId, lang?: string): Promise<PlayerStats> {
    const l = lang !== undefined ? { l: lang } : undefined
    return await this.webApiClient.get<PlayerStats>(GET_PLAYER_ACHIEVEMENTS, {
      params: {
        steamid,
        appid,
        ...l,
      },
    })
  }

  /**
   * Gets the complete list of stats and achievements for the specified game.
   *
   * @param appid AppId of the game.
   * @param lang Localized language to return (english, french, etc.).
   */
  async getSchemaForGame(appid: AppId, lang?: string): Promise<GameSchema> {
    const l = lang !== undefined ? { l: lang } : undefined
    return await this.webApiClient.get<GameSchema>(GET_SCHEMA_FOR_GAME, {
      params: {
        key: this.apiKey,
        appid,
        ...l,
      },
    })
  }

  /**
   * Gets the list of stats that the specified user has set in an app.
   *
   * @param steamid SteamId of user.
   * @param appid AppId of game.
   */
  async getUserStatsForGame(steamid: SteamId, appid: AppId): Promise<GameUserStats> {
    return await this.webApiClient.get<GameUserStats>(GET_USER_STATS_FOR_GAME, {
      params: {
        key: this.apiKey,
        steamid,
        appid,
      },
    })
  }

  /**
   * Retrieves the global stats percentages for the specified app.
   *
   * @param appid AppID that we're getting global stats for.
   * @param count Number of stats get data for.
   * @param stats Names of stat to get data for.
   */
  async getGlobalStatsForGame(appid: AppId, count: number, stats: string[]): Promise<GlobalStatsForGame> {
    let requestParams = {}
    for (let i = 0; i < stats.length; i++) {
      requestParams = {
        ...requestParams,
        [`name[${i}]`]: stats[i],
      }
    }

    return await this.webApiClient.get<GlobalStatsForGame>(GET_GLOBAL_STATS_FOR_GAME, {
      params: {
        ...requestParams,
        appid,
        count,
      },
    })
  }
}
