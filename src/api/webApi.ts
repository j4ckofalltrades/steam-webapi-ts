import { httpClient } from "./http"
import { ISteamUser } from "./usersApi"
import { WebApiKey } from "./types"

/**
 * Steam Web API wrapper
 */
export class SteamWebApi {

  public usersApi: ISteamUser

  constructor(apiKey: WebApiKey) {
    this.usersApi = new ISteamUser(apiKey, httpClient)
  }
}
