import { HttpClient } from "../api/http"
import {
  GET_BADGES,
  GET_COMMUNITY_BADGE_PROGRESS,
  GET_OWNED_GAMES,
  GET_RECENTLY_PLAYED_GAMES,
  GET_STEAM_LEVEL,
  IS_PLAYING_SHARED_GAME,
} from "../api/url"
import { IPlayerService } from "../api/playerService"
import {
  ownedGamesMock,
  playerBadgeProgressMock,
  playerBadgesMock,
  playerLevelMock,
  playingSharedGameMock,
  recentlyPlayedGamesMock,
} from "../fixtures/playerServiceMock"

jest.mock("../api/http")

const HttpClientMock = HttpClient as jest.MockedClass<typeof HttpClient>
const apiKeyTest = "apiKey"
const setup = () => {
  const httpMock = new HttpClientMock()
  const api = new IPlayerService(apiKeyTest, httpMock)

  return { httpMock, api }
}
beforeEach(() => {
  jest.resetAllMocks()
})

describe("IPlayerService", () => {
  const { httpMock, api } = setup()
  const steamid = "1"

  describe("getRecentlyPlayedGames", () => {
    beforeEach(() => {
      HttpClientMock.prototype.get.mockResolvedValue(recentlyPlayedGamesMock)
    })

    it("should return games recently played by the user", async () => {
      const response = await api.getRecentlyPlayedGames(steamid)

      expect(response).toEqual(recentlyPlayedGamesMock)
      expect(httpMock.get).toBeCalledWith(GET_RECENTLY_PLAYED_GAMES, {
        params: {
          key: apiKeyTest,
          steamid,
        },
      })
    })
  })

  describe("getOwnedGames", () => {
    beforeEach(() => {
      HttpClientMock.prototype.get.mockResolvedValue(ownedGamesMock)
    })

    it("should return games belonging to the user", async () => {
      const response = await api.getOwnedGames(steamid)

      expect(response).toEqual(ownedGamesMock)
      expect(httpMock.get).toBeCalledWith(GET_OWNED_GAMES, {
        params: {
          key: apiKeyTest,
          steamid,
          // Whether or not to list free-to-play games in the results. Defaults to false.
          include_appinfo: false,
          // Whether or not to include additional details of apps - name and images. Defaults to false.
          include_played_free_games: false,
        },
      })
    })
  })

  describe("getSteamLevel", () => {
    beforeEach(() => {
      HttpClientMock.prototype.get.mockResolvedValue(playerLevelMock)
    })

    it("should return the user's Steam level", async () => {
      const response = await api.getSteamLevel(steamid)

      expect(response).toEqual(playerLevelMock)
      expect(httpMock.get).toBeCalledWith(GET_STEAM_LEVEL, {
        params: {
          key: apiKeyTest,
          steamid,
        },
      })
    })
  })

  describe("getBadges", () => {
    beforeEach(() => {
      HttpClientMock.prototype.get.mockResolvedValue(playerBadgesMock)
    })

    it("should return the user's Steam badges", async () => {
      const response = await api.getBadges(steamid)

      expect(response).toEqual(playerBadgesMock)
      expect(httpMock.get).toBeCalledWith(GET_BADGES, {
        params: {
          key: apiKeyTest,
          steamid,
        },
      })
    })
  })

  describe("getCommunityBadgeProgress", () => {
    beforeEach(() => {
      HttpClientMock.prototype.get.mockResolvedValue(playerBadgeProgressMock)
    })

    it("should return the quests needed to get the specified badge", async () => {
      const response = await api.getCommunityBadgeProgress(steamid)

      expect(response).toEqual(playerBadgeProgressMock)
      expect(httpMock.get).toBeCalledWith(GET_COMMUNITY_BADGE_PROGRESS, {
        params: {
          key: apiKeyTest,
          steamid,
        },
      })
    })
  })

  describe("isPlayingSharedGame", () => {
    beforeEach(() => {
      HttpClientMock.prototype.get.mockResolvedValue(playingSharedGameMock)
    })

    it("should return the lender Steam id for borrowed game", async () => {
      const appid_playing = 1
      const response = await api.isPlayingSharedGame(steamid, appid_playing)

      expect(response).toEqual(playingSharedGameMock)
      expect(httpMock.get).toBeCalledWith(IS_PLAYING_SHARED_GAME, {
        params: {
          key: apiKeyTest,
          steamid,
          appid_playing,
        },
      })
    })
  })
})
