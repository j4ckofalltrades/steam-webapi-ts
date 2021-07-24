import { AppId } from "../core/steamWebApi"

/**
 * @property apps A list of objects containing the title and app ID of each program available in the store.
 */
export type AppList = {
  applist: {
    apps: App[]
  }
}

/**
 * @property appid An integer containing the program's ID.
 * @property name A string containing the program's publicly facing title.
 */
export type App = {
  appid: AppId
  name: string
}

/**
 * @property success Boolean indicating if request was successful.
 * @property up_to_date Boolean indicating if the given version number is the most current version.
 * @property version_is_listable Boolean indicating if the given version can be listed in public changelogs.
 * @property required_version (Optional) Integer of the most current version of the app available.
 * @property message (Optional) A string giving the status message if applicable.
 */
export type UpToDateCheck = {
  response: {
    success: boolean
    up_to_date: boolean
    version_is_listable: boolean
    required_version?: number
    message?: string
  }
}
