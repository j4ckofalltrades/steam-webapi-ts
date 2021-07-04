import { HttpClient } from "../api/http"
import { GET_RECENTLY_PLAYED_GAMES } from "../api/url"
import { IPlayerService } from "../api/playerService"
import { recentlyPlayedGamesMock } from "../fixtures/playerServiceMock"

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

  describe("getRecentlyPlayedGames", () => {
    beforeEach(() => {
      HttpClientMock.prototype.get.mockResolvedValue(recentlyPlayedGamesMock)
    })

    it("should return games recently played by the user", async () => {
      const steamid = "1"
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
})
