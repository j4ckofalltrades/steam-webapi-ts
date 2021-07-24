import { WebApiClient } from "../core/webApiClient"
import { GET_NEWS_FOR_APP, ISteamNewsWrapper } from "../wrapper/steamNewsWrapper"
import { newsForAppMock } from "./steamNewsWrapper.mock"
import { NewsForAppParams } from "../wrapper/steamNewsWrapper.types."

jest.mock("../core/webApiClient")

const HttpClientMock = WebApiClient as jest.MockedClass<typeof WebApiClient>
const setup = () => {
  const httpMock = new HttpClientMock()
  const api = new ISteamNewsWrapper(httpMock)

  return { httpMock, api }
}
beforeEach(() => {
  jest.resetAllMocks()
})

describe("ISteamNewsWrapper", () => {
  const { httpMock, api } = setup()
  const appid = 570

  describe("getNewsForApp", () => {
    beforeEach(() => {
      HttpClientMock.prototype.get.mockResolvedValue(newsForAppMock)
    })

    it("should return news for app", async () => {
      const response = await api.getNewsForApp(appid)
      expect(response).toEqual(newsForAppMock)
      expect(httpMock.get).toBeCalledWith(GET_NEWS_FOR_APP, {
        params: {
          appid,
          // default number of posts to retrieve
          count: 20,
        },
      })
    })

    it("should return news for app filtered by params", async () => {
      const newsForAppParams: NewsForAppParams = {
        maxlength: 10,
        enddate: new Date().getDate(),
        count: 10,
        feeds: "default",
      }

      const response = await api.getNewsForApp(appid, newsForAppParams)
      expect(response).toEqual(newsForAppMock)
      expect(httpMock.get).toBeCalledWith(GET_NEWS_FOR_APP, {
        params: {
          appid,
          ...newsForAppParams,
        },
      })
    })
  })
})
