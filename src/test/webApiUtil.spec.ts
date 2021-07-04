import { HttpClient } from "../api/http"
import { ISteamWebAPIUtil } from "../api/webApiUtil"
import { serverInfoMock, supportedAPIMock } from "../fixtures/webApiUtilMock"
import { GET_SERVER_INFO, GET_SUPPORTED_API_LIST } from "../api/url"

jest.mock("../api/http")

const HttpClientMock = HttpClient as jest.MockedClass<typeof HttpClient>
const setup = () => {
  const httpMock = new HttpClientMock()
  const api = new ISteamWebAPIUtil(httpMock)

  return { httpMock, api }
}
beforeEach(() => {
  jest.resetAllMocks()
})

describe("ISteamWebAPIUtil", () => {
  const { httpMock, api } = setup()
  const apiKey = "1"

  describe("getServerInfo", () => {
    beforeEach(() => {
      HttpClientMock.prototype.get.mockResolvedValue(serverInfoMock)
    })

    it("should return server info", async () => {
      const response = await api.getServerInfo()

      expect(response).toEqual(serverInfoMock)
      expect(httpMock.get).toBeCalledWith(GET_SERVER_INFO)
    })
  })

  describe("getSupportedAPIList", () => {
    beforeEach(() => {
      HttpClientMock.prototype.get.mockResolvedValue(supportedAPIMock)
    })

    it("should return supported API list", async () => {
      const response = await api.getSupportedAPIList(apiKey)

      expect(response).toEqual(supportedAPIMock)
      expect(httpMock.get).toBeCalledWith(
        GET_SUPPORTED_API_LIST,
        {
          params: {
            key: apiKey,
          }
        }
      )
    })
  })
})
