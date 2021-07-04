import { httpClient, HttpClient } from "./http"
import { SteamId, WebApiKey } from "./shared"
import { GET_OWNED_GAMES, GET_RECENTLY_PLAYED_GAMES } from "./url"

/**
 * @property appid An integer containing the program's ID.
 * @property name A string containing the program's publicly facing title.
 * @property playtime_2weeks An integer of the player's playtime in the past 2 weeks, denoted in minutes.
 * @property playtime_forever An integer of the the player's total playtime, denoted in minutes.
 * @property img_icon_url The program icon's file name, accessible at:
 *           http://media.steampowered.com/steamcommunity/public/images/apps/APPID/IMG_ICON_URL.jpg, replacing "APPID"
 *           and "IMG_ICON_URL" as necessary.
 * @property img_logo_url The program logo's file name, accessible at:
 *           http://media.steampowered.com/steamcommunity/public/images/apps/APPID/IMG_LOGO_URL.jpg, replacing "APPID"
 *           and "IMG_ICON_URL" as necessary.
 * @property playtime_windows_forever An integer of the the player's total playtime on Windows, denoted in minutes.
 * @property playtime_mac_forever An integer of the the player's total playtime on MacOS, denoted in minutes.
 * @property playtime_linux_forever An integer of the the player's total playtime on Linux, denoted in minutes.
 */
export type Game = {
  appid: string,
  name: string,
  playtime_2weeks: number,
  playtime_forever: number,
  img_icon_url: string,
  img_logo_url: string,
  playtime_windows_forever: number,
  playtime_mac_forever: number,
  playtime_linux_forever: number,
}

/**
 * @property total_count Total number of results.
 * @property games Array of games recently played by the user.
 */
export type RecentlyPlayedGames = {
  response: {
    total_count: number,
    games: Game[],
  }
}

/**
 * @property has_community_visible_stats (Optional) Whether the program has stats accessible via
 *           {@link ISteamUserStats.getUserStatsForGame} and {@link ISteamUserStats.getGlobalStatsForGame}.
 */
export type OwnedGame = Partial<Game> & {
  has_community_visible_stats: boolean,
}

/**
 * @property game_count Total number of results.
 * @property games Array of games belonging to the user.
 */
export type OwnedGames = {
  response: {
    game_count: number,
    games: OwnedGame[],
  }
}

/**
 * @property include_appinfo (Optional) Whether or not to include additional details of apps - name and images.
 *           Defaults to false.
 * @property include_played_free_games (Optional) Whether or not to list free-to-play games in the results.
 *           Defaults to false.
 * @proprety appids_filter (Optional) Restricts results to the appids passed here. This is an array and should be passed
 *           like "appids_filter[0]=440&appids_filter[1]=570".
 */
export type GetOwnedGamesParams = {
  include_appinfo?: boolean,
  include_played_free_games?: boolean,
  appids_filter?: number[],
}

/**
 * Methods relating to a Steam user's games.
 */
export class IPlayerService {

  private readonly apiKey: WebApiKey
  private readonly http: HttpClient

  /**
   * @param apiKey Steam Web API key.
   * @param http Http client.
   */
  constructor(apiKey: WebApiKey, http: HttpClient = httpClient) {
    this.apiKey = apiKey
    this.http = http
  }

  /**
   * Gets information about a player's recently played games.
   *
   * @param steamid The player we're asking about.
   * @param count The number of games to return (0/unset: all).
   */
  async getRecentlyPlayedGames(steamid: SteamId, count?: number): Promise<RecentlyPlayedGames> {
    return await this.http.get<RecentlyPlayedGames>(
      GET_RECENTLY_PLAYED_GAMES,
      {
        params: {
          key: this.apiKey,
          steamid,
          count,
        }
      }
    )
  }

  /**
   * Return a list of games owned by the player.
   *
   * @param steamid The player we're asking about.
   * @param request (Optional) Additional request parameters.
   */
  async getOwnedGames(steamid: SteamId, request?: GetOwnedGamesParams): Promise<OwnedGames> {
    let requestParams = {}
    if (request?.appids_filter !== undefined && request?.appids_filter.length > 0) {
      const appids = request?.appids_filter
      for (let i = 0; i < appids.length; i++) {
        requestParams = {
          ...requestParams,
          [`appids_filter[${ i }]`]: appids[i],
        }
      }
    }

    const include_appinfo = request?.include_appinfo !== undefined ? request.include_appinfo : false
    const include_played_free_games = request?.include_played_free_games !== undefined
      ? request.include_played_free_games : false

    return await this.http.get<OwnedGames>(
      GET_OWNED_GAMES,
      {
        params: {
          ...requestParams,
          key: this.apiKey,
          steamid,
          include_appinfo,
          include_played_free_games,
        }
      }
    )
  }
}
