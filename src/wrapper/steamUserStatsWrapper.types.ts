import { AppId, Result, SteamId } from "../core/steamWebApi"

/**
 * @property achievementpercentages List of achievements and percentage of players that have unlocked said achievement.
 */
export type AchievementPercentages = {
  achievementpercentages: {
    achievements: GlobalAchievement[]
  }
}

/**
 * @property name The name of the achievement as an unlocalized token.
 * @property percent Percentage of player population that has unlocked the achievement given as a double.
 */
export type GlobalAchievement = {
  name: string
  percent: number
}

/**
 * @property player_count Total number of currently active players for the specified app.
 * @property result The status of the request. 1 if successful, 42 if there was no match.
 */
export type CurrentPlayerCount = {
  response: {
    player_count: number
    result: Result
  }
}

/**
 * @property steamID The 64 bit ID of the user.
 * @property gameName String containing the game title.
 * @property achievements List of achievements unlocked by the user.
 */
export type PlayerStats = {
  steamID: SteamId
  gameName: string
  achievements: PlayerAchievement[]
  success: boolean
}

// 1 if achievement has been unlocked, 0 if otherwise.
type PlayerAchievementStatus = 0 | 1

/**
 * @property apiname String containing the ID of the achievement.
 * @property achieved Integer to be used as a boolean value indicating whether or not the achievement has been unlocked
 *           by the user.
 * @property unlocktime A Unix timestamp of the date when the achievement was unlocked.
 */
export type PlayerAchievement = {
  apiname: string
  achieved: PlayerAchievementStatus
  unlocktime: number
}

/**
 * @property gameName Steam internal (non-localized) name of game.
 * @property gameVersion Steam release version number currently live on Steam.
 * @property availableGameStats List of available achievements and stats for the game.
 */
export type GameSchema = {
  game: {
    gameName: string
    gameVersion: string
    availableGameStats: {
      achievements: GameSchemaAchievements[]
      stats: GameSchemaStats[]
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
  name: string
  defaultvalue: number
  displayName: string
  hidden: number
  description: string
  icon: string
  icongray: string
}

/**
 * @property name API name of stat.
 * @property defaultvalue Default value of stat.
 * @property displayName Developer provided name of stat.
 */
export type GameSchemaStats = {
  name: string
  defaultvalue: number
  displayName: string
}

/**
 * @property steamid SteamId of user.
 * @property appid AppId of game.
 * @property achievements List of game achievements the user has unlocked.
 */
export type GameUserStats = {
  steamid: SteamId
  appid: AppId
  achievements: {
    name: string
    achieved: number
  }[]
}

/**
 * @property result Result code.
 * @property globalstats Array of global game statistics.
 */
export type GlobalStatsForGame = {
  response: {
    result: number
    globalstats: {
      [key: string]: {
        total: number
      }
    }[]
  }
}
