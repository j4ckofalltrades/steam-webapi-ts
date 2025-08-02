import { WebApiClient } from "../core/webApiClient"
import {
  GET_SERVER_INFO,
  GET_SUPPORTED_API_LIST,
  ISteamWebAPIUtilWrapper,
  ServerInfo,
  SupportedAPI,
} from "../wrapper/steamWebApiUtilWrapper"

jest.mock("../core/webApiClient")

const HttpClientMock = WebApiClient as jest.MockedClass<typeof WebApiClient>
const setup = () => {
  const httpMock = new HttpClientMock()
  const api = new ISteamWebAPIUtilWrapper(httpMock)

  return { httpMock, api }
}
beforeEach(() => {
  jest.resetAllMocks()
})

const serverInfoMock: ServerInfo = {
  servertime: 1625396869,
  servertimestring: "Sun Jul  4 04:07:49 2021",
}

const supportedAPIMock: SupportedAPI = {
  apilist: [
    {
      interfaces: [
        {
          name: "ISteamWebAPIUtil",
          methods: [
            {
              name: "GetServerInfo",
              version: 1,
              httpmethod: "GET",
              parameters: [],
            },
            {
              name: "GetSupportedAPIList",
              version: 1,
              httpmethod: "GET",
              parameters: [
                {
                  name: "key",
                  type: "string",
                  optional: true,
                  description: "access key",
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}

describe("ISteamWebAPIUtilWrapper", () => {
  const { httpMock, api } = setup()
  const apiKey = "1"

  describe("getServerInfo", () => {
    beforeEach(() => {
      HttpClientMock.prototype.get.mockResolvedValue(serverInfoMock)
    })

    it("should return server info", async () => {
      const response = await api.getServerInfo()

      expect(response).toEqual(serverInfoMock)
      expect(httpMock.get).toHaveBeenCalledWith(GET_SERVER_INFO)
    })
  })

  describe("getSupportedAPIList", () => {
    beforeEach(() => {
      HttpClientMock.prototype.get.mockResolvedValue(supportedAPIMock)
    })

    it("should return supported API list when requesting without an wrapper key", async () => {
      const response = await api.getSupportedAPIList()

      expect(response).toEqual(supportedAPIMock)
      expect(httpMock.get).toHaveBeenCalledWith(GET_SUPPORTED_API_LIST, { params: {} })
    })

    it("should return supported API list", async () => {
      const response = await api.getSupportedAPIList(apiKey)

      expect(response).toEqual(supportedAPIMock)
      expect(httpMock.get).toHaveBeenCalledWith(GET_SUPPORTED_API_LIST, {
        params: {
          key: apiKey,
        },
      })
    })
  })
})
