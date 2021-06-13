import { FriendList, FriendRelationship, PlayerSummaries, SteamId, WebApiKey } from "./types"
import { httpClient, HttpClient } from "./http"
import { GET_FRIEND_LIST, GET_PLAYER_SUMMARIES } from "./url"

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
   * User profile data
   *
   * @param steamids A comma-separated list of 64 bit IDs to retrieve profiles for.
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
}
