import { ISteamUser } from "../api/usersApi"
import {
  friendsListMock,
  playerBansMock,
  playerSummariesMock,
  userGroupListMock,
  vanityURLResolvedMock
} from "../fixtures/response"
import { HttpClient } from "../api/http"
import {
  GET_FRIEND_LIST,
  GET_PLAYER_BANS,
  GET_PLAYER_SUMMARIES,
  GET_USER_GROUP_LIST,
  RESOLVE_VANITY_URL
} from "../api/url"

jest.mock("../api/http")

const HttpClientMock = HttpClient as jest.MockedClass<typeof HttpClient>
const apiKeyTest = "apiKey"
const setup = () => {
  const httpMock = new HttpClientMock()
  const api = new ISteamUser(apiKeyTest, httpMock)

  return { httpMock, api }
}
beforeEach(() => {
  jest.resetAllMocks()
})

describe("ISteamUser", () => {
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
      expect(httpMock.get).toBeCalledWith(
        GET_FRIEND_LIST,
        {
          params: {
            key: apiKeyTest,
            steamid,
            relationship,
          }
        }
      )
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
      expect(httpMock.get).toBeCalledWith(
        GET_PLAYER_BANS,
        {
          params: {
            key: apiKeyTest,
            steamids: JSON.stringify(steamids),
          }
        }
      )
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
      expect(httpMock.get).toBeCalledWith(
        GET_PLAYER_SUMMARIES,
        {
          params: {
            key: apiKeyTest,
            steamids: JSON.stringify(steamids),
          }
        }
      )
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
      expect(httpMock.get).toBeCalledWith(
        GET_USER_GROUP_LIST,
        {
          params: {
            key: apiKeyTest,
            steamid,
          }
        }
      )
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
      expect(httpMock.get).toBeCalledWith(
        RESOLVE_VANITY_URL,
        {
          params: {
            key: apiKeyTest,
            vanityurl,
          }
        }
      )
    })
  })
})
