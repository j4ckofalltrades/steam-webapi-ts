import { WebApiClient } from "../core/webApiClient"
import {
  BadgeProgress,
  GET_BADGES,
  GET_COMMUNITY_BADGE_PROGRESS,
  GET_OWNED_GAMES,
  GET_RECENTLY_PLAYED_GAMES,
  GET_STEAM_LEVEL,
  GetOwnedGamesParams,
  IPlayerServiceWrapper,
  IS_PLAYING_SHARED_GAME,
  OwnedGames,
  PlayerBadges,
  RecentlyPlayedGames,
  SharedGameDetails,
  SteamLevel,
} from "../wrapper/playerServiceWrapper"

jest.mock("../core/webApiClient")

const HttpClientMock = WebApiClient as jest.MockedClass<typeof WebApiClient>
const apiKeyTest = "apiKey"
const setup = () => {
  const httpMock = new HttpClientMock()
  const api = new IPlayerServiceWrapper(apiKeyTest, httpMock)

  return { httpMock, api }
}
beforeEach(() => {
  jest.resetAllMocks()
})

const ownedGamesMock: OwnedGames = {
  response: {
    game_count: 1,
    games: [
      {
        appid: "1",
        playtime_forever: 10,
        playtime_windows_forever: 10,
        playtime_mac_forever: 0,
        playtime_linux_forever: 0,
        has_community_visible_stats: true,
      },
    ],
  },
}

const playerBadgeProgressMock: BadgeProgress = {
  response: {
    quests: [
      {
        questid: "115",
        completed: true,
      },
      {
        questid: "128",
        completed: true,
      },
    ],
  },
}

const playerBadgesMock: PlayerBadges = {
  response: {
    badges: [
      {
        badgeid: 13,
        level: 127,
        completion_time: 1622373519,
        xp: 356,
        scarcity: 7098987,
        border_color: "black",
      },
    ],
    player_xp: 706,
    player_level: 7,
    player_xp_needed_to_level_up: 94,
    player_xp_needed_current_level: 700,
  },
}

const playerLevelMock: SteamLevel = {
  response: {
    player_level: 7,
  },
}

const playingSharedGameMock: SharedGameDetails = {
  response: {
    lender_steamid: "0",
  },
}

const recentlyPlayedGamesMock: RecentlyPlayedGames = {
  response: {
    total_count: 1,
    games: [
      {
        appid: "570",
        name: "Dota 2",
        playtime_2weeks: 224,
        playtime_forever: 78765,
        img_icon_url: "0bbb630d63262dd66d2fdd0f7d37e8661a410075",
        img_logo_url: "d4f836839254be08d8e9dd333ecc9a01782c26d2",
        playtime_windows_forever: 37652,
        playtime_mac_forever: 0,
        playtime_linux_forever: 6315,
      },
    ],
  },
}

