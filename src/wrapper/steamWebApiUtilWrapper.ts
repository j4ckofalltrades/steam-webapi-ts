import { defaultWebApiClient, WebApiClient } from "../core/webApiClient"
import { WebApiKey } from "../core/steamWebApi"
import { ServerInfo, SupportedAPI } from "./steamWebApiUtilWrapper.types"

export const GET_SERVER_INFO = "/ISteamWebAPIUtil/GetServerInfo/v1"
export const GET_SUPPORTED_API_LIST = "/ISteamWebAPIUtil/GetSupportedAPIList/v1"

/**
 * Methods relating to the WebAPI itself.
 */
export class ISteamWebAPIUtilWrapper {
  private readonly webApiClient: WebApiClient

  /* istanbul ignore next */
  /**
   * @param http HTTP client.
   */
  constructor(http: WebApiClient = defaultWebApiClient) {
    this.webApiClient = http
  }

  /**
   * Returns WebAPI server time & checks server status.
   */
  async getServerInfo(): Promise<ServerInfo> {
    return await this.webApiClient.get<ServerInfo>(GET_SERVER_INFO)
  }

  /**
   * Lists all available WebAPI interfaces.
   *
   * @param apiKey (Optional) Presence of a Steam WebAPI key will display all available methods & interfaces allowed
   *        for that key.
   */
  async getSupportedAPIList(apiKey?: WebApiKey): Promise<SupportedAPI> {
    const key = apiKey !== undefined ? { key: apiKey } : undefined
    return await this.webApiClient.get<SupportedAPI>(GET_SUPPORTED_API_LIST, {
      params: {
        ...key,
      },
    })
  }
}
