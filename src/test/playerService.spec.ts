import { HttpClient } from "../api/http"
import { GET_OWNED_GAMES, GET_RECENTLY_PLAYED_GAMES, GET_STEAM_LEVEL } from "../api/url"
import { IPlayerService } from "../api/playerService"
import { ownedGamesMock, playerLevelMock, recentlyPlayedGamesMock } from "../fixtures/playerServiceMock"

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
      expect(httpMock.get).toBeCalledWith(
        GET_RECENTLY_PLAYED_GAMES,
        {
          params: {
            key: apiKeyTest,
            steamid,
          }
        }
      )
    })
  })

  describe("getOwnedGames", () => {
    beforeEach(() => {
      HttpClientMock.prototype.get.mockResolvedValue(ownedGamesMock)
    })

    it("should return games belonging to the user", async () => {
      const response = await api.getOwnedGames(steamid)

      expect(response).toEqual(ownedGamesMock)
      expect(httpMock.get).toBeCalledWith(
        GET_OWNED_GAMES,
        {
          params: {
            key: apiKeyTest,
            steamid,
            // Whether or not to list free-to-play games in the results. Defaults to false.
            include_appinfo: false,
            // Whether or not to include additional details of apps - name and images. Defaults to false.
            include_played_free_games: false,
          }
        }
      )
    })
  })

  describe("getSteamLevel", () => {
    beforeEach(() => {
      HttpClientMock.prototype.get.mockResolvedValue(playerLevelMock)
    })

    it("should return the user's Steam level", async () => {
      const response = await api.getSteamLevel(steamid)

      expect(response).toEqual(playerLevelMock)
      expect(httpMock.get).toBeCalledWith(
        GET_STEAM_LEVEL,
        {
          params: {
            key: apiKeyTest,
            steamid,
          }
        }
      )
    })
  })
})
