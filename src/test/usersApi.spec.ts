import { ISteamUser } from "../api/usersApi"
import { playerSummariesMock } from "../fixtures/response"
import { HttpClient } from "../api/http"
import { GET_PLAYER_SUMMARIES } from "../api/url"

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
})
