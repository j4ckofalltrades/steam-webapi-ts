import { defaultWebApiClient, WebApiClient } from "../core/webApiClient"
import { AppId, SteamId, WebApiKey } from "../core/steamWebApi"
import {
  BadgeProgress,
  GetOwnedGamesParams,
  OwnedGames,
  PlayerBadges,
  RecentlyPlayedGames,
  SharedGameDetails,
  SteamLevel,
} from "./playerServiceWrapper.types"

export const GET_RECENTLY_PLAYED_GAMES = "/IPlayerService/GetRecentlyPlayedGames/v1"
export const GET_OWNED_GAMES = "/IPlayerService/GetOwnedGames/v1"
export const GET_STEAM_LEVEL = "/IPlayerService/GetSteamLevel/v1"
export const GET_BADGES = "/IPlayerService/GetBadges/v1"
export const GET_COMMUNITY_BADGE_PROGRESS = "/IPlayerService/GetCommunityBadgeProgress/v1"
export const IS_PLAYING_SHARED_GAME = "/IPlayerService/IsPlayingSharedGame/v1"

/**
 * Methods relating to a Steam user's games.
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
