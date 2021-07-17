import { httpClient, HttpClient } from "./http"
import { GET_SERVER_INFO, GET_SUPPORTED_API_LIST } from "./url"
import { WebApiKey } from "./shared"

/**
 * @property servertime Unix timestamp of WebAPI server.
 * @property servertimestring Time string of WebAPI server.
 */
export type ServerInfo = {
  servertime: number
  servertimestring: string
}

/**
 * @property name Name of parameter.
 * @property type Expected type of value.
 * @property optional Is input optional for the method.
 * @property description API Documentation of parameter.
 */
type ApiParam = {
  name: string
  type: string
  optional: boolean
  description: string
}

/**
 * @property name Name of method.
 * @property version Version of method.
 * @property httpmethod Allowed HTTP method for method (GET, POST).
 */
type ApiMethod = {
  name: string
  version: number
  httpmethod: string
  parameters: ApiParam[]
}

/**
 * @property apilist List of supported APIs.
 * @property apilist.interfaces.name Name of interface.
 * @property apilist.interfaces.methods Methods with-in the interface.
 */
export type SupportedAPI = {
  apilist: {
    interfaces: {
      name: string
      methods: ApiMethod[]
    }[]
  }[]
}

/**
 * Methods relating to the WebAPI itself.
 */
export class ISteamWebAPIUtil {
  private readonly http: HttpClient

  /* istanbul ignore next */
  /**
   * @param http HTTP client.
   */
  constructor(http: HttpClient = httpClient) {
    this.http = http
  }

  /**
   * Returns WebAPI server time & checks server status.
   */
  async getServerInfo(): Promise<ServerInfo> {
    return await this.http.get<ServerInfo>(GET_SERVER_INFO)
  }

  /**
   * Lists all available WebAPI interfaces.
   *
   * @param apiKey (Optional) Presence of a Steam WebAPI key will display all available methods & interfaces allowed
   *        for that key.
   */
  async getSupportedAPIList(apiKey?: WebApiKey): Promise<SupportedAPI> {
    const key = apiKey !== undefined ? { key: apiKey } : undefined
    return await this.http.get<SupportedAPI>(GET_SUPPORTED_API_LIST, {
      params: {
        ...key,
      },
    })
  }
}
