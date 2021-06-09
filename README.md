# steam-webapi-ts
[![npm](https://img.shields.io/npm/v/steam-webapi-ts)](https://npmjs.com/package/steam-webapi-ts)
![GitHub package.json dependency version (prod)](https://img.shields.io/github/package-json/dependency-version/j4ckofalltrades/steam-webapi-ts/typescript)

A Typescript wrapper for Steam's Web API.

## Installation

### Using npm

[![NPM](https://nodei.co/npm/steam-webapi-ts.png)](https://npmjs.com/package/steam-webapi-ts/)

### Using yarn

`$ yarn add steam-webapi-ts`

## Usage

**This requires a Steam Web API Key, you can get one at https://steamcommunity.com/dev/apikey**

You can use either the provided `SteamWebApi` wrapper, or a specific interface e.g. `ISteamUser`. 

```typescript
// steam-web-api.ts
import { SteamWebApi } from "steam-webapi-ts"

const steamWebApi = new SteamWebApi("api_key")
await steamWebApi.usersApi.getPlayerSummaries(["steam_ids"])

// steam-user-api.ts
import { ISteamUser } from "steam-webapi-ts"

const usersApi = new ISteamUser("api_key")
await usersApi.getPlayerSummaries(["steam_ids"])
```

## Docs

Read the documentation [here](https://j4ckofalltrades.github.io/steam-webapi-ts/)

Read the Steam Web API documentation [here](https://developer.valvesoftware.com/wiki/Steam_Web_API)
