import { WebApiClient } from "../core/webApiClient"
import { GET_APP_LIST, ISteamAppsWrapper, UP_TO_DATE_CHECK } from "../wrapper/steamAppsWrapper"
import { appListMock, upToDateCheckMock } from "./steamAppsWrapper.mock"

jest.mock("../core/webApiClient")

const HttpClientMock = WebApiClient as jest.MockedClass<typeof WebApiClient>
const setup = () => {
  const httpMock = new HttpClientMock()
  const api = new ISteamAppsWrapper(httpMock)

  return { httpMock, api }
}
beforeEach(() => {
  jest.resetAllMocks()
})

describe("ISteamAppsWrapper", () => {
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
      expect(httpMock.get).toBeCalledWith(UP_TO_DATE_CHECK, {
        params: {
          appid,
          version,
        },
      })
    })
  })
})
