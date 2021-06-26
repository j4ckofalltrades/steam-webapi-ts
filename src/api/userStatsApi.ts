import {
  AchievementPercentages,
  AppId,
  CurrentPlayerCount,
  GameSchema,
  GameUserStats,
  PlayerStats,
  SteamId,
  WebApiKey
} from "./types"
import { httpClient, HttpClient } from "./http"
import {
  GET_GLOBAL_ACHIEVEMENT_PERCENTAGES_FOR_APP,
  GET_NUMBER_OF_CURRENT_PLAYERS,
  GET_PLAYER_ACHIEVEMENTS, GET_SCHEMA_FOR_GAME, GET_USER_STATS_FOR_GAME
} from "./url"

/**
 * Methods relating to User stats.
 */
export class ISteamUserStats {

  private readonly apiKey: WebApiKey
  private readonly http: HttpClient

  /**
   * @param apiKey Steam Web API key.
   * @param http HTTP client.
   */
  constructor(apiKey: WebApiKey, http: HttpClient = httpClient) {
    this.apiKey = apiKey
    this.http = http
  }

  /**
   * Retrieves the global achievement percentages for the specified app.
   *
   * @param gameid GameID to retrieve the achievement percentages for. This can be the ID of any Steamworks game
   * with achievements available.
   */
  async getGlobalAchievementPercentagesForApp(gameid: AppId): Promise<AchievementPercentages> {
    return await this.http.get<AchievementPercentages>(
      GET_GLOBAL_ACHIEVEMENT_PERCENTAGES_FOR_APP,
      {
        params: {
          gameid,
        }
      })
  }

  /**
   * Gets the total number of players currently active in the specified app on Steam.
   *
   * @param appid AppID that we're getting user count for
   */
  async getNumberOfCurrentPlayers(appid: AppId): Promise<CurrentPlayerCount> {
    return await this.http.get<CurrentPlayerCount>(
      GET_NUMBER_OF_CURRENT_PLAYERS,
      {
        params: {
          appid,
        }
      }
    )
  }

  /**
   * Gets the list of achievements the specified user has unlocked in an app.
   *
   * @param steamid SteamID of user
   * @param appid AppID to get achievements for
   * @param lang Language to return strings for
   */
  async getPlayerAchievements(steamid: SteamId, appid: AppId, lang?: string): Promise<PlayerStats> {
    const l = lang !== undefined ? { l: lang } : undefined
    return await this.http.get<PlayerStats>(
      GET_PLAYER_ACHIEVEMENTS,
      {
        params: {
          steamid,
          appid,
          l,
        }
      }
    )
  }

  /**
   * Gets the complete list of stats and achievements for the specified game.
   *
   * @param appid AppId of the game.
   * @param lang Localized language to return (english, french, etc.)
   */
  async getSchemaForGame(appid: AppId, lang?: string): Promise<GameSchema> {
    const l = lang !== undefined ? { l: lang } : undefined
    return await this.http.get<GameSchema>(
      GET_SCHEMA_FOR_GAME,
      {
        params: {
          key: this.apiKey,
          appid,
          l,
        }
      }
    )
  }

  /**
   * Gets the list of stats that the specified user has set in an app.
   *
   * @param steamid SteamId of user
   * @param appid AppId of game
   */
  async getUserStatsForGame(steamid: SteamId, appid: AppId): Promise<GameUserStats> {
    return await this.http.get<GameUserStats>(
      GET_USER_STATS_FOR_GAME,
      {
        params: {
          key: this.apiKey,
          steamid,
          appid,
        }
      }
    )
  }
}
