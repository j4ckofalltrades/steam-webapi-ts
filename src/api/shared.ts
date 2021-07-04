/**
 * Game ID.
 */
export type AppId = number

/**
 * User's 64-bit ID.
 */
export type SteamId = string

/**
 * Steam Web API key. Without this, the server will return an HTTP 403 (forbidden) error.
 * A key can be generated at {@link https://steamcommunity.com/dev/apikey}.
 */
export type WebApiKey = string

/**
 * 1 if successful, 42 if there was no match.
 */
export type Result = 1 | 42
