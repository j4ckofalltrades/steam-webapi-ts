import axios, { AxiosError, AxiosRequestConfig } from "axios"
import { BASE_API_URL } from "./url"

/**
 * @ignore
 */
export class HttpClient {

  private readonly http = axios.create({ baseURL: BASE_API_URL, })

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response = await this.http.get<T>(url, config)
      return response.data as T
    } catch (error) {
      const err = error as AxiosError
      console.log(error)
      throw new Error(err.message)
    }
  }
}

export const httpClient = new HttpClient()
