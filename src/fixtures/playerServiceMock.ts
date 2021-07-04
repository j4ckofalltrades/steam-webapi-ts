// IPlayerService

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
        playtime_linux_forever: 6315
      }
    ]
  }
}

export const ownedGamesMock = {
  response: {
    game_count: 1,
    games: [
      {
        appid: 1,
        playtime_forever: 10,
        playtime_windows_forever: 10,
        playtime_mac_forever: 0,
        playtime_linux_forever: 0
      }
    ]
  }
}
