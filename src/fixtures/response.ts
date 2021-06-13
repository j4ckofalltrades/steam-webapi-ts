// mock Steam Web API responses
export const playerSummariesMock = {
  response: {
    players: [
      {
        steamid: "76561197960435530",
        communityvisibilitystate: 3,
        profilestate: 1,
        personaname: "Robin",
        profileurl: "https://steamcommunity.com/id/robinwalker/",
        avatar: "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/f1/f1dd60a188883caf82d0cbfccfe6aba0af1732d4.jpg",
        avatarmedium: "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/f1/f1dd60a188883caf82d0cbfccfe6aba0af1732d4_medium.jpg",
        avatarfull: "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/f1/f1dd60a188883caf82d0cbfccfe6aba0af1732d4_full.jpg",
        avatarhash: "f1dd60a188883caf82d0cbfccfe6aba0af1732d4",
        personastate: 0,
        realname: "Robin Walker",
        primaryclanid: "103582791429521412",
        timecreated: 1063407589,
        personastateflags: 0,
        loccountrycode: "US",
        locstatecode: "WA",
        loccityid: 3961
      }
    ]
  }
}

export const friendsListMock = {
  friendslist: {
    friends: [
      {
        steamid: "76561197960265740",
        relationship: "friend",
        friend_since: 0
      },
      {
        steamid: "76561197960265744",
        relationship: "friend",
        friend_since: 1585508613
      }
    ]
  }
}

export const playerBansMock = {
  players: [
    {
      SteamId: "76561197960435530",
      CommunityBanned: false,
      VACBanned: false,
      NumberOfVACBans: 0,
      DaysSinceLastBan: 0,
      NumberOfGameBans: 0,
      EconomyBan: "none",
    }
  ]
}

export const userGroupListMock = {
  response: {
    success: true,
    groups: [
      {
        gid: "4",
      }
    ]
  }
}

export const vanityURLResolvedMock = {
  response: {
    steamid: "76561197960435530",
    success: 1
  }
}