describe("IPlayerServiceWrapper", () => {
  const { httpMock, api } = setup()
  const steamid = "1"

  describe("getRecentlyPlayedGames", () => {
    beforeEach(() => {
      HttpClientMock.prototype.get.mockResolvedValue(recentlyPlayedGamesMock)
    })

    it("should return games recently played by the user", async () => {
      const response = await api.getRecentlyPlayedGames(steamid)

      expect(response).toEqual(recentlyPlayedGamesMock)
      expect(httpMock.get).toBeCalledWith(GET_RECENTLY_PLAYED_GAMES, {
        params: {
          key: apiKeyTest,
          steamid,
        },
      })
    })
  })

  describe("getOwnedGames", () => {
    beforeEach(() => {
      HttpClientMock.prototype.get.mockResolvedValue(ownedGamesMock)
    })

    it("should return games belonging to the user", async () => {
      const response = await api.getOwnedGames(steamid)

      expect(response).toEqual(ownedGamesMock)
      expect(httpMock.get).toBeCalledWith(GET_OWNED_GAMES, {
        params: {
          key: apiKeyTest,
          steamid,
          // Whether to list free-to-play games in the results. Defaults to false.
          include_appinfo: false,
          // Whether to include additional details of apps - name and images. Defaults to false.
          include_played_free_games: false,
        },
      })
    })

    it("should return games belonging to the user filtered by params", async () => {
      const request: GetOwnedGamesParams = {
        include_appinfo: true,
        include_played_free_games: true,
        appids_filter: [570, 571],
      }

      const response = await api.getOwnedGames(steamid, request)

      expect(response).toEqual(ownedGamesMock)
      expect(httpMock.get).toBeCalledWith(GET_OWNED_GAMES, {
        params: {
          key: apiKeyTest,
          steamid,
          include_appinfo: true,
          include_played_free_games: true,
          "appids_filter[0]": 570,
          "appids_filter[1]": 571,
        },
      })
    })

    it("should handle excluded optional params", async () => {
      const request: GetOwnedGamesParams = {
        include_appinfo: false,
        include_played_free_games: true,
      }

      const response = await api.getOwnedGames(steamid, request)

      expect(response).toEqual(ownedGamesMock)
      expect(httpMock.get).toBeCalledWith(GET_OWNED_GAMES, {
        params: {
          key: apiKeyTest,
          steamid,
          include_appinfo: false,
          include_played_free_games: true,
        },
      })
    })
  })

  describe("getSteamLevel", () => {
    beforeEach(() => {
      HttpClientMock.prototype.get.mockResolvedValue(playerLevelMock)
    })

    it("should return the user's Steam level", async () => {
      const response = await api.getSteamLevel(steamid)

      expect(response).toEqual(playerLevelMock)
      expect(httpMock.get).toBeCalledWith(GET_STEAM_LEVEL, {
        params: {
          key: apiKeyTest,
          steamid,
        },
      })
    })
  })

  describe("getBadges", () => {
    beforeEach(() => {
      HttpClientMock.prototype.get.mockResolvedValue(playerBadgesMock)
    })

    it("should return the user's Steam badges", async () => {
      const response = await api.getBadges(steamid)

      expect(response).toEqual(playerBadgesMock)
      expect(httpMock.get).toBeCalledWith(GET_BADGES, {
        params: {
          key: apiKeyTest,
          steamid,
        },
      })
    })
  })

  describe("getCommunityBadgeProgress", () => {
    beforeEach(() => {
      HttpClientMock.prototype.get.mockResolvedValue(playerBadgeProgressMock)
    })

    it("should return the quests needed for all badges", async () => {
      const response = await api.getCommunityBadgeProgress(steamid)

      expect(response).toEqual(playerBadgeProgressMock)
      expect(httpMock.get).toBeCalledWith(GET_COMMUNITY_BADGE_PROGRESS, {
        params: {
          key: apiKeyTest,
          steamid,
        },
      })
    })

    it("should return the quests needed to get the specified badge", async () => {
      const badgeid = 123
      const response = await api.getCommunityBadgeProgress(steamid, badgeid)

      expect(response).toEqual(playerBadgeProgressMock)
      expect(httpMock.get).toBeCalledWith(GET_COMMUNITY_BADGE_PROGRESS, {
        params: {
          key: apiKeyTest,
          steamid,
          badgeid,
        },
      })
    })
  })

  describe("isPlayingSharedGame", () => {
    beforeEach(() => {
      HttpClientMock.prototype.get.mockResolvedValue(playingSharedGameMock)
    })

    it("should return the lender Steam id for borrowed game", async () => {
      const appid_playing = 1
      const response = await api.isPlayingSharedGame(steamid, appid_playing)

      expect(response).toEqual(playingSharedGameMock)
      expect(httpMock.get).toBeCalledWith(IS_PLAYING_SHARED_GAME, {
        params: {
          key: apiKeyTest,
          steamid,
          appid_playing,
        },
      })
    })
  })
})
