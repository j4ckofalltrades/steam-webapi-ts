![steam-webapi-ts_image](https://res.cloudinary.com/j4ckofalltrades/image/upload/v1697278937/foss/gh-social-icons/steam-webapi-ts_airt7u.png)

[![npm](https://img.shields.io/npm/v/@j4ckofalltrades\/steam-webapi-ts)](https://npmjs.com/package/@j4ckofalltrades/steam-webapi-ts)
[![Docs](https://img.shields.io/badge/docs-v1.2.2-green?link=j4ckofalltrades.github.io%2Fsteam--webapi--ts)](https://j4ckofalltrades.github.io/steam-webapi-ts)
[![codecov](https://codecov.io/gh/j4ckofalltrades/steam-webapi-ts/branch/main/graph/badge.svg?token=LA1XCLYEP3)](https://codecov.io/gh/j4ckofalltrades/steam-webapi-ts)

Isomorphic Steam WebAPI wrapper in TypeScript.

## Installation

[![npm](https://nodei.co/npm/@j4ckofalltrades/steam-webapi-ts.png?compact=true)](https://npmjs.com/package/@j4ckofalltrades/steam-webapi-ts)

### Using npm

`$ npm install @j4ckofalltrades/steam-webapi-ts`

### Using yarn

`$ yarn add @j4ckofalltrades/steam-webapi-ts`

### Using GitHub Packages

This step requires [authenticating to GitHub Packages](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-npm-registry#authenticating-to-github-packages),
then installing the package using `npm`.

`$ npm install @j4ckofalltrades/steam-webapi-ts`

### via CDN

- jsDelivr [cdn.jsdelivr.net/npm/@j4ckofalltrades/steam-webapi-ts/](https://cdn.jsdelivr.net/npm/@j4ckofalltrades/steam-webapi-ts/)
- unpkg [unpkg.com/browse/@j4ckofalltrades/steam-webapi-ts/](https://unpkg.com/browse/@j4ckofalltrades/steam-webapi-ts/)

## Usage

**This requires a Steam WebAPI Key, you can get one at https://steamcommunity.com/dev/apikey**

You can use either the provided `SteamWebApi` wrapper

```typescript
import { SteamWebApi } from "@j4ckofalltrades/steam-webapi-ts"

const steamWebApi = new SteamWebApi("api_key")
await steamWebApi.usersApi.getPlayerSummaries(["steam_ids"])
```

or with a specific interface e.g. `ISteamUser`

```typescript
import { ISteamUser } from "@j4ckofalltrades/steam-webapi-ts"

const usersApi = new ISteamUser("api_key")
await usersApi.getPlayerSummaries(["steam_ids"])
```

## Stats

![Alt](https://repobeats.axiom.co/api/embed/bdef9b1141ca9a44c3596ead68fa815e0c7857f6.svg "Repobeats analytics image")
