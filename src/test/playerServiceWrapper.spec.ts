import { WebApiClient } from "../core/webApiClient"
import {
  GET_BADGES,
  GET_COMMUNITY_BADGE_PROGRESS,
  GET_OWNED_GAMES,
  GET_RECENTLY_PLAYED_GAMES,
  GET_STEAM_LEVEL,
  IPlayerServiceWrapper,
  IS_PLAYING_SHARED_GAME,
} from "../wrapper/playerServiceWrapper"
import {
  ownedGamesMock,
  playerBadgeProgressMock,
  playerBadgesMock,
  playerLevelMock,
  playingSharedGameMock,
  recentlyPlayedGamesMock,
} from "./playerServiceWrapper.mock"
import { GetOwnedGamesParams } from "../wrapper/playerServiceWrapper.types"

jest.mock("../core/webApiClient")

const HttpClientMock = WebApiClient as jest.MockedClass<typeof WebApiClient>
const apiKeyTest = "apiKey"
const setup = () => {
  const httpMock = new HttpClientMock()
  const api = new IPlayerServiceWrapper(apiKeyTest, httpMock)

  return { httpMock, api }
}
beforeEach(() => {
  jest.resetAllMocks()
})

describe("IPlayerServiceWrapper", () => {
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

    it("should return games belonging to the user filtered by params", async () => {
      const request: GetOwnedGamesParams = {
        include_appinfo: true,
        include_played_free_games: true,
        appids_filter: [570, 571],
      }

      const response = await api.getOwnedGames(steamid, request)

      expect(response).toEqual(ownedGamesMock)
      expect(httpMock.get).toBeCalledWith(GET_OWNED_GAMES, {
        params: {
          key: apiKeyTest,
          steamid,
          include_appinfo: true,
          include_played_free_games: true,
          "appids_filter[0]": 570,
          "appids_filter[1]": 571,
        },
      })
    })

    it("should handle excluded optional params", async () => {
      const request: GetOwnedGamesParams = {
        include_appinfo: false,
        include_played_free_games: true,
      }

      const response = await api.getOwnedGames(steamid, request)

      expect(response).toEqual(ownedGamesMock)
      expect(httpMock.get).toBeCalledWith(GET_OWNED_GAMES, {
        params: {
          key: apiKeyTest,
          steamid,
          include_appinfo: false,
          include_played_free_games: true,
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

    it("should return the quests needed for all badges", async () => {
      const response = await api.getCommunityBadgeProgress(steamid)

      expect(response).toEqual(playerBadgeProgressMock)
      expect(httpMock.get).toBeCalledWith(GET_COMMUNITY_BADGE_PROGRESS, {
        params: {
          key: apiKeyTest,
          steamid,
        },
      })
    })

    it("should return the quests needed to get the specified badge", async () => {
      const badgeid = 123
      const response = await api.getCommunityBadgeProgress(steamid, badgeid)

      expect(response).toEqual(playerBadgeProgressMock)
      expect(httpMock.get).toBeCalledWith(GET_COMMUNITY_BADGE_PROGRESS, {
        params: {
          key: apiKeyTest,
          steamid,
          badgeid,
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
