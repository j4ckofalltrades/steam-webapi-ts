import { HttpClient } from "../api/http"
import {
  currentPlayersMock,
  gameSchemaMock, gameUserStatsMock,
  globalAchievementsMock,
  globalStatsForGameMock,
  playerAchievementsMock
} from "../fixtures/userStatsMock"
import {
  GET_GLOBAL_ACHIEVEMENT_PERCENTAGES_FOR_APP,
  GET_GLOBAL_STATS_FOR_GAME,
  GET_NUMBER_OF_CURRENT_PLAYERS,
  GET_PLAYER_ACHIEVEMENTS,
  GET_SCHEMA_FOR_GAME,
  GET_USER_STATS_FOR_GAME
} from "../api/url"
import { ISteamUserStats } from "../api/userStatsApi"

jest.mock("../api/http")

const HttpClientMock = HttpClient as jest.MockedClass<typeof HttpClient>
const apiKeyTest = "apiKey"
const setup = () => {
  const httpMock = new HttpClientMock()
  const api = new ISteamUserStats(apiKeyTest, httpMock)

  return { httpMock, api }
}
beforeEach(() => {
  jest.resetAllMocks()
})

describe("ISteamUserStats", () => {
  const { httpMock, api } = setup()
  const steamid = "12345678910"
  const appid = 1097150
  const gameid = 570

  describe("getGlobalAchievementPercentagesForApp", () => {
    beforeEach(() => {
      HttpClientMock.prototype.get.mockResolvedValue(globalAchievementsMock)
    })

    it("should return global achievements", async () => {
      const response = await api.getGlobalAchievementPercentagesForApp(gameid)

      expect(response).toEqual(globalAchievementsMock)
      expect(httpMock.get).toBeCalledWith(
        GET_GLOBAL_ACHIEVEMENT_PERCENTAGES_FOR_APP,
        {
          params: {
            gameid,
          }
        }
      )
    })
  })

  describe("getNumberOfCurrentPlayers", () => {
    beforeEach(() => {
      HttpClientMock.prototype.get.mockResolvedValue(currentPlayersMock)
    })

    it("should return number of current players for app", async () => {
      const response = await api.getNumberOfCurrentPlayers(appid)

      expect(response).toEqual(currentPlayersMock)
      expect(httpMock.get).toBeCalledWith(
        GET_NUMBER_OF_CURRENT_PLAYERS,
        {
          params: {
            appid,
          }
        }
      )
    })
  })

  describe("getPlayerAchievements", () => {
    beforeEach(() => {
      HttpClientMock.prototype.get.mockResolvedValue(playerAchievementsMock)
    })

    it("should return list of achievements the user has unlocked for the app", async () => {
      const response = await api.getPlayerAchievements(steamid, appid)

      expect(response).toEqual(playerAchievementsMock)
      expect(httpMock.get).toBeCalledWith(
        GET_PLAYER_ACHIEVEMENTS,
        {
          params: {
            steamid,
            appid,
          }
        }
      )
    })
  })

  describe("getSchemaForGame", () => {
    beforeEach(() => {
      HttpClientMock.prototype.get.mockResolvedValue(gameSchemaMock)
    })

    it("should return list of available achievements and stats for the game", async () => {
      const l = "en"
      const response = await api.getSchemaForGame(appid, l)

      expect(response).toEqual(gameSchemaMock)
      expect(httpMock.get).toBeCalledWith(
        GET_SCHEMA_FOR_GAME,
        {
          params: {
            key: apiKeyTest,
            appid,
            l,
          }
        }
      )
    })
  })

  describe("getUserStatsForGame", () => {
    beforeEach(() => {
      HttpClientMock.prototype.get.mockResolvedValue(gameUserStatsMock)
    })

    it("should return list of stats that the specified user has set in an app", async () => {
      const response = await api.getUserStatsForGame(steamid, appid)

      expect(response).toEqual(gameUserStatsMock)
      expect(httpMock.get).toBeCalledWith(
        GET_USER_STATS_FOR_GAME,
        {
          params: {
            key: apiKeyTest,
            steamid,
            appid,
          }
        }
      )
    })
  })

  describe("getGlobalStatsForGame", () => {
    beforeEach(() => {
      HttpClientMock.prototype.get.mockResolvedValue(globalStatsForGameMock)
    })

    it("should return global stats for the game", async () => {
      const count = 2
      const response = await api.getGlobalStatsForGame(appid, count, ["stat_1", "stat_2"])

      expect(response).toEqual(globalStatsForGameMock)
      expect(httpMock.get).toBeCalledWith(
        GET_GLOBAL_STATS_FOR_GAME,
        {
          params: {
            appid,
            count,
            "name[0]": "stat_1",
            "name[1]": "stat_2",
          }
        }
      )
    })
  })
})
