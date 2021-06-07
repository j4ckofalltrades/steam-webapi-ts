import { PlayerSummaries, SteamId, WebApiKey } from "./types"
import { httpClient, HttpClient } from "./http"
import { GET_PLAYER_SUMMARIES } from "./url"

/**
 * Methods relating to Steam users.
 */
export class ISteamUser {

  private readonly http: HttpClient
  private readonly apiKey: WebApiKey

  constructor(apiKey: WebApiKey, http: HttpClient = httpClient) {
    this.apiKey = apiKey
    this.http = http
  }

  /**
   * Get basic profile information for a list of 64-bit Steam IDs.
   *
   * @param steamids A comma-separated list of 64 bit IDs to retrieve profiles for.
   */
  async getPlayerSummaries(steamids: SteamId[]): Promise<PlayerSummaries> {
    return await this.http.get<PlayerSummaries>(
      GET_PLAYER_SUMMARIES,
      {
        params: {
          key: this.apiKey,
          steamids: JSON.stringify(steamids),
        }
      })
  }
}
