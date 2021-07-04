import { HttpClient } from "../api/http"
import { ISteamNews } from "../api/newsApi"
import { newsForAppMock } from "../fixtures/newsMock"
import { GET_NEWS_FOR_APP } from "../api/url"

jest.mock("../api/http")

const HttpClientMock = HttpClient as jest.MockedClass<typeof HttpClient>
const setup = () => {
  const httpMock = new HttpClientMock()
  const api = new ISteamNews(httpMock)

  return { httpMock, api }
}
beforeEach(() => {
  jest.resetAllMocks()
})

describe("ISteamNews", () => {
  const { httpMock, api } = setup()

  describe("getNewsForApp", () => {
    beforeEach(() => {
      HttpClientMock.prototype.get.mockResolvedValue(newsForAppMock)
    })

    it("should return news for app", async () => {
      const appid = 570
      const response = await api.getNewsForApp(appid)

      expect(response).toEqual(newsForAppMock)
      expect(httpMock.get).toBeCalledWith(
        GET_NEWS_FOR_APP,
        {
          params: {
            appid,
            // default number of post to retrieve
            count: 20,
          }
        }
      )
    })
  })
})
