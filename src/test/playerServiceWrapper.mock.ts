// IPlayerService

export const ownedGamesMock = {
  response: {
    game_count: 1,
    games: [
      {
        appid: 1,
        playtime_forever: 10,
        playtime_windows_forever: 10,
        playtime_mac_forever: 0,
        playtime_linux_forever: 0,
      },
    ],
  },
}

export const playerBadgeProgressMock = {
  response: {
    quests: [
      {
        questid: 115,
        completed: true,
      },
      {
        questid: 128,
        completed: true,
      },
    ],
  },
}

export const playerBadgesMock = {
  response: {
    badges: [
      {
        badgeid: 13,
        level: 127,
        completion_time: 1622373519,
        xp: 356,
        scarcity: 7098987,
      },
    ],
    player_xp: 706,
    player_level: 7,
    player_xp_needed_to_level_up: 94,
    player_xp_needed_current_level: 700,
  },
}

export const playerLevelMock = {
  response: {
    player_level: 7,
  },
}

export const playingSharedGameMock = {
  response: {
    lender_steamid: "0",
  },
}

export const recentlyPlayedGamesMock = {
  response: {
    total_count: 1,
    games: [
      {
        appid: 570,
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
