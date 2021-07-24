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
