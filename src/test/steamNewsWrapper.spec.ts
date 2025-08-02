import { WebApiClient } from "../core/webApiClient"
import { AppNews, GET_NEWS_FOR_APP, ISteamNewsWrapper, NewsForAppParams } from "../wrapper/steamNewsWrapper"

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

const newsForAppMock: AppNews = {
  appnews: {
    appid: 570,
    newsitems: [
      {
        gid: "4032392655093925419",
        title: "Dota 2 update for 2 July 2021",
        url: "https://steamstore-a.akamaihd.net/news/externalpost/SteamDB/4032392655093925419",
        is_external_url: true,
        author: "SteamDB",
        // prettier-ignore
        contents: "<a href=\"https://steamdb.info/patchnotes/6972159/?utm_source=Steam&utm_medium=Steam&utm_campaign=SteamRSS\">" +
          "<img src=\"https://steamdb.info/patchnotes/6972159.png\"><br>Read patchnotes on SteamDB...</a>",
        feedlabel: "SteamDB",
        date: 1625254529,
        feedname: "SteamDB",
        feed_type: 0,
        appid: 570,
      },
    ],
  },
}

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
      expect(httpMock.get).toHaveBeenCalledWith(GET_NEWS_FOR_APP, {
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
      expect(httpMock.get).toHaveBeenCalledWith(GET_NEWS_FOR_APP, {
        params: {
          appid,
          ...newsForAppParams,
        },
      })
    })
  })
})
