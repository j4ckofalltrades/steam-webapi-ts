export type AppId = number

/**
 * User's 64-bit ID.
 */
export type SteamId = string

/**
 * The file format to return output in.
 * json (default) - The JavaScript Object Notation format.
 * xml - Standard XML
 * vdf - Valve Data Format
 */
export type OutputFormat = "json" | "xml" | "vdf"

/**
 * Steam Web API key. Without this, the server will return an HTTP 403 (forbidden) error.
 * A key can be generated at {@link https://steamcommunity.com/dev/apikey}.
 */
export type WebApiKey = string

type JsonValue =
  | string
  | number
  | boolean
  | null
  | JsonValue[]
  | {[key: string]: JsonValue}


/**
 * @property steamid The user's 64 bit ID
 * @property communityvisibilitystate An integer that describes the access setting of the profile.
 *           1 - Private, 2 - Friends only, 3 - Friends of Friends, 4 - Users Only, 5 Public.
 * @property profilestate If set to 1 the user has configured the profile.
 * @property personaname User's display name.
 * @property profileurl The URL to the user's Steam Community profile.
 * @property avatar A 32x32 image
 * @property avatarmedium A 64x64 image
 * @property avatarfull A 184x184 image
 * @property personastate The user's status.
 *           0 - Offline, 1 - Online, 2 - Busy, 3 - Away, 4 - Snooze, 5 - looking to trade, 6 - looking to play.
 * @property commentpermission (Optional) If present the profile allows public comments.
 * @property realname (Optional) The user's real name.
 * @property primaryclanid (Optional) The 64 bit ID of the user's primary group.
 * @property timecreated (Optional) A unix timestamp of the date the profile was created.
 * @property loccountrycode (Optional) ISO 3166 code of where the user is located.
 * @property locstatecode (Optional) Variable length code representing the state the user is located in.
 * @property cityid (Optional) An integer ID internal to Steam representing the user's city.
 * @property gameid (Optional) If the user is in game this will be set to it's app ID as a string.
 * @property gameextrainfo (Optional) The title of the game.
 * @property gameserverip (Optional) The server URL given as an IP address and port number separated by a colon,
 *           this will not be present or set to "0.0.0.0:0" if none is available.
 */
export type PlayerSummary = {
  steamid: string,
  personaname: string,
  profileurl: string,
  avatar: string,
  avatarmedium: string,
  avatarfull: string,
  personastate: number,
  communityvisibilitystate: number,
  profilestate: number,
  commentpermission: string,
  realname?: string,
  primaryclanid?: string,
  timecreated?: number,
  gameid?: number,
  gameserverip?: string,
  gameextrainfo?: string,
  cityid?: string,
  loccountrycode?: string,
  locstatecode?: string,
}

/**
 * @property players A list of profile objects. Contained information varies depending on whether or not the user has
 *           their profile set to Friends only or Private.
 */
export type PlayerSummaries = {
  response: {
    players: PlayerSummary[],
  }
}

export type FriendRelationship = "all" | "friend"

/**
 * @property steamid The user's 64 bit ID
 * @property relationship Role in relation to the given steamid
 * @property friend_since A unix timestamp of when the friend was added to the list.
 */
export type Friend = {
  steamid: string,
  relationship: string,
  friend_since: number,
}

/**
 * @property friendslist (Optional) If the profile is not public or there are no available entries for the given
 *           relationship only an empty object will be returned.
 * @property friends A list of objects for each list entry.
 */
export type FriendList = {
  friendslist: {
    friends: Friend[],
  }
}
