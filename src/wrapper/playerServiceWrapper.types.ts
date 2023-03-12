import { AppId, SteamId } from "../core/steamWebApi"

/**
 * @property appid An integer containing the program's ID.
 * @property name A string containing the program's publicly facing title.
 * @property playtime_2weeks An integer of the player's playtime in the past 2 weeks, denoted in minutes.
 * @property playtime_forever An integer of the player's total playtime, denoted in minutes.
 * @property img_icon_url The program icon's file name, accessible at:
 *           http://media.steampowered.com/steamcommunity/public/images/apps/APPID/IMG_ICON_URL.jpg, replacing "APPID"
 *           and "IMG_ICON_URL" as necessary.
 * @property img_logo_url The program logo's file name, accessible at:
 *           http://media.steampowered.com/steamcommunity/public/images/apps/APPID/IMG_LOGO_URL.jpg, replacing "APPID"
 *           and "IMG_ICON_URL" as necessary.
 * @property playtime_windows_forever An integer of the player's total playtime on Windows, denoted in minutes.
 * @property playtime_mac_forever An integer of the player's total playtime on macOS, denoted in minutes.
 * @property playtime_linux_forever An integer of the player's total playtime on Linux, denoted in minutes.
 */
export type Game = {
  appid: string
  name: string
  playtime_2weeks: number
  playtime_forever: number
  img_icon_url: string
  img_logo_url: string
  playtime_windows_forever: number
  playtime_mac_forever: number
  playtime_linux_forever: number
}

/**
 * @property total_count Total number of results.
 * @property games Array of games recently played by the user.
 */
export type RecentlyPlayedGames = {
  response: {
    total_count: number
    games: Game[]
  }
}

/**
 * @property has_community_visible_stats (Optional) Whether the program has stats accessible via
 *           {@link ISteamUserStatsWrapper.getUserStatsForGame} and
 *           {@link ISteamUserStatsWrapper.getGlobalStatsForGame}.
 */
export type OwnedGame = Partial<Game> & {
  has_community_visible_stats: boolean
}

/**
 * @property game_count Total number of results.
 * @property games Array of games belonging to the user.
 */
export type OwnedGames = {
  response: {
    game_count: number
    games: OwnedGame[]
  }
}

/**
 * @property include_appinfo (Optional) Whether or not to include additional details of apps - name and images.
 *           Defaults to false.
 * @property include_played_free_games (Optional) Whether or not to list free-to-play games in the results.
 *           Defaults to false.
 * @property appids_filter (Optional) Restricts results to the appids passed here. This is an array and should be passed
 *           like "appids_filter[0]=440&appids_filter[1]=570".
 */
export type GetOwnedGamesParams = {
  include_appinfo?: boolean
  include_played_free_games?: boolean
  appids_filter?: number[]
}

/**
 * @property player_level The Steam level of the player.
 */
export type SteamLevel = {
  response: {
    player_level: number
  }
}

/**
 * @property badgeid Badge ID. Currently, no official badge schema is available.
 * @property appid (Optional) Provided if the badge relates to an app (trading cards).
 * @property completion_time Unix timestamp of when the steam user acquired the badge.
 * @property xp The experience this badge is worth, contributing toward the steam account's player_xp.
 * @property communityitemid (Optional) Provided if the badge relates to an app (trading cards); the value doesn't seem
 *           to be an item in the steam accounts backpack, however the value minus 1 seems to be the item ID for the
 *           emoticon granted for crafting this badge, and the value minus 2 seems to be the background granted.
 * @property border_color (Optional) Provided if the badge relates to an app (trading cards).
 * @property scarcity The amount of people who has this badge.
 */
export type Badge = {
  badgeid: number
  appid?: AppId
  level: number
  completion_time: number
  xp: number
  communityitemid?: number
  border_color: string
  scarcity: number
}

/**
 * @property badges Array of badges.
 */
export type PlayerBadges = {
  response: {
    badges: Badge[]
    player_xp: number
    player_level: number
    player_xp_needed_to_level_up: number
    player_xp_needed_current_level: number
  }
}

/**
 * @property quests Array of quests (actions required to unlock a badge).
 * @property questid Quest ID.
 * @property completed Whether the Steam account has completed this quest.
 */
export type BadgeProgress = {
  response: {
    quests: {
      questid: string
      completed: boolean
    }[]
  }
}

/**
 * @property lender_steamid Owner of shared game.
 */
export type SharedGameDetails = {
  response: {
    lender_steamid: SteamId
  }
}
