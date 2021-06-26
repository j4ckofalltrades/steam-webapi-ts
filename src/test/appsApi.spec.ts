import { HttpClient } from "../api/http"
import { ISteamApps } from "../api/appsApi"
import { appListMock, upToDateCheckMock } from "../fixtures/appsMock"
import { GET_APP_LIST, UP_TO_DATE_CHECK } from "../api/url"

jest.mock("../api/http")

const HttpClientMock = HttpClient as jest.MockedClass<typeof HttpClient>
const setup = () => {
  const httpMock = new HttpClientMock()
  const api = new ISteamApps(httpMock)

  return { httpMock, api }
}
beforeEach(() => {
  jest.resetAllMocks()
})

describe("ISteamApps", () => {
  const { httpMock, api } = setup()

  describe("getAppList", () => {
    beforeEach(() => {
      HttpClientMock.prototype.get.mockResolvedValue(appListMock)
    })

    it("should return appList", async () => {
      const response = await api.getAppList()

      expect(response).toEqual(appListMock)
      expect(httpMock.get).toBeCalledWith(GET_APP_LIST)
    })
  })

  describe("upToDateCheck", () => {
    beforeEach(() => {
      HttpClientMock.prototype.get.mockResolvedValue(upToDateCheckMock)
    })

    it("should return version check result for app", async () => {
      const appid = 570
      const version = "7.29d"
      const response = await api.upToDateCheck(appid, version)

      expect(response).toEqual(upToDateCheckMock)
      expect(httpMock.get).toBeCalledWith(
        UP_TO_DATE_CHECK,
        {
          params: {
            appid,
            version,
          }
        }
      )
    })
  })
})
