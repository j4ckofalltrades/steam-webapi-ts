import { AppId, Result, SteamId, WebApiKey } from "./shared"
import { httpClient, HttpClient } from "./http"
import {
  GET_GLOBAL_ACHIEVEMENT_PERCENTAGES_FOR_APP,
  GET_GLOBAL_STATS_FOR_GAME,
  GET_NUMBER_OF_CURRENT_PLAYERS,
  GET_PLAYER_ACHIEVEMENTS,
  GET_SCHEMA_FOR_GAME,
  GET_USER_STATS_FOR_GAME
} from "./url"

/**
 * @property achievementpercentages List of achievements and percentage of players that have unlocked said achievement.
 */
export type AchievementPercentages = {
  achievementpercentages: {
    achievements: GlobalAchievement[],
  }
}

/**
 * @property name The name of the achievement as an unlocalized token.
 * @property percent Percentage of player population that has unlocked the achievement given as a double.
 */
export type GlobalAchievement = {
  name: string,
  percent: number,
}

/**
 * @property player_count Total number of currently active players for the specified app.
 * @property result The status of the request. 1 if successful, 42 if there was no match.
 */
export type CurrentPlayerCount = {
  response: {
    player_count: number,
    result: Result,
  }
}

/**
 * @property steamID The 64 bit ID of the user.
 * @property gameName String containing the game title.
 * @property achievements List of achievements unlocked by the user.
 */
export type PlayerStats = {
  steamID: SteamId,
  gameName: string,
  achievements: PlayerAchievement[],
  success: boolean,
}

// 1 if achievement has been unlocked, 0 if otherwise.
type PlayerAchievementStatus = 0 | 1

/**
 * @property apiname String containing the ID of the achievement.
 * @property achieved Integer to be used as a boolean value indicating whether or not the achievement has been unlocked
 *           by the user.
 * @property unlocktime A unix timestamp of the date when the achievement was unlocked.
 */
export type PlayerAchievement = {
  apiname: string,
  achieved: PlayerAchievementStatus,
  unlocktime: number,
}

/**
 * @property gameName Steam internal (non-localized) name of game.
 * @property gameVersion Steam release version number currently live on Steam.
 * @property availableGameStats List of available achievements and stats for the game.
 */
export type GameSchema = {
  game: {
    gameName: string,
    gameVersion: string,
    availableGameStats: {
      achievements: GameSchemaAchievements[],
      stats: GameSchemaStats[],
    }
  }
}

/**
 * @property name API Name of achievement.
 * @property defaultvalue Always 0 (player's default state is unachieved).
 * @property displayName Display title string of achievement.
 * @property hidden If achievement is hidden to the user before earning achievement, value is 1. 0 if public.
 * @property description Display description string of achievement.
 * @property icon Absolute URL of earned achievement icon art.
 * @property icongray Absolute URL of un-earned achievement icon art.
 */
export type GameSchemaAchievements = {
  name: string,
  defaultvalue: number,
  displayName: string,
  hidden: number,
  description: string,
  icon: string,
  icongray: string,
}

/**
 * @property name API name of stat.
 * @property defaultvalue Default value of stat.
 * @property displayName Developer provided name of stat.
 */
export type GameSchemaStats = {
  name: string,
  defaultvalue: number,
  displayName: string,
}

/**
 * @property steamid SteamId of user
 * @property appid AppId of game
 * @property achievements List of game achievements the user has unlocked
 */
export type GameUserStats = {
  steamid: SteamId,
  appid: AppId,
  achievements: {
    name: string,
    achieved: number
  }[],
}

/**
 * @property result Result code
 * @property globalstats Array of global game statistics
 */
export type GlobalStatsForGame = {
  response: {
    result: number,
    globalstats: {
      [key: string]: {
        total: number
      }
    }[],
  }
}

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
          ...l,
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
          ...l,
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

  /**
   * Retrieves the global stats percentages for the specified app.
   *
   * @param appid AppID that we're getting global stats for
   * @param count Number of stats get data for
   * @param stats Names of stat to get data for
   */
  async getGlobalStatsForGame(appid: AppId, count: number, stats: string[]): Promise<GlobalStatsForGame> {
    let requestParams = {}
    for (let i = 0; i < stats.length; i++) {
      requestParams = {
        ...requestParams,
        [`name[${i}]`]: stats[i],
      }
    }

    return await this.http.get<GlobalStatsForGame>(
      GET_GLOBAL_STATS_FOR_GAME,
      {
        params: {
          ...requestParams,
          appid,
          count,
        }
      }
    )
  }
}
