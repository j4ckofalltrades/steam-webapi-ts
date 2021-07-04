/**
 * Game ID.
 */
export type AppId = number

/**
 * User's 64-bit ID.
 */
export type SteamId = string

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
 * @property steamid The user's 64 bit ID.
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
  steamid: SteamId,
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
 * @property steamid The user's 64 bit ID.
 * @property relationship Role in relation to the given steamid.
 * @property friend_since A unix timestamp of when the friend was added to the list.
 */
export type Friend = {
  steamid: SteamId,
  relationship: FriendRelationship,
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

/**
 * @property SteamId A string containing the player's 64 bit ID.
 * @property CommunityBanned Boolean indicating whether or not the player is banned from Community.
 * @property VACBanned Boolean indicating whether or not the player has VAC bans on record.
 * @property NumberOfGameBans Number of bans in games.
 * @property EconomyBan String containing the player's ban status in the economy. If the player has no bans on
 *           record the string will be "none", if the player is on probation it will say "probation", and so forth.
 */
export type PlayerBan = {
  SteamId: SteamId,
  CommunityBanned: boolean,
  VACBanned: boolean,
  NumberOfGameBans: boolean,
  EconomyBan: string,
}

/**
 * @property players List of player ban objects for each given (and valid) 64 bit ID.
 */
export type PlayerBans = {
  players: PlayerBan[],
}

/**
 * @property gid 64 bit ID number of group.
 */
export type UserGroup = {
  gid: string,
}

/**
 * @property success Result status of the call.
 * @property groups List of groups the user subscribes to.
 */
export type UserGroups = {
  response: {
    success: boolean,
    groups: UserGroup[],
  }
}

// 1 if successful, 42 if there was no match.
type Result = 1 | 42

/**
 * @property success The status of the request. 1 if successful, 42 if there was no match.
 * @property steamid (Optional) The 64 bit Steam ID the vanity URL resolves to. Not returned on resolution failures.
 * @property message (Optional) The message associated with the request status. Currently only used on resolution
 *           failures.
 */
export type VanityURLResolved = {
  response: {
    success: Result,
    steamid?: string,
    message?: string,
  }
}

/**
 * @property apps A list of objects containing the title and app ID of each program available in the store.
 */
export type AppList = {
  applist: {
    apps: App[],
  }
}

/**
 * @property appid An integer containing the program's ID.
 * @property name A string containing the program's publicly facing title.
 */
export type App = {
  appid: AppId,
  name: string
}

/**
 * @property success Boolean indicating if request was successful.
 * @property up_to_date Boolean indicating if the given version number is the most current version.
 * @property version_is_listable Boolean indicating if the given version can be listed in public changelogs. [1]
 * @property required_version (Optional) Integer of the most current version of the app available.
 * @property message (Optional) A string giving the status message if applicable.
 */
export type UpToDateCheck = {
  response: {
    success: boolean,
    up_to_date: boolean,
    version_is_listable: boolean,
    required_version?: number,
    message?: string,
  }
}

/**
 * @property achievementpercentages List of achievements and percentage of players that have unlocked said achievement.
 */
export type AchievementPercentages = {
  achievementpercentages: {
    achievements: GlobalAchievement[],
  }
}

/**
 * @property name The name of the achievement as an unlocalized token.
 * @property percent Percentage of player population that has unlocked the achievement given as a double.
 */
export type GlobalAchievement = {
  name: string,
  percent: number,
}

/**
 * @property player_count Total number of currently active players for the specified app.
 * @property result The status of the request. 1 if successful, 42 if there was no match.
 */
export type CurrentPlayerCount = {
  response: {
    player_count: number,
    result: Result,
  }
}

/**
 * @property steamID The 64 bit ID of the user
 * @property gameName String containing the game title
 * @property achievements List of {@link PlayerAchievement} objects
 */
export type PlayerStats = {
  steamID: SteamId,
  gameName: string,
  achievements: PlayerAchievement[],
  success: boolean,
}

// 1 if achievement has been unlocked, 0 if otherwise.
type PlayerAchievementStatus = 0 | 1

/**
 * @property apiname String containing the ID of the achievement.
 * @property achieved Integer to be used as a boolean value indicating whether or not the achievement has been unlocked
 *           by the user.
 * @property unlocktime A unix timestamp of the date when the achievement was unlocked.
 */
export type PlayerAchievement = {
  apiname: string,
  achieved: PlayerAchievementStatus,
  unlocktime: number,
}

/**
 * @property gameName Steam internal (non-localized) name of game.
 * @property gameVersion Steam release version number currently live on Steam.
 * @property availableGameStats List of available achievements and stats for the game.
 */
export type GameSchema = {
  game: {
    gameName: string,
    gameVersion: string,
    availableGameStats: {
      achievements: GameSchemaAchievements[],
      stats: GameSchemaStats[],
    }
  }
}

/**
 * @property name API Name of achievement.
 * @property defaultvalue Always 0 (player's default state is unachieved).
 * @property displayName Display title string of achievement.
 * @property hidden If achievement is hidden to the user before earning achievement, value is 1. 0 if public.
 * @property description Display description string of achievement.
 * @property icon Absolute URL of earned achievement icon art.
 * @property icongray Absolute URL of un-earned achievement icon art.
 */
export type GameSchemaAchievements = {
  name: string,
  defaultvalue: number,
  displayName: string,
  hidden: number,
  description: string,
  icon: string,
  icongray: string,
}

/**
 * @property name API name of stat.
 * @property defaultvalue Default value of stat.
 * @property displayName Developer provided name of stat.
 */
export type GameSchemaStats = {
  name: string,
  defaultvalue: number,
  displayName: string,
}

/**
 * @property steamid SteamId of user
 * @property appid AppId of game
 * @property achievements List of game achievements the user has unlocked
 */
export type GameUserStats = {
  steamid: SteamId,
  appid: AppId,
  achievements: {
    name: string,
    achieved: number
  }[],
}

/**
 * @property result Result code
 * @property globalstats Array of global game statistics
 */
export type GlobalStatsForGame = {
  response: {
    result: number,
    globalstats: {
      [key: string]: {
        total: number
      }
    }[],
  }
}
