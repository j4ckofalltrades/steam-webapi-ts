/* istanbul ignore file */

import axios, { AxiosError, AxiosRequestConfig } from "axios"

const BASE_API_URL = "https://api.steampowered.com"

/**
 * @ignore
 */
export class WebApiClient {
  private readonly httpClient = axios.create({ baseURL: BASE_API_URL })

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response = await this.httpClient.get<T>(url, config)
      return response.data as T
    } catch (error) {
      const err = error as AxiosError
      throw new Error(err.message)
    }
  }
}

export const defaultWebApiClient = new WebApiClient()
