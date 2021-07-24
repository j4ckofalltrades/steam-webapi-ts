// ISteamUserStats

export const currentPlayersMock = {
  response: {
    player_count: 573500,
    result: 1,
  },
}

export const gameSchemaMock = {
  game: {
    gameName: "[STAGING] DotA 2",
    gameVersion: "11",
    availableGameStats: {
      stats: [
        {
          name: "DOTA_SHOW_FULL_UI",
          defaultvalue: 0,
          displayName: "",
        },
      ],
    },
  },
}

export const gameUserStatsMock = {
  playerstats: {
    steamID: "123456789010",
    gameName: "Fall Guys",
    achievements: [
      {
        name: "ACH_GRAB_PLAYER",
        achieved: 1,
      },
      {
        name: "ACH_QUALIFY_1_ROUND",
        achieved: 1,
      },
    ],
  },
}

export const globalAchievementsMock = {
  achievementpercentages: {
    achievements: [
      {
        name: "CHARMED",
        percent: 75,
      },
      {
        name: "FK_DEFEAT",
        percent: 68.9000015258789063,
      },
      {
        name: "HORNET_1",
        percent: 59.9000015258789063,
      },
      {
        name: "STAG_STATION_HALF",
        percent: 45.7000007629394531,
      },
      {
        name: "PROTECTED",
        percent: 44.2000007629394531,
      },
    ],
  },
}

export const playerAchievementsMock = {
  playerstats: {
    steamID: "12345678910",
    gameName: "Hollow Knight",
    achievements: [
      {
        apiname: "CHARMED",
        achieved: 0,
        unlocktime: 0,
      },
      {
        apiname: "ENCHANTED",
        achieved: 0,
        unlocktime: 0,
      },
      {
        apiname: "BLESSED",
        achieved: 0,
        unlocktime: 0,
      },
    ],
    success: true,
  },
}

export const globalStatsForGameMock = {
  response: {
    result: 1,
    globalstats: [
      {
        stat_name_0: {
          total: 123,
        },
        stat_name_1: {
          total: 345,
        },
      },
    ],
  },
}
