import { FriendList, FriendRelationship, PlayerBans, PlayerSummaries, SteamId, UserGroups, WebApiKey } from "./types"
import { httpClient, HttpClient } from "./http"
import { GET_FRIEND_LIST, GET_PLAYER_BANS, GET_PLAYER_SUMMARIES, GET_USER_GROUP_LIST } from "./url"

/**
 * Methods relating to Steam users.
 */
export class ISteamUser {

  private readonly http: HttpClient
  private readonly apiKey: WebApiKey

  constructor(apiKey: WebApiKey, http: HttpClient = httpClient) {
    this.apiKey = apiKey
    this.http = http
  }

  /**
   * User friend list
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
   * Player ban/probation status
   *
   * @param steamids Comma-delimited list of SteamIDs
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
   * @param steamids Comma-delimited list of SteamIDs
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
}
