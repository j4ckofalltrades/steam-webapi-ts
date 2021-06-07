# steam-webapi-ts

A Typescript wrapper for Steam's Web API.

## Installation

### Using npm

`$ npm install steam-webapi-ts`

## Usage

You can use either the provided `SteamWebApi` wrapper, or a specific interface e.g. `ISteamUser`. 

```typescript
// steam-web-api.ts
import { SteamWebApi } from "steam-webapi-ts"

const steamWebApi = new SteamWebApi("api_key")
console.log(await steamWebApi.usersApi.getPlayerSummaries(["steam_ids"]))

// steam-user-api.ts
import { ISteamUser } from "steam-webapi-ts"

const usersApi = new ISteamUser("api_key")
console.log(await usersApi.getPlayerSummaries(["steam_ids"]))
```
