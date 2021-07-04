// ISteamWebAPIUtil

export const serverInfoMock = {
  servertime: 1625396869,
  servertimestring: "Sun Jul  4 04:07:49 2021"
}

export const supportedAPIMock = {
  apilist: {
    interfaces: [
      {
        name: "ISteamWebAPIUtil",
        methods: [
          {
            name: "GetServerInfo",
            version: 1,
            httpmethod: "GET",
            parameters: []
          },
          {
            name: "GetSupportedAPIList",
            version: 1,
            httpmethod: "GET",
            parameters: [
              {
                name: "key",
                type: "string",
                optional: true,
                description: "access key"
              }
            ]
          }
        ]
      }
    ]
  }
}
