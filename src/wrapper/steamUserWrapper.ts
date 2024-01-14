import { defaultWebApiClient, WebApiClient } from "../core/webApiClient"
import { Result, SteamId, WebApiKey } from "../core/steamWebApi"

export const GET_PLAYER_SUMMARIES = "/ISteamUser/GetPlayerSummaries/v2"
export const GET_FRIEND_LIST = "ISteamUser/GetFriendList/v1"
export const GET_PLAYER_BANS = "ISteamUser/GetPlayerBans/v1"
export const GET_USER_GROUP_LIST = "ISteamUser/GetUserGroupList/v1"
export const RESOLVE_VANITY_URL = "ISteamUser/ResolveVanityURL/v1"

/**
 * @property steamid The user's 64-bit ID.
 * @property communityvisibilitystate An integer that describes the access setting of the profile.
 *           1 - Private, 2 - Friends only, 3 - Friends of Friends, 4 - Users Only, 5 Public.
 * @property profilestate If set to 1 the user has configured the profile.
 * @property personaname User's display name.
 * @property profileurl The URL to the user's Steam Community profile.
 * @property avatar A 32x32 image.
 * @property avatarmedium A 64x64 image.
 * @property avatarfull A 184x184 image.
 * @property avatarhash Avatar identifier.
 * @property personastate The user's status.
 *           0 - Offline, 1 - Online, 2 - Busy, 3 - Away, 4 - Snooze, 5 - looking to trade, 6 - looking to play.
 * @property commentpermission (Optional) If present the profile allows public comments.
 * @property realname (Optional) The user's real name.
 * @property primaryclanid (Optional) The 64-bit ID of the user's primary group.
 * @property timecreated (Optional) A unix timestamp of the date the profile was created.
 * @property loccountrycode (Optional) ISO 3166 code of where the user is located.
 * @property locstatecode (Optional) Variable length code representing the state the user is located in.
 * @property loccityid (Optional) An integer ID internal to Steam representing the user's city.
 * @property gameid (Optional) If the user is in game this will be set to its app ID as a string.
 * @property gameextrainfo (Optional) The title of the game.
 * @property gameserverip (Optional) The server URL given as an IP address and port number separated by a colon,
 *           this will not be present or set to "0.0.0.0:0" if none is available.
 */
export type PlayerSummary = {
  steamid: SteamId
  personaname: string
  profileurl: string
  avatar: string
  avatarmedium: string
  avatarfull: string
  avatarhash: string
  personastate: number
  communityvisibilitystate: number
  profilestate: number
  commentpermission?: string
  realname?: string
  primaryclanid?: string
  timecreated?: number
  gameid?: number
  gameserverip?: string
  gameextrainfo?: string
  loccityid?: number
  loccountrycode?: string
  locstatecode?: string
  personastateflags?: number
}

/**
 * @property players A list of profile objects. Contained information varies depending on whether the user has
 *           their profile set to Friends only or Private.
 */
export type PlayerSummaries = {
  response: {
    players: PlayerSummary[]
  }
}

export type FriendRelationship = "all" | "friend"

/**
 * @property steamid The user's 64-bit ID.
 * @property relationship Role in relation to the given steamid.
 * @property friend_since A unix timestamp of when the friend was added to the list.
 */
export type Friend = {
  steamid: SteamId
  relationship: FriendRelationship
  friend_since: number
}

/**
 * @property friendslist (Optional) If the profile is not public or there are no available entries for the given
 *           relationship only an empty object will be returned.
 * @property friends A list of objects for each list entry.
 */
export type FriendList = {
  friendslist: {
    friends: Friend[]
  }
}

/**
 * @property SteamId A string containing the player's 64-bit ID.
 * @property CommunityBanned Boolean indicating whether the player is banned from Community.
 * @property VACBanned Boolean indicating whether the player has VAC bans on record.
 * @property NumberOfGameBans Number of bans in games.
 * @property NumberOfVACBans Number of VAC bans.
 * @property DaysSinceLastBan Days since last ban.
 * @property EconomyBan String containing the player's ban status in the economy. If the player has no bans on
 *           record the string will be "none", if the player is on probation it will say "probation", and so forth.
 */
export type PlayerBan = {
  SteamId: SteamId
  CommunityBanned: boolean
  VACBanned: boolean
  NumberOfGameBans: number
  NumberOfVACBans: number
  DaysSinceLastBan: number
  EconomyBan: string
}

/**
 * @property players List of player ban objects for each given (and valid) 64 bit ID.
 */
export type PlayerBans = {
  players: PlayerBan[]
}

/**
 * @property gid 64 bit ID number of group.
 */
export type UserGroup = {
  gid: string
}

/**
 * @property success Result status of the call.
 * @property groups List of groups the user subscribes to.
 */
export type UserGroups = {
  response: {
    success: boolean
    groups: UserGroup[]
  }
}

/**
 * @property success The status of the request. 1 if successful, 42 if there was no match.
 * @property steamid (Optional) The 64-bit Steam ID the vanity URL resolves to. Not returned on resolution failures.
 * @property message (Optional) The message associated with the request status. Currently only used on resolution
 *           failures.
 */
export type VanityURLResolved = {
  response: {
    success: Result
    steamid?: string
    message?: string
  }
}

/**
 * Used to access information and interact with users.
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
   * @param steamid The 64-bit ID of the user to retrieve a list for.
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
   * Lists Group ID(s) linked with 64-bit ID.
   *
   * @param steamid The 64-bit ID of the user.
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
   * Resolve vanity URL parts to a 64-bit ID.
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
