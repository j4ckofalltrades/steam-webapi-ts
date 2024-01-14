import { defaultWebApiClient, WebApiClient } from "../core/webApiClient"
import { AppId, SteamId, WebApiKey } from "../core/steamWebApi"

export const GET_RECENTLY_PLAYED_GAMES = "/IPlayerService/GetRecentlyPlayedGames/v1"
export const GET_OWNED_GAMES = "/IPlayerService/GetOwnedGames/v1"
export const GET_STEAM_LEVEL = "/IPlayerService/GetSteamLevel/v1"
export const GET_BADGES = "/IPlayerService/GetBadges/v1"
export const GET_COMMUNITY_BADGE_PROGRESS = "/IPlayerService/GetCommunityBadgeProgress/v1"
export const IS_PLAYING_SHARED_GAME = "/IPlayerService/IsPlayingSharedGame/v1"

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
 * @property include_appinfo (Optional) Whether to include additional details of apps - name and images.
 *           Defaults to false.
 * @property include_played_free_games (Optional) Whether to list free-to-play games in the results.
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

/**
 * Provides additional methods for interacting with Steam Users.
 */
export class IPlayerServiceWrapper {
  private readonly apiKey: WebApiKey
  private readonly webApiClient: WebApiClient

  /* istanbul ignore next */
  /**
   * @param apiKey Steam Web API key.
   * @param webApiClient Http client.
   */
  constructor(apiKey: WebApiKey, webApiClient: WebApiClient = defaultWebApiClient) {
    this.apiKey = apiKey
    this.webApiClient = webApiClient
  }

  /**
   * Gets information about a player's recently played games.
   *
   * @param steamid The player we're asking about.
   * @param count The number of games to return (0/unset: all).
   */
  async getRecentlyPlayedGames(steamid: SteamId, count?: number): Promise<RecentlyPlayedGames> {
    return await this.webApiClient.get<RecentlyPlayedGames>(GET_RECENTLY_PLAYED_GAMES, {
      params: {
        key: this.apiKey,
        steamid,
        count,
      },
    })
  }

  /**
   * Return a list of games owned by the player.
   *
   * @param steamid The player we're asking about.
   * @param request (Optional) Additional request parameters.
   */
  async getOwnedGames(steamid: SteamId, request?: GetOwnedGamesParams): Promise<OwnedGames> {
    let requestParams = {}
    const appids = request?.appids_filter !== undefined ? request.appids_filter : []
    for (let i = 0; i < appids.length; i++) {
      requestParams = {
        ...requestParams,
        [`appids_filter[${i}]`]: appids[i],
      }
    }

    const include_appinfo = request?.include_appinfo !== undefined ? request.include_appinfo : false
    const include_played_free_games =
      request?.include_played_free_games !== undefined ? request.include_played_free_games : false

    return await this.webApiClient.get<OwnedGames>(GET_OWNED_GAMES, {
      params: {
        ...requestParams,
        key: this.apiKey,
        steamid,
        include_appinfo,
        include_played_free_games,
      },
    })
  }

  /**
   * Returns the Steam Level of a user.
   *
   * @param steamid The player we're asking about.
   */
  async getSteamLevel(steamid: SteamId): Promise<SteamLevel> {
    return await this.webApiClient.get<SteamLevel>(GET_STEAM_LEVEL, {
      params: {
        key: this.apiKey,
        steamid,
      },
    })
  }

  /**
   * Gets badges that are owned by a specific user.
   *
   * @param steamid The player we're asking about.
   */
  async getBadges(steamid: SteamId): Promise<PlayerBadges> {
    return await this.webApiClient.get<PlayerBadges>(GET_BADGES, {
      params: {
        key: this.apiKey,
        steamid,
      },
    })
  }

  /**
   * Gets all the quests needed to get the specified badge, and which are completed.
   *
   * @param steamid The player we're asking about.
   * @param badge The badge we're asking about.
   */
  async getCommunityBadgeProgress(steamid: SteamId, badge?: number): Promise<BadgeProgress> {
    const badgeid = badge !== undefined ? { badgeid: badge } : undefined
    return await this.webApiClient.get<BadgeProgress>(GET_COMMUNITY_BADGE_PROGRESS, {
      params: {
        key: this.apiKey,
        steamid,
        ...badgeid,
      },
    })
  }

  /**
   * Returns valid lender SteamID if game currently played is borrowed.
   *
   * @param steamid The player we're asking about.
   * @param appid_playing The game player is currently playing.
   */
  async isPlayingSharedGame(steamid: SteamId, appid_playing: AppId): Promise<SharedGameDetails> {
    return await this.webApiClient.get<SharedGameDetails>(IS_PLAYING_SHARED_GAME, {
      params: {
        key: this.apiKey,
        steamid,
        appid_playing,
      },
    })
  }
}
