import { WebApiClient } from "../core/webApiClient"
import { AppList, GET_APP_LIST, ISteamAppsWrapper, UP_TO_DATE_CHECK, UpToDateCheck } from "../wrapper/steamAppsWrapper"

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

const appListMock: AppList = {
  applist: {
    apps: [
      {
        appid: 570,
        name: "DotA 2",
      },
    ],
  },
}

const upToDateCheckMock: UpToDateCheck = {
  response: {
    success: true,
    up_to_date: true,
    version_is_listable: true,
  },
}

describe("ISteamAppsWrapper", () => {
  const { httpMock, api } = setup()

  describe("getAppList", () => {
    beforeEach(() => {
      HttpClientMock.prototype.get.mockResolvedValue(appListMock)
    })

    it("should return appList", async () => {
      const response = await api.getAppList()

      expect(response).toEqual(appListMock)
      expect(httpMock.get).toHaveBeenCalledWith(GET_APP_LIST)
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
      expect(httpMock.get).toHaveBeenCalledWith(UP_TO_DATE_CHECK, {
        params: {
          appid,
          version,
        },
      })
    })
  })
})
