import {
  FriendList,
  GET_FRIEND_LIST,
  GET_PLAYER_BANS,
  GET_PLAYER_SUMMARIES,
  GET_USER_GROUP_LIST,
  ISteamUserWrapper,
  PlayerBans,
  PlayerSummaries,
  RESOLVE_VANITY_URL,
  UserGroups,
  VanityURLResolved,
} from "../wrapper/steamUserWrapper"
import { WebApiClient } from "../core/webApiClient"

jest.mock("../core/webApiClient")

const HttpClientMock = WebApiClient as jest.MockedClass<typeof WebApiClient>
const apiKeyTest = "apiKey"
const setup = () => {
  const httpMock = new HttpClientMock()
  const api = new ISteamUserWrapper(apiKeyTest, httpMock)

  return { httpMock, api }
}
beforeEach(() => {
  jest.resetAllMocks()
})

const playerSummariesMock: PlayerSummaries = {
  response: {
    players: [
      {
        steamid: "76561197960435530",
        communityvisibilitystate: 3,
        profilestate: 1,
        personaname: "Robin",
        profileurl: "https://steamcommunity.com/id/robinwalker/",
        avatar:
          "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/f1/f1dd60a188883caf82d0cbfccfe6aba0af1732d4.jpg",
        avatarmedium:
          "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/f1/f1dd60a188883caf82d0cbfccfe6aba0af1732d4_medium.jpg",
        avatarfull:
          "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/f1/f1dd60a188883caf82d0cbfccfe6aba0af1732d4_full.jpg",
        avatarhash: "f1dd60a188883caf82d0cbfccfe6aba0af1732d4",
        personastate: 0,
        realname: "Robin Walker",
        primaryclanid: "103582791429521412",
        timecreated: 1063407589,
        personastateflags: 0,
        loccountrycode: "US",
        locstatecode: "WA",
        loccityid: 3961,
      },
    ],
  },
}

export const friendsListMock: FriendList = {
  friendslist: {
    friends: [
      {
        steamid: "76561197960265740",
        relationship: "friend",
        friend_since: 0,
      },
      {
        steamid: "76561197960265744",
        relationship: "friend",
        friend_since: 1585508613,
      },
    ],
  },
}

export const playerBansMock: PlayerBans = {
  players: [
    {
      SteamId: "76561197960435530",
      CommunityBanned: false,
      VACBanned: false,
      NumberOfVACBans: 0,
      DaysSinceLastBan: 0,
      NumberOfGameBans: 0,
      EconomyBan: "none",
    },
  ],
}

export const userGroupListMock: UserGroups = {
  response: {
    success: true,
    groups: [
      {
        gid: "4",
      },
    ],
  },
}

export const vanityURLResolvedMock: VanityURLResolved = {
  response: {
    steamid: "76561197960435530",
    success: 1,
  },
}

describe("ISteamUserWrapper", () => {
  const { httpMock, api } = setup()

  describe("getFriendsList", () => {
    beforeEach(() => {
      HttpClientMock.prototype.get.mockResolvedValue(friendsListMock)
    })

    it("should return friendList", async () => {
      const steamid = "1"
      const relationship = "friend"
      const response = await api.getFriendList(steamid, relationship)

      expect(response).toEqual(friendsListMock)
      expect(httpMock.get).toHaveBeenCalledWith(GET_FRIEND_LIST, {
        params: {
          key: apiKeyTest,
          steamid,
          relationship,
        },
      })
    })
  })

  describe("getPlayerBans", () => {
    beforeEach(() => {
      HttpClientMock.prototype.get.mockResolvedValue(playerBansMock)
    })

    it("should return playerBans", async () => {
      const steamids = ["1"]
      const response = await api.getPlayerBans(steamids)

      expect(response).toEqual(playerBansMock)
      expect(httpMock.get).toHaveBeenCalledWith(GET_PLAYER_BANS, {
        params: {
          key: apiKeyTest,
          steamids: JSON.stringify(steamids),
        },
      })
    })
  })

  describe("getPlayerSummaries", () => {
    beforeEach(() => {
      HttpClientMock.prototype.get.mockResolvedValue(playerSummariesMock)
    })

    it("should return playerSummaries", async () => {
      const steamids = ["1"]
      const response = await api.getPlayerSummaries(steamids)

      expect(response).toEqual(playerSummariesMock)
      expect(httpMock.get).toHaveBeenCalledWith(GET_PLAYER_SUMMARIES, {
        params: {
          key: apiKeyTest,
          steamids: JSON.stringify(steamids),
        },
      })
    })
  })

  describe("getUserGroupList", () => {
    beforeEach(() => {
      HttpClientMock.prototype.get.mockResolvedValue(userGroupListMock)
    })

    it("should return userGroupList", async () => {
      const steamid = "1"
      const response = await api.getUserGroupList(steamid)

      expect(response).toEqual(userGroupListMock)
      expect(httpMock.get).toHaveBeenCalledWith(GET_USER_GROUP_LIST, {
        params: {
          key: apiKeyTest,
          steamid,
        },
      })
    })
  })

  describe("resolveVanityURL", () => {
    beforeEach(() => {
      HttpClientMock.prototype.get.mockResolvedValue(vanityURLResolvedMock)
    })

    it("should return vanityURLResolved", async () => {
      const vanityurl = "gabelogannewell"
      const response = await api.resolveVanityURL(vanityurl)

      expect(response).toEqual(vanityURLResolvedMock)
      expect(httpMock.get).toHaveBeenCalledWith(RESOLVE_VANITY_URL, {
        params: {
          key: apiKeyTest,
          vanityurl,
        },
      })
    })
  })
})
