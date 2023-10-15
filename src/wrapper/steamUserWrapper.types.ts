import { Result, SteamId } from "../core/steamWebApi"

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