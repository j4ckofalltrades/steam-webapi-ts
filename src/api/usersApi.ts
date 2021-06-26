import {
  FriendList,
  FriendRelationship,
  PlayerBans,
  PlayerSummaries,
  SteamId,
  UserGroups,
  VanityURLResolved,
  WebApiKey
} from "./types"
import { httpClient, HttpClient } from "./http"
import { GET_FRIEND_LIST, GET_PLAYER_BANS, GET_PLAYER_SUMMARIES, GET_USER_GROUP_LIST, RESOLVE_VANITY_URL } from "./url"

/**
 * Methods relating to Steam users.
 */
export class ISteamUser {

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
   * User friend list.
   *
   * @param steamid The 64 bit ID of the user to retrieve a list for.
   * @param relationship Filter by a given role. Possible options are *all* (All roles), *friend*.
   * */
  async getFriendList(steamid: SteamId, relationship: FriendRelationship): Promise<FriendList> {
    return await this.http.get<FriendList>(
      GET_FRIEND_LIST,
      {
        params: {
          key: this.apiKey,
          steamid: steamid,
          relationship,
        }
      })
  }

  /**
   * Player ban/probation status.
   *
   * @param steamids Comma-delimited list of steam IDs.
   */
  async getPlayerBans(steamids: SteamId[]): Promise<PlayerBans> {
    return await this.http.get<PlayerBans>(
      GET_PLAYER_BANS,
      {
        params: {
          key: this.apiKey,
          steamids: JSON.stringify(steamids),
        }
      })
  }

  /**
   * User profile data
   *
   * @param steamids Comma-delimited list of steam IDs.
   */
  async getPlayerSummaries(steamids: SteamId[]): Promise<PlayerSummaries> {
    return await this.http.get<PlayerSummaries>(
      GET_PLAYER_SUMMARIES,
      {
        params: {
          key: this.apiKey,
          steamids: JSON.stringify(steamids),
        }
      })
  }

  /**
   * Lists Group ID(s) linked with 64 bit ID.
   *
   * @param steamid The 64 bit ID of the user.
   */
  async getUserGroupList(steamid: SteamId): Promise<UserGroups> {
    return await this.http.get<UserGroups>(
      GET_USER_GROUP_LIST,
      {
        params: {
          key: this.apiKey,
          steamid,
        }
      })
  }

  /**
   * Resolve vanity URL parts to a 64 bit ID.
   *
   * @param vanityurl The user's vanity URL that you would like to retrieve a steam ID for,
   *        e.g. http://steamcommunity.com/id/gabelogannewell would use "gabelogannewell".
   */
  async resolveVanityURL(vanityurl: string): Promise<VanityURLResolved> {
    return await this.http.get<VanityURLResolved>(
      RESOLVE_VANITY_URL,
      {
        params: {
          key: this.apiKey,
          vanityurl,
        }
      })
  }
}
