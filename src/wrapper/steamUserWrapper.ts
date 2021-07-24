import { defaultWebApiClient, WebApiClient } from "../core/webApiClient"
import { SteamId, WebApiKey } from "../core/steamWebApi"
import {
  FriendList,
  FriendRelationship,
  PlayerBans,
  PlayerSummaries,
  UserGroups,
  VanityURLResolved,
} from "./steamUserWrapper.types"

export const GET_PLAYER_SUMMARIES = "/ISteamUser/GetPlayerSummaries/v2"
export const GET_FRIEND_LIST = "ISteamUser/GetFriendList/v1"
export const GET_PLAYER_BANS = "ISteamUser/GetPlayerBans/v1"
export const GET_USER_GROUP_LIST = "ISteamUser/GetUserGroupList/v1"
export const RESOLVE_VANITY_URL = "ISteamUser/ResolveVanityURL/v1"

/**
 * Methods relating to Steam users.
 */
export class ISteamUserWrapper {
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
   * User friend list.
   *
   * @param steamid The 64 bit ID of the user to retrieve a list for.
   * @param relationship Filter by a given role. Possible options are *all* (All roles), *friend*.
   * */
  async getFriendList(steamid: SteamId, relationship: FriendRelationship): Promise<FriendList> {
    return await this.webApiClient.get<FriendList>(GET_FRIEND_LIST, {
      params: {
        key: this.apiKey,
        steamid: steamid,
        relationship,
      },
    })
  }

  /**
   * Player ban/probation status.
   *
   * @param steamids Comma-delimited list of steam IDs.
   */
  async getPlayerBans(steamids: SteamId[]): Promise<PlayerBans> {
    return await this.webApiClient.get<PlayerBans>(GET_PLAYER_BANS, {
      params: {
        key: this.apiKey,
        steamids: JSON.stringify(steamids),
      },
    })
  }

  /**
   * User profile data.
   *
   * @param steamids Comma-delimited list of steam IDs.
   */
  async getPlayerSummaries(steamids: SteamId[]): Promise<PlayerSummaries> {
    return await this.webApiClient.get<PlayerSummaries>(GET_PLAYER_SUMMARIES, {
      params: {
        key: this.apiKey,
        steamids: JSON.stringify(steamids),
      },
    })
  }

  /**
   * Lists Group ID(s) linked with 64 bit ID.
   *
   * @param steamid The 64 bit ID of the user.
   */
  async getUserGroupList(steamid: SteamId): Promise<UserGroups> {
    return await this.webApiClient.get<UserGroups>(GET_USER_GROUP_LIST, {
      params: {
        key: this.apiKey,
        steamid,
      },
    })
  }

  /**
   * Resolve vanity URL parts to a 64 bit ID.
   *
   * @param vanityurl The user's vanity URL that you would like to retrieve a steam ID for,
   *        e.g. http://steamcommunity.com/id/gabelogannewell would use "gabelogannewell".
   */
  async resolveVanityURL(vanityurl: string): Promise<VanityURLResolved> {
    return await this.webApiClient.get<VanityURLResolved>(RESOLVE_VANITY_URL, {
      params: {
        key: this.apiKey,
        vanityurl,
      },
    })
  }
}
